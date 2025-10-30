import { Router } from "express"
import TransactionController from "../controllers/transaction.controller";
import { authMIddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/balance",authMIddleware ,TransactionController.getBalance );
router.post("/topup",authMIddleware , TransactionController.topUp );

export default router;
