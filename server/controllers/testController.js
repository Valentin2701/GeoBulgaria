import express from "express";
import mongoose from "mongoose";
import * as testService from "../services/testService.js";
import * as authService from "../services/authService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const tests = await testService.getTests();
  res.status(200).json(tests);
});
router.get("/userTests", isAuth, async (req, res, next) => {
  try {
    const user = await authService.getUser(req.user._id).lean();

    if (!user.scores || typeof user.scores !== "object") {
      return res.status(400).json({ message: "Invalid scores data." });
    }

    const { scores } = user;

    // Convert keys to ObjectIds
    const testIds = Object.keys(scores).map((id) => {
      if (!mongoose.isValidObjectId(id)) {
        throw new Error(`Invalid test ID: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    const tests = await testService.getTestsByIds(testIds);

    // Create the dictionary of test titles to scores
    const dict = {};
    tests.forEach((test) => {
      dict[test.title] = scores[test._id.toString()]; // Ensure _id is converted to string
    });

    res.status(200).json(dict);
  } catch (err) {
    next(err);
  }
});

router.get("/:testId", isAuth, async (req, res) => {
  const test = await testService.getTestById(req.params.testId);
  res.status(200).json(test);
});

router.get("/:testId/:question", isAuth, async (req, res) => {
  const { testId, question } = req.params;
  try {
    const result = await testService.getQuestion(testId, question);

    res.status(200).json(result[0].question | null);
  } catch (err) {
    next(err);
  }
});

router.post("/:testId", isAuth, async (req, res, next) => {
  const { testId } = req.params;
  const userAnswers = req.body;
  try {
    const result = await testService.submitTest(testId, userAnswers);
    await testService.setUserScore(testId, req.user._id, result);
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

router.post("/:testId/:question", isAuth, async (req, res, next) => {
  const { testId, question } = req.params;
  const userAnswer = req.body.answer;
  try {
    const result = await testService.submitQuestion(
      testId,
      question,
      userAnswer
    );
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
});

export { router };
