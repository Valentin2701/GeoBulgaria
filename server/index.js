import express from "express";
import mongoose from "mongoose";
import { configExpress } from "./configs/configExpress.js";
import { router as routes } from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const PORT = 5000;

const app = express();

configExpress(app);

app.use(authMiddleware);

app.use(routes);

app.use(errorMiddleware);

mongoose
  .connect("mongodb://127.0.0.1:27017/GeoBulgaria")
  .then(() => {
    console.log("DB connected!");
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  })
  .catch((err) => console.log("Failed connecting DB", err));
