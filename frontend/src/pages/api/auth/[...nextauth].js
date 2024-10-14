import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {

            console.log(token, account, user);

            // This is the first sign-in or when account details are updated
            if (account && user) {
                token.accessToken = account.access_token;
                token.user = {
                    userName: user.name,
                    email: user.email,
                    image: user.image,
                };

                // Send the user info to your backend for storing in the database
                try {
                    await axios.post('http://localhost:5000/googleLogin', {
                        userName: user.name,
                        email: user.email,
                        image: user.image, // You can store the profile picture as well
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error('Error saving user to the database:', error?.response?.data?.message);
                }
            }

            return token;
        },

        async session({ session, token }) {
            // Add token info to the session object
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
