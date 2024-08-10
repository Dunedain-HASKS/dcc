import { Router } from "express";
import { compile, runQuestion, submitQuestion } from "../controller/codeCompiler.js";

const router = Router();

router.route("/").post(compile);
router.route("/submit/:queId").post(submitQuestion);
router.route("/run-sample/:queId").post(runQuestion);


export default router;