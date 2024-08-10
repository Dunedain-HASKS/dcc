import Contest from "../models/contestModel.js";
import User from "../models/userModel.js";
import ContestUser from "../models/contestUserModel.js";

export async function createContest(req, res) {
  const { name, questions, startTime, endTime } = req.body;
  const contest = await Contest.create({
    name,
    questions,
    startTime,
    endTime,
  });

  res.status(201).json(contest);
}

export async function getContests(req, res) {
  console.log("getContests");
  const contests = await Contest.find({})
    .populate("participants", "username")
    .populate("questions", "title");
  res.json(contests);
}

export async function getContestById(req, res) {
  const contest = await Contest.findById(req.params.id)
    .populate("participants", "username")
    .populate("questions", "title");
  res.json(contest);
}

export async function addParticipant(req, res) {
  const { contestId, userId } = req.body;
  const user = await User.findOne({ username: userId });
  console.log(user);
  console.log(req.body);
  const contest = await Contest.findById(contestId);
  if (contest) {
    if (contest.participants.includes(user._id)) {
      res.status(200).json(contest);
      return;
    }
    contest.participants.push(user._id);
    await contest.save();

    // // Trigger Pusher update
    // pusher.trigger('contests', 'update', { contest });

    await ContestUser.create({
      contestId: contest._id,
      userId: user._id,
    });

    res.status(200).json(contest);
  } else {
    res.status(404).json({ message: "Contest not found" });
  }
}
