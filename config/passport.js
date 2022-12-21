// const errorHandler = require("./middleware/error");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();
const mongoose = require("mongoose");
const UserOAuth = require("../models/UserOAuth");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      UserOAuth.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new UserOAuth({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
