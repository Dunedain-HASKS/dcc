import { Router } from "express";
import {newQuestion, showQuestions, showQuestion, contestShowQuestion} from "../controller/questionController.js";

const router = Router();

router.route("/new-question").post(newQuestion);
router.route("/all").get(showQuestions);
router.route("/:id").get(showQuestion);
router.route("/:contestId/:id").get(contestShowQuestion);

export default router;