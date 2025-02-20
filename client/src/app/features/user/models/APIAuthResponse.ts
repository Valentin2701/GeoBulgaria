import { User } from "./User";

export interface APIAuthResponse {
    message: string;
    user: User;
    error?: boolean;
}