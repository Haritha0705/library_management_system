import mongoose from "mongoose";
import config from "../configs/index.js";
import logger from "../utils/logger.js";

let database;

const connect = async () => {
    const MONGODB_URL = config.DB_CONNECTION_STRING;

    if (database) return;
    mongoose
        .connect(MONGODB_URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
            )
        .then((connection) => {
            database = connection;
            logger.info("🔄 Database Synced");
        })
        .catch((err) => {
            logger.error(`⚠️ ${err.message}`);
        });
};

export { connect };