import Wallet from '../models/wallet.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import DefaultPoints from '../models/points.js';

export const createReferenceID = async (req, res) => {
    const { referenceID, userId } = req.body;
  
    try {
      // Validate that userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      // Check if the user already has a wallet
      const existingWallet = await Wallet.findOne({ user: userId });
  
      if (existingWallet) {
        return res.status(400).json({ message: 'Wallet already exists for this user.' });
      }
  
      // Create a new wallet with the provided reference ID and default points
      const newWallet = new Wallet({
        referenceID,
        points: 0,  // Default points
        user: userId, // Associate the wallet with the user
      });
  
      // Save the new wallet to the database
      await newWallet.save();
   
      res.status(201).json({ message: 'Wallet created successfully', wallet: newWallet });
    } catch (error) {
      console.error('Error creating wallet:', error);
      res.status(500).json({ message: 'Error creating wallet', error });
    }
  };

  export const fetchReferenceIdWalletPoint = async (req, res) => {
    try {
      // Assume user ID is sent in request query parameters or headers
      const userId = req.query.userId || req.headers['user-id']; // Modify as needed
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Validate that userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      // Find the wallet for the specified user
      const wallet = await Wallet.findOne({ user: userId });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found for this user' });
      }
  
      // Respond with reference ID and wallet points
      res.json({
        referenceID: wallet.referenceID,
        points: wallet.points
      });
    } catch (error) {
      console.error('Error fetching wallet information:', error);
      res.status(500).json({ message: 'Error fetching wallet information', error });
    }
  };

// Update default points by admin
export const updatePoints = async (req, res) => {
  try {
      const { points } = req.body;

      const existingPointsRecord = await DefaultPoints.findOne();
      if (existingPointsRecord) {
          existingPointsRecord.defaultPoints = points;
          await existingPointsRecord.save();
      } else {
          const newPointsRecord = new DefaultPoints({
              defaultPoints: points
          });
          await newPointsRecord.save();
      }

      res.status(200).json({ message: 'Points value updated successfully' });
  } catch (error) {
      console.error('Error updating points value:', error);
      res.status(500).json({ message: 'Error updating points value', error });
  }
};


