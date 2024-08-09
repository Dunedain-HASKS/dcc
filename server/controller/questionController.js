import Question from "../models/questionModel.js";
import expressAsyncHandler from "express-async-handler";

const newQuestion = expressAsyncHandler(async (req, res) => {
  const { title, description, examples, constraints } = req.body;

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
    if (question) {
        res.json(question);
    } else {
        res.status(404).json({ message: 'Question not found' });
    }
}
);

export { newQuestion, showQuestions, showQuestion };
