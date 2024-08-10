import Axios from "axios";
import  Question  from "../models/questionModel.js";
import  ContentSolution  from "../models/contestSolution.js";
import  User  from "../models/userModel.js";
import  ContestUser  from "../models/contestUserModel.js";

export async function submitQuestion(req, res) {
    const { code, language } = req.body;
    const {queId} = req.params;
    const {contestId} = req.params;
    const username = req.headers.username;
    const user = await User.findOne({username});
    const contestUser = await ContestUser.findOne({ userId: user._id, contestId });
    
    if (!user) {
      return res.status(404).send({ error: `User ${username} not found` });
    }
  
    const languageMap = {
      c: { language: "c", version: "10.2.0" },
      cpp: { language: "c++", version: "10.2.0" },
      python: { language: "python", version: "3.10.0" },
      java: { language: "java", version: "15.0.2" },
    };
  
    if (!languageMap[language]) {
      return res.status(400).send({ error: "Unsupported language" });
    }
  
    const question = await Question.findById(queId);
    const testCases = question.examples;
  
    const checkTestCase = async (testCase) => {
      const data = {
        language: languageMap[language].language,
        version: languageMap[language].version,
        files: [
          {
            name: "main",
            content: code,
          },
        ],
        stdin: testCase.input,
      };
  
      const config = {
        method: "post",
        url: "https://emkc.org/api/v2/piston/execute",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
  
      try {
        const response = await Axios(config);
        const userOutput = response.data.run.output.trim(); // Trim to handle extra newlines
        const expectedOutput = testCase.output.trim();
  
        if (userOutput !== expectedOutput) {
          return { success: false, error: `Test case failed for input: ${testCase.input}. Expected: ${expectedOutput}, but got: ${userOutput}` };
        }
        return { success: true };
      } catch (error) {
        return { success: false, error: `Error processing test case for input: ${testCase.input}` };
      }
    };
  
    // Main loop to check all test cases
    const runTestCases = async () => {
      for (let i = 0; i < testCases.length; i++) {
        const result = await checkTestCase(testCases[i]);
        if (!result.success) {
        //   user.wrongSub += 1;
        //   await user.save();
          return res.send({ error: result.error });
        }
      }
  
    //   user.rightSub += 1;
    //   await user.save();
  
      const newSolution = {
        code,
        user: user._id,
        question: queId,
        contest: contestId,
        language,
      };
      
      await ContentSolution.create(newSolution);
  
      contestUser.solved.push(queId);
      await contestUser.save();
  
      res.status(200).send({ message: "All test cases passed successfully!" });
    };
  
    runTestCases();
  }

  export async function runQuestion(req, res) {
    const { code, language } = req.body;
    const {queId} = req.params;
    const {contestId} = req.params;
    const username = req.headers.username;
    const user = await User.findOne({username});
    const contestUser = await ContestUser.findOne({ user: user._id, contest: contestId });
    
    if (!user) {
      return res.status(404).send({ error: `User ${username} not found` });
    }
  
    const languageMap = {
      c: { language: "c", version: "10.2.0" },
      cpp: { language: "c++", version: "10.2.0" },
      python: { language: "python", version: "3.10.0" },
      java: { language: "java", version: "15.0.2" },
    };
  
    if (!languageMap[language]) {
      return res.status(400).send({ error: "Unsupported language" });
    }
  
    const question = await Question.findById(queId);
    const testCases = question.examples;
  
    const checkTestCase = async (testCase) => {
      const data = {
        language: languageMap[language].language,
        version: languageMap[language].version,
        files: [
          {
            name: "main",
            content: code,
          },
        ],
        stdin: testCase.input,
      };
  
      const config = {
        method: "post",
        url: "https://emkc.org/api/v2/piston/execute",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
  
      try {
        const response = await Axios(config);
        const userOutput = response.data.run.output.trim(); // Trim to handle extra newlines
        const expectedOutput = testCase.output.trim();
  
        if (userOutput !== expectedOutput) {
          return { success: false, error: `Test case failed for input: ${testCase.input}. Expected: ${expectedOutput}, but got: ${userOutput}` };
        }
        return { success: true };
      } catch (error) {
        return { success: false, error: `Error processing test case for input: ${testCase.input}` };
      }
    };
  
    // Main loop to check all test cases
    const runTestCases = async () => {
      for (let i = 0; i < testCases.length; i++) {
        if(testCases[i].isSample === false){
            continue;
        }
        const result = await checkTestCase(testCases[i]);
        if (!result.success) {
          return res.send({ error: result.error });
        }
      }
  
      res.status(200).send({ message: "All test cases passed successfully!" });
    };
  
    runTestCases();
  }