import * as jwt from "../lib/jsonwebtoken.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) return next();

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = decodedToken;
  } catch (err) {
    res.clearCookie("auth");
    return res.status(401).json({ message: "Не сте регистриран" });
  }
  next();
};

export const isAuth = (req, res, next) => {
  if (!req.user) return res.status(402);
  next();
};
