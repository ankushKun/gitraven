import NextAuth, { AuthOptions, Session, User } from "next-auth"
import GiithubProvider from "next-auth/providers/github"

export default NextAuth({
    providers: [
        GiithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    callbacks: {
        session: async ({ session, token }: any) => {
            if (session?.user) {
                const profile = await fetch(`https://api.github.com/user/${token.uid}`).then((res) => res.json());
                // console.log(profile);
                session.user = profile;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
});