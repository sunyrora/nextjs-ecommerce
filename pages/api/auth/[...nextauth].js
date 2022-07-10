import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import connectDB, { disconnectDB } from '../../../db/config';
import User from '../../../db/models/Users';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'NextJS E-Commerce',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        await connectDB();
        const user = await User.findOne({
          email: credentials.email,
        }).select('+password');

        disconnectDB();

        if (!user) {
          console.log('User not found.');
          throw new Error('User not exist');
        }

        const isMatch = await user?.matchPassword(credentials.password);

        if (isMatch) {
          // auth proccess
          return {
            _id: user._id,
            name: user.username,
            email: user.email,
            image: 'f',
            isAdmin: user.isAdmin,
          };
        }

        throw new Error('Invalid email or password');
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
