import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import dbConnection from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/.env" });

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routers

// Database Connection
dbConnection();

// custom middlewares

// cloudinary

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}.`.bgCyan.white);
});

export default app;
