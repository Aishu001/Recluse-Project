import mongoose from "mongoose";

const defaultSchema = new mongoose.Schema({
    defaultPoints: { type: Number, default: 0 }, // Set the default points value
});

const DefaultPoints = mongoose.model('DefaultPoints', defaultSchema);

export default DefaultPoints;
