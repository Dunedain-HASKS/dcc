import express from "express";
import {
  createContest,
  getContests,
  getContestById,
} from "../controller/contestController.js";
import { leaderboard } from "../controller/contestUserController.js";

const router = express.Router();

router.route("/").post(createContest).get(getContests);
router.route("/:id").get(getContestById);
router.route("/:id/leaderboard").get(leaderboard);

export default router;
