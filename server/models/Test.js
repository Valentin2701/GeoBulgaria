const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        enum: ["multiple-choice", "true-false", "fill-in-the-blank"],
        required: true,
      },
      options: {
        type: [String],
        validate: {
          validator: function (v) {
            return (
              this.type !== "multiple-choice" ||
              (Array.isArray(v) && v.length > 0)
            );
          },
          message: "Options are required for multiple-choice questions.",
        },
      },
      correctAnswer: {
        type: String,
        required: true,
      },
      points: {
        type: Number, // Points assigned for this question
        required: true,
      },
      explanation: {
        type: String,
        trim: true,
      },
    },
  ], // Embeds question data directly
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
testSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Test = mongoose.model("Test", testSchema);

export { Test };
