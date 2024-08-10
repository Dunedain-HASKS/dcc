import Question from "../models/questionModel.js";
import expressAsyncHandler from "express-async-handler";
import Solution from "../models/solutionModel.js";
import User from "../models/userModel.js";
import contestSolution from "../models/contestSolution.js";


const newQuestion = expressAsyncHandler(async (req, res) => {
  const { title, description, examples, constraints, difficulty, tags } = req.body;

  const questionExist = await Question.findOne({ title });

  if (questionExist) {
    res.status(403);
    throw new Error("Question already exists");
  }

  const newQuestion = await Question.create({
    title,
    description,
    examples,
    constraints,
    difficulty,
    tags,
  });

  if (newQuestion) {
    res.status(201).json({
      newQuestion,
    });
  } else {
    res.status(400);
    throw new Error("Invalid question data");
  }
});

const showQuestions = expressAsyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

const showQuestion = expressAsyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    const username = req.headers.username;
    const user = await User.findOne({ username });

    const solutions = await Solution.find({ user: user._id, question: question._id });
    if (solutions.length > 0) {
        res.json({ question, solutions });
        return;
    }

    if (question) {
        res.json({question});
    } else {
        res.status(404).json({ message: 'Question not found' });
    }
}
);

const contestShowQuestion = expressAsyncHandler(async (req, res) => {
  const contestId = req.params.contestId;
  const question = await Question.findById(req.params.id);
  const username = req.headers.username;
  const user = await User.findOne({ username });

  const solutions = await contestSolution.find({ user: user._id, question: question._id, contest: contestId });
  if (solutions) {
      res.json({ question, solutions });
      return;
  }

  if (question) {
      res.json({question});
  } else {
      res.status(404).json({ message: 'Question not found' });
  }
}
);

export { newQuestion, showQuestions, showQuestion, contestShowQuestion };
