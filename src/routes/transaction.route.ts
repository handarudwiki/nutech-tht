import { Router } from "express"
import TransactionController from "../controllers/transaction.controller";
import { authMIddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/balance",authMIddleware ,TransactionController.getBalance );
router.post("/topup",authMIddleware , TransactionController.topUp );
router.post("/transaction",authMIddleware , TransactionController.payment );
router.get("/transaction/history",authMIddleware , TransactionController.getAllTransaction );

export default router;
