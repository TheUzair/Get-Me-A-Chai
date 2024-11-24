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
  // Configure one or more authentication providers
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
      // GitHub's profile object should have 'login' as the username
      const userName = profile.login || 'defaultUsername'; // Fallback in case 'login' is missing
      const email = profile.email || user.email;

      // Ensure database connection is established
      await connectDB();

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email: user.email });

      // If the user does not exist, create a new user
      if (!existingUser) {
        try {
          newUser = new User({
            name: profile.name || user.name || '',
            userName: profile.given_name || 'defaultUsername',
            email: user.email,
            profilePic: profile.avatar_url || user.image || '',
            coverPic: '', // Add any default or extracted coverPic if needed
          });
          await newUser.save();
        } catch (err) {
          throw new Error('User validation failed');
        }
      }
      return true; // Proceed with the login process
    }
  },
  async session({ session, user, token }) {
    await connectDB();  // Ensure connection before querying
    // Fetch the user from the database based on the email in session
    const dbUser = await User.findOne({ email: session.user.email })
    
    if (dbUser) {
      // Attach relevant user data to the session
      session.user.name = dbUser.username || session.user.name;
      session.user.id = dbUser._id.toString();  // Attach user ID
    }

    return session;  // Return the modified session
  },
})

export {authOptions as GET, authOptions as POST}
