import { Router } from "express"
import UserController from "../controllers/user.controller";
import { authMIddleware } from "../middlewares/auth.middleware";
import upload from "../utils/multer";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", authMIddleware,UserController.getProfile);
router.put("/profile/update", authMIddleware,UserController.updateProfile);
router.put("/profile/image",upload.single("file") ,authMIddleware,UserController.updateProfileImage);

export default router;