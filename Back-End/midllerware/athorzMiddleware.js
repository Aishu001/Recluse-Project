import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer')) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded.getTheID).select("-password");

            if (!req.user && decoded.email !== 'admin.111@gmail.com') {
                console.error('User not found');
                return res.status(403).json({ message: 'User not found' });
            }

            next();
        } catch (error) {
            console.error('JWT Verification Error:', error);
            return res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        console.log('Unauthorized: Token missing or malformed');
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authenticateUser;
