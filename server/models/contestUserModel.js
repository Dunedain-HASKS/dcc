import mongoose from "mongoose";

const contestUserSchema = new mongoose.Schema(
  {
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    solved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ContestUser", contestUserSchema);
