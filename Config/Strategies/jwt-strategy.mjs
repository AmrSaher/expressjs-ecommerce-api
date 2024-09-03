import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "../../Models/User.mjs";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET || "secret";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (!user) return done(null, false);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);
