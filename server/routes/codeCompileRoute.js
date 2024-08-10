import { Router } from "express";
import { compile, submitQuestion } from "../controller/codeCompiler.js";

const router = Router();

router.route("/").post(compile);
router.route("/submit/:queId").post(submitQuestion);

export default router;