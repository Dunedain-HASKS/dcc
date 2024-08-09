import { Router } from "express";
import { compile } from "../controller/codeCompiler.js";

const router = Router();

router.route("/compile").post(compile);

export default router;