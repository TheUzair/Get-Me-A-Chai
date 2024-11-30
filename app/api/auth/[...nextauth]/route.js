import NextAuth from "next-auth"
// import Appleprovider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import TwitterProvider from "next-auth/providers/twitter"
// import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github"
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "@/models/User"
import connectDB from "@/db/connectDB"

const authOptions = NextAuth({
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Appleprovider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "r_liteprofile r_emailaddress",
        },
      },
    })

    // // Passwordless / email sign in
    // EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    // }),
    // TwitterProvider({
    //     clientId: process.env.TWITTER_ID,
    //     clientSecret: process.env.TWITTER_SECRET,
    //   }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const userName = profile.login || 'defaultUsername';
      const email = profile.email || user.email;

      try {
        await connectDB();
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          const newUser = new User({
            name: profile.name || user.name || '',
            userName: profile.login || 'defaultUsername',
            email,
            profilePic: profile.avatar_url || user.image || '',
            coverPic: '',
          });

          await newUser.save();
        }
        return true; // Proceed with login
      } catch (err) {
        console.error('Error during signIn:', err.message);
        return false; // Block login on error
      }
    },
    async session({ session, user, token }) {
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email })

        if (dbUser) {
          session.user.name = dbUser.username || session.user.name;
          session.user.id = dbUser._id.toString();  // Attach user ID
        }
      } catch (err) {
        console.error('Error during session:', err.message);
      }

      return session;  // Return the modified session
    }
  }
})

export { authOptions as GET, authOptions as POST }
