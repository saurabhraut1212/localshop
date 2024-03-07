import { NextResponse } from 'next/server';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const { email, password } = await request.json();
	try {
		await connectDb();
		const existingUser = await User.findOne({ email });
		console.log('Checking for an existing user');

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User with that email already exists' },
				{ status: 400 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword, 'hashedpassword');
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});
		console.log('Creating a new user');

		return NextResponse.json(newUser, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to create user', message: error },
			{ status: 500 }
		);
	}
}
