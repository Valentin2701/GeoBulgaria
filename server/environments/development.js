import { DB_password } from "../config.js";

export const env = {
    apiURL: "http://localhost:5000",
    PORT: 5000,
    DBURL: `mongodb+srv://valentinkirilov822:${DB_password}@geobulgaria.qwy8v.mongodb.net/?retryWrites=true&w=majority&appName=GeoBulgaria`
}