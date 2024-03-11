import { NextResponse } from 'next/server';
import Customer from '../../../models/customerModel';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const { name, mobileNo } = await request.json();
	try {
		await connectDb();

		const newCustomer = await Customer.create({
			name,
			mobileNo,
		});
		if (!newCustomer) {
			return NextResponse.json(
				{ message: 'Customer is not added' },
				{ status: 400 }
			);
		}
		await newCustomer.save();
		return NextResponse.json({ data: newCustomer }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function GET(request) {
	try {
		const customers = await Customer.find({});
		if (!customers) {
			return NextResponse.json(
				{ message: 'Error in getting customers' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: customers }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
