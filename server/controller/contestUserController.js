import contestUserModel from "../models/contestUserModel.js";
import expressAsyncHandler from "express-async-handler";
import Contest from "../models/contestModel.js";
// import User from "../models/userModel";

const leaderboard = expressAsyncHandler(async (req, res) => {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
        res.status(404).send({ error: "Contest not found" });
        return;
    }
    
    const contestUsers = await contestUserModel.find({ contestId: contest._id }).populate("userId");
    const leaderboard = contestUsers.map((contestUser) => {
        return {
        username: contestUser.userId.username,
        solved: contestUser.solved.length,
        };
    });
    
    res.json(leaderboard);
    }
);

export { leaderboard };