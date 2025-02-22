import express from "express";
import mongoose from "mongoose";
import { configExpress } from "./configs/configExpress.js";
import { router as routes } from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { env } from "./environments/development.js";

const app = express();

configExpress(app);

app.use(authMiddleware);

app.use(routes);

app.use(errorMiddleware);

mongoose
  .connect(env.DBURL)
  .then(() => {
    console.log("DB connected!");
    app.listen(env.PORT, () =>
      console.log(`Server is listening on port ${env.PORT}...`)
    );
  })
  .catch((err) => console.log("Failed connecting DB", err));
