import { NextResponse } from 'next/server';
import { connectDb } from '../../../../db/dbconfig';
import Customer from '../../../../models/customerModel';

export async function PUT(request, { params }) {
	const { id } = params;
	const { updatedValue } = await request.json();
	try {
		await connectDb();
		const customer = await Customer.findById(id);
		if (!customer) {
			return NextResponse.json(
				{ message: 'Customer with that id is not getting' },
				{ status: 400 }
			);
		}

		const updatedTotalRemaining = customer.overAllRemaining - updatedValue;
		const updatedCustomer = await Customer.findByIdAndUpdate(
			id,
			{
				$set: {
					overAllRemaining: updatedTotalRemaining,
				},
			},
			{
				new: true,
			}
		);

		if (!updatedCustomer) {
			return NextResponse.json(
				{ message: 'Failed to update customer with that id' },
				{ status: 400 }
			);
		}

		return NextResponse.json({ data: updatedCustomer }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
