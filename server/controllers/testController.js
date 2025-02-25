import express from "express";
import * as testService from "../services/testService.js";
import { isAuth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const tests = await testService.getAll();
  res.json(tests);
});

router.get("/:testId", isAuth, async (req, res) => {
  const test = await testService.getOne(req.params.testId);
  res.json(test);
});

router.get("/:testId/:question", isAuth, async (req, res) => {
  const { testId, question } = req.params;
  try {
    const result = await testService.getQuestion(testId, question);

    res.json(result[0].question | null);
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
    res.json(result);
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
    res.json(result);
  } catch (err) {
    return next(err);
  }
});

export { router };
