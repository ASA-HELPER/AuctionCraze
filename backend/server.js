import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import dbConnection from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { BASE_ROUTE, SERVICE_ROUTES } from "./constants/routes.js";
import userRouter from "./router/userRoutes.js";
import adminRouter from "./router/adminRoutes.js";

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
app.use(`${BASE_ROUTE}${SERVICE_ROUTES.USER}`, userRouter);
app.use(`${BASE_ROUTE}${SERVICE_ROUTES.ADMIN}`, adminRouter);

// Database Connection
dbConnection();

// custom middlewares
app.use(errorMiddleware);

// cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}.`.bgCyan.white);
});

export default app;
