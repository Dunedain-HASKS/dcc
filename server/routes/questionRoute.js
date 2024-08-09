import { Router } from "express";
import {newQuestion, showQuestions, showQuestion} from "../controller/questionController.js";

const router = Router();

router.route("/new-question").post(newQuestion);
router.route("/all").get(showQuestions);
router.route("/:id").get(showQuestion);

export default router;