import { Router } from "express";
import { compile } from "../controller/codeCompiler.js";

const router = Router();

router.route("/").post(compile);

export default router;