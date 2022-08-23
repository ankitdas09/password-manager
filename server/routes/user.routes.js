import { Router } from "express";

const router = Router();
import catchAync from "../middleware/catchAsync.js";

import {
	getAllUsers,
	createUser,
	signInUser,
} from "../controllers/user.controller.js";

router.get("/", catchAync(getAllUsers));

router.post("/", catchAync(createUser));

router.post("/login", catchAync(signInUser));

export default router;
