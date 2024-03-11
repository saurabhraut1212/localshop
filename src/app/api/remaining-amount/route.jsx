import { NextResponse } from 'next/server';
import RemainingAmountModel from '../../../models/remaingDataModel';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const remainingData = await request.json();
	const { name, date, amountPaid, remainingAmount } = remainingData;
	try {
		await connectDb();
		const newData = await RemainingAmountModel.create({
			name,
			date,
			amountPaid,
			remainingAmount,
		});
		if (!newData) {
			return NextResponse.json(
				{ message: 'Data is not added to database' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: newData }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
