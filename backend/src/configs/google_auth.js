import GoogleStrategy from "passport-google-oauth20";
import config from "./index.js";
import User from "../api/models/user_model.js";

const googleAuth = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
                callbackURL: config.GOOGLE_REDIRECT_URL,
            },
            async (accessToken, refreshToken, profile, callback) => {
                const userObj = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    gmail: profile.emails[0].value,
                    image: profile.photos[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                };

                const user = await User.findOne({ googleId: profile.id });
                if (user) return callback(null, user);

                try {
                    const newUser = await User.create(userObj);
                    return callback(null, newUser);
                } catch (err) {
                    return callback(err);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => cb(null, user.id));

    passport.deserializeUser(async (id, cb) => {
        try {
            const user = await User.findById(id);
            cb(null, user);
        } catch (err) {
            cb(err);
        }
    });

};

export { googleAuth };
