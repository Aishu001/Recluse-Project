import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Wallet from '../models/wallet.js';
import DefaultPoints from '../models/points.js';

// Admin credentials
const adminCredentials = {
    email: 'admin.111@gmail.com',
    password: 'admin@123'
};
const generateReferenceID = () => {
    const prefix = 'REF-'; // A prefix to distinguish the reference ID
    const randomString = Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates a random 8-character string
    return `${prefix}${randomString}`; // Combine the prefix and random string
};

// Generates a random reference ID
const generateUniqueReferenceID = async () => {
    let referenceID;
    let isUnique = false;

    while (!isUnique) {
        // Generate a new referenceID
        referenceID = generateReferenceID();
        console.log('Generated referenceID:', referenceID);

        try {
            // Check if the referenceID already exists in the wallet collection
            const existingWallet = await Wallet.findOne({ referenceID });
            if (!existingWallet) {
                isUnique = true; // Unique ID found
            }
        } catch (err) {
            console.error('Error checking referenceID uniqueness:', err);
        }
    }

    return referenceID;
};

// In your userSignUp function, handle duplicate key errors
export const userSignUp = async (req, res) => {
    try {
        const { fullName, email, password, referenceID } = req.body;

        // Prevent admin signup
        if (email === adminCredentials.email) {
            return res.status(400).json({ message: "Admin signup is not allowed" });
        }

        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword, referenceID: referenceID || null });
        await newUser.save();

        // Generate a unique reference ID
        let uniqueReferenceID = referenceID || await generateUniqueReferenceID();

        // Create the wallet and handle duplicate key error if needed
        let wallet;
        try {
            wallet = new Wallet({
                referenceID: uniqueReferenceID,
                points: 0,
                user: newUser._id
            });
            await wallet.save();
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.referenceID) {
                uniqueReferenceID = await generateUniqueReferenceID();
                wallet = new Wallet({
                    referenceID: uniqueReferenceID,
                    points: 0,
                    user: newUser._id
                });
                await wallet.save();
            } else {
                throw error;
            }
        }

        // Referral points logic: If the new user registered using an existing reference ID
        if (referenceID) {
            const referringUserWallet = await Wallet.findOne({ referenceID });

            if (referringUserWallet) {
                // Fetch the referral points value set by the admin, default to 10 if not set
                const defaultPointsRecord = await DefaultPoints.findOne();
                const referralPoints = defaultPointsRecord ? defaultPointsRecord.defaultPoints : 10;

                // Increment the points for the referring user
                referringUserWallet.points += referralPoints;
                await referringUserWallet.save(); // Save the updated wallet with new points
            }
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};










export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Handle admin login separately
        if (email === adminCredentials.email) {
            if (password === adminCredentials.password) {
                const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.json({ token });
            } else {
                return res.status(401).json({ message: "Invalid credentials for admin" });
            }
        }

        // For customers
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ getTheID: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, userId: user._id }); // Send user ID separately
        

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
