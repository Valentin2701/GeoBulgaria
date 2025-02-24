import express from "express";
import * as testService from "../services/testService.js";
import { isAuth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/tests", isAuth, async (req, res) => {
  const tests = await testService.getAll();
  res.json(tests);
});

router.get("/tests/:id", isAuth, async (req, res) => {
  const test = await testService.getOne(req.params.id);
  res.json(test);
});

router.post("/tests/:testId", isAuth, async (req, res, next) => {
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

router.post("/tests/:testId/:question", isAuth, async (req, res, next) => {
  const { testId, question } = req.params;
  const userAnswer = req.body.answer;
  try {
    const result = await testService.submitQuestion(testId, question, userAnswer);
    res.json(result);
  } catch (err) {
    return next(err);
  }
});
