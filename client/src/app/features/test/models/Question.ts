export interface Question{
    text: String,
    type: String,
    options?: Array<String>,
    correctAnswer: String,
    points: Number,
    explanation?: String
}