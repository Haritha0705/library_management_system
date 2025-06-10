import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import User from "../api/models/user_model.js";

const googleAuth = (passport) => {
    // Setup Google Strategy
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userObj = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name?.givenName || "",
                    lastName: profile.name?.familyName || "",
                    gmail: profile.emails?.[0]?.value || "",
                    image: profile.photos?.[0]?.value || "",
                };

                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                const newUser = await User.create(userObj);
                return done(null, newUser);
            } catch (err) {
                return done(err, null);
            }
        }
    ));

    // Serialize user ID to session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session using ID
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

export { googleAuth };
