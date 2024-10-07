import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    referenceID: { type: String, required: true, unique: true },
    points: { type: Number, default: 0 }, // Store points as a number
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Associate wallet with a user
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
