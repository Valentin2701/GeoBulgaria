import { Test } from "../models/Test.js";
import { User } from "../models/User.js";

export const getTests = () => Test.find({}, "title description");

export const getTestById = (id) =>
  Test.findById(id, { "questions.correctAnswer": 0 });

export const getQuestion = async (testId, question) =>
  Test.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(testId) } }, // Match the test by its ID
    {
      $project: {
        question: { $arrayElemAt: ["$questions", question] }, // Extract the specific question
      },
    },
  ]);

export const submitTest = async (testId, answers) => {
  const test = await Test.findById(testId);
  let score = 0;
  test.questions.forEach((question, index) => {
    if (question.correctAnswer === answers[index]) {
      score += question.points;
    }
  });
  return score;
};

export const submitQuestion = (testId, question, answer) =>
  Test.findById(testId).then((test) => {
    return {
      correct: test.questions[question].correctAnswer === answer,
      explanation: test.questions[question].explanation,
    };
  });

export const setUserScore = async (testId, userId, newScore) =>
  User.updateOne({ _id: userId }, [
    {
      $set: {
        [`scores.${testId}`]: {
          $cond: {
            if: {
              $gt: [newScore, { $ifNull: [`$scores.${testId}`, -Infinity] }],
            },
            then: newScore,
            else: `$scores.${testId}`,
          },
        },
      },
    },
  ]);
