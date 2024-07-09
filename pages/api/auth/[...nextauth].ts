import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const jwtSecret = process.env.NEXTAUTH_SECRET!

export const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token, user }: any) {
      session.user.username = session?.user?.name
        .split(' ')
        .join('')
        .toLocaleLowerCase()

      session.user.uid = token.sub
      return session
    },
  },

  secret: jwtSecret,
}

export default NextAuth(authOption)
