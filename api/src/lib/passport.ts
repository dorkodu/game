import { config } from "@api/config"
import { generateUsername } from "@api/namespaces/user/generate-username"
import { userRepository } from "@api/namespaces/user/repository"
import { userService } from "@api/namespaces/user/service"
import { Passport } from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

export const passport = new Passport()

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: `${config.origin}/oauth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const oauthId = profile._json.sub

      let userId = await userRepository.getUserIdWithGoogle(oauthId)
      if (!userId) {
        if (!profile._json.email_verified) return done()
        if (!profile._json.email) return done()

        const username = generateUsername()
        const email = profile._json.email

        const user = await userService.createUserWithGoogle(
          username,
          oauthId,
          email
        )

        userId = user?.id
      }

      done(null, userId ? { id: userId } : undefined)
    }
  )
)

