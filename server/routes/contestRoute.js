import express from "express";
import {
  createContest,
  getContests,
  getContestById,
} from "../controller/contestController.js";
import { leaderboard } from "../controller/contestUserController.js";
import { addParticipant } from "../controller/contestController.js";
import { submitQuestion } from "../controller/contestCodeCompiler.js";
const router = express.Router();

router.route("/").post(createContest).get(getContests);
router.route("/:id").get(getContestById);
router.route("/:id/leaderboard").get(leaderboard);
router.route('/add-participant').post(addParticipant);
router.route("/:id/:queId").post(submitQuestion);

export default router;
