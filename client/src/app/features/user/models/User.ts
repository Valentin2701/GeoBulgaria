export interface User {
    _id: String;
    username: String;
    email: String;
    password: String;
    scores: Map<String, Number>;
    __v: Number;
}