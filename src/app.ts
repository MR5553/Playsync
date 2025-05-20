import express from "express";
import cors from "cors";
import morgan from "morgan";
import CookieParser from "cookie-parser";


const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(CookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


export default app;