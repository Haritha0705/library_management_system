import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";
import "dotenv/config";
import { connect } from "./utils/databaseConnection.js";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { googleAuth } from "./configs/google_auth.js";
import { routesInit } from "./api/routes/index.js";

const app = express();
const PORT = process.env.PORT || "8090";
const HOST = "127.0.0.1";

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20mb" }));

// ✅ Single session middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL || process.env.MONGO_URI,
        collectionName: "sessions",
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        secure: false,
        httpOnly: true,
    },
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup Google OAuth strategy
googleAuth(passport);

// Simple Home Route
app.get("/", (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
});

// Connect to DB
connect();

// Initialize Routes
routesInit(app, passport);

app.listen(PORT, HOST, () => {
    logger.info(`🚀 Server is up and running at http://${HOST}:${PORT}`);
});
