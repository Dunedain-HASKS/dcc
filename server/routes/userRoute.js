import { Router } from "express";
import {registerUser, loginUser, showUser} from "../controller/userController.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id").get(showUser);

export default router;