import * as jwt from "../lib/jsonwebtoken.js";
import { SECRET } from "../config.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) next();

  try {
    const decodedToken = await jwt.verify(token, SECRET);

    req.user = decodedToken;

    next();
  } catch (err) {
    res.clearCookie("auth");
    return res.status(401).json({ message: "Не сте регистриран" });
  }
};

export const isAuth = (req, res, next) => {
  if (!req.user) return res.status(402);
  next();
};
