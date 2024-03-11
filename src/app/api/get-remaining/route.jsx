import { NextResponse } from 'next/server';
import { connectDb } from '../../../db/dbconfig';
import Customer from '../../../models/customerModel';

export async function GET(request) {
	try {
		await connectDb();
		const remainingData = await Customer.find({});
		if (!remainingData) {
			return NextResponse.json(
				{ message: 'Error in getting remainingData' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: remainingData }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
