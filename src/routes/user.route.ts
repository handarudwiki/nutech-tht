import {Router} from "express"
import UserController from "../controllers/user.controller";
import { authMIddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authMIddleware,UserController.getProfile);

export default router;