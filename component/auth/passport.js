const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../mongooseModel/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try{
        const user = await User.findById(jwt_payload.id);
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    }catch(err){
        return done(err, false);
    }
}));
