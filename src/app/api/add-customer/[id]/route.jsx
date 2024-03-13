import { NextResponse } from 'next/server';
import Customer from '../../../../models/customerModel';
import { connectDb } from '../../../../db/dbconfig';

export async function POST(request, { params }) {
	const { id } = params;

	try {
		await connectDb();
		const { date, paidAmount, remainingAmount, totalAmount, order } =
			await request.json();

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
			},
			{
				new: true,
			}
		);
		if (!updatedCustomer) {
			return NextResponse.json(
				{ message: 'Customer with that id is not getting' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: updatedCustomer }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
