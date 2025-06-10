import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

const googleAuth = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL
    }, (accessToken, refreshToken, profile, callback) => {
        console.log(profile);
        return callback(null, profile);
    }));

    passport.serializeUser((user, callback) => {
        callback(null, user);
    });

    passport.deserializeUser((user, callback) => {
        callback(null, user);
    });
};

export { googleAuth };
