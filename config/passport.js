// Import passport module
const passport = require ("passport")
const User = require("../models/User")

// Define passport OAuth strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// implementing the google strategy
passport.use(new GoogleStrategy(
    // now we build our configuration object inside this function call
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // the verify callback function
    async function(accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth
        try {
            // check for the user in our db
            let user = await User.findOne({ googleId: profile.id})
            // if a user is found, provide to passport
            if (user) return cb(null, user)
            // otherwise, we'll create a new user to provide to passport
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            // grab newly created user and store it in newUser
            let newUser = await User.findOne({googleId: profile.id})
            console.log(newUser)
            // create a new profile with owner set as newUser and defaults set by the same
            profile = await Profile.Profile.create({
                owner: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar
            })
            // grab newly created profile and store it in newProfile
            let newProfile = await Profile.Profile.findOne({owner: newUser._id})
            // add newProfile id to newUser to create bidirectional ownership link
            await newUser.updateOne({profile: newProfile._id})
            console.log(newProfile)
            return cb(null, user)
        } catch (err) {
            return cb(err)
        }
    }
))

// de/serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(async function (googleId, done) {
    try {
      const user = await User.findOne({ googleId });
      done(null, user);
    } catch (error) {
      done(error);
    }
});
  