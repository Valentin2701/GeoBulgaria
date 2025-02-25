import { Question } from "./Question";

export interface Test{
    _id: String,
    title: String,
    description: String,
    questions?: Array<Question>,
    createdAt?: Date,
    updatedAt?: Date
}