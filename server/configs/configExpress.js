import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}

export const configExpress = (app) => {
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
};
