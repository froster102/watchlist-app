import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import config from '../config/config.js'
import { userService } from '../services/index.js'

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.JWT_SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await userService.getUserById(payload.sub)
        if (!user || !user.verificationStatus) {
            return done(null, false)
        }
        return done(null, user)
    } catch (error) {
        return done(error, false)
    }
})

export default jwtStrategy