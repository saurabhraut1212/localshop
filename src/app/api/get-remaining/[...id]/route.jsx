import { NextResponse } from 'next/server';
import { connectDb } from '../../../../db/dbconfig';
import Customer from '../../../../models/customerModel';

export async function DELETE(request, { params }) {
	console.log(params, 'params');
	const {
		id: [id1, id2],
	} = params;
	console.log(id1, 'id1');
	console.log(id2, 'id2');
	try {
		await connectDb();
		const updatedData = await Customer.findByIdAndUpdate(
			id1,
			{ $pull: { billDetails: { _id: id2 } } },
			{ new: true }
		);
		if (!updatedData) {
			return NextResponse.json(
				{ message: 'Item with that id is not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({ data: updatedData }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
