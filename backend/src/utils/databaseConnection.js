import mongoose from "mongoose";
import config from "../configs/index.js";
import logger from "../utils/logger.js";

let database;

export const connect = async () => {
    if (database) return;

    mongoose
        .connect(config.DB_CONNECTION_STRING)
        .then((conn) => {
            database = conn;
            logger.info("🔄 Database Synced");
        })
        .catch((err) => {
            logger.error(`⚠️ ${err.message}`);
        });
};
