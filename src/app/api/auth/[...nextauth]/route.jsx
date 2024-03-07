import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../../../models/userModel';
import { connectDb } from '../../../../db/dbconfig';

const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { type: 'email', label: 'email', placeholder: 'Enter email' },
				password: {
					type: 'password',
					label: 'password',
					placeholder: 'Enter the password',
				},
			},
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					throw new Error('Please provide all credentials');
				}
				//
				try {
					await connectDb();
					const user = await User.findOne({ email: credentials.email });
					if (!user || !user?.password) {
						throw new Error('User not found');
					}

					const matchHashedPassword = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!matchHashedPassword) {
						throw new Error('Incorrect password');
					}

					return user;
				} catch (error) {
					throw new Error('Authentication failed');
				}
			},
		}),
	],
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);
export { handler as POST, handler as GET };
