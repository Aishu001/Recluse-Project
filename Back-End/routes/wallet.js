import express from 'express';
import { createReferenceID, fetchReferenceIdWalletPoint, updatePoints } from '../controller/wallet.js';
import authenticateUser from '../midllerware/athorzMiddleware.js';


const router = express.Router();

router.route("/createReferenceID").post(authenticateUser,createReferenceID);
router.route("/getReferenceIDAndWallet").get(authenticateUser,fetchReferenceIdWalletPoint);
 router.route("/editPointsValueByAdmin").put(authenticateUser,updatePoints);

export const walletRouter = router;