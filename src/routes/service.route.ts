import { Router } from "express";
import ServiceController from "../controllers/service.controller";

const router = Router();

router.get("/", ServiceController.getAll)

export default router;