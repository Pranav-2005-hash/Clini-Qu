import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongodb"

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not set in environment variables')
}

if (!process.env.NEXTAUTH_URL) {
  console.warn('NEXTAUTH_URL is not set in environment variables. This may cause issues with callbacks.')
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider temporarily disabled - uncomment after adding real credentials
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing credentials')
          throw new Error('Email and password are required')
        }

        try {
          console.log('Attempting to connect to database...')
          const { db } = await connectToDatabase()
          console.log('Database connection successful')
          
          console.log(`Looking for user with email: ${credentials.email}`)
          const user = await db.collection("users").findOne({
            email: credentials.email.toLowerCase()
          })

          if (!user) {
            console.error('No user found with this email')
            throw new Error('Invalid email or password')
          }

          console.log('User found, verifying password...')
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.error('Invalid password')
            throw new Error('Invalid email or password')
          }

          console.log('Password verified, user authenticated')
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || user.email.split('@')[0],
            image: user.image || null
          }
        } catch (error) {
          console.error("Authentication error:", error)
          throw new Error('Authentication failed. Please try again.')
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      
      // Update session from client if needed
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        // Create a new user object with the correct types
        const user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
        
        // Only add image if it exists
        if (token.image) {
          user.image = token.image as string;
        }
        
        session.user = user;
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('Auth error:', { code, metadata })
    },
    warn(code) {
      console.warn('Auth warning:', code)
    },
    debug(code, metadata) {
      console.log('Auth debug:', { code, metadata })
    }
  }
}
