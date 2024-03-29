import { NextResponse } from 'next/server';
import Customer from '../../../../models/customerModel';
import { connectDb } from '../../../../db/dbconfig';

export async function POST(request, { params }) {
	const { id } = params;

	try {
		await connectDb();
		const { date, paidAmount, remainingAmount, totalAmount, order } =
			await request.json();

		const customer = await Customer.findById(id);

		if (!customer) {
			return NextResponse.json(
				{ message: 'Customer with that id is not found' },
				{ status: 400 }
			);
		}

		const newOverallRemaining = customer.overAllRemaining + remainingAmount;

		const updatedCustomer = await Customer.findByIdAndUpdate(
			id,
			{
				$push: {
					billDetails: {
						date,
						paidAmount,
						remainingAmount,
						totalAmount,
					},
					orderDetails: order,
				},
				$set: { overAllRemaining: newOverallRemaining },
			},
			{
				new: true,
			}
		);

		if (!updatedCustomer) {
			return NextResponse.json(
				{ message: 'Failed to update customer with that id' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ data: updatedCustomer }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
