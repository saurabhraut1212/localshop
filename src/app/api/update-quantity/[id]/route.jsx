import { NextResponse } from 'next/server';
import Item from '../../../../models/itemModel';
import { connectDb } from '../../../../db/dbconfig';

export async function PUT(request, { params }) {
	const { id } = params;
	const { quantity, costPrice, sellingPrice, mrpPrice } = await request.json();

	try {
		await connectDb();
		const searchedItem = await Item.findById(id);

		if (!searchedItem) {
			return NextResponse.json(
				{ message: 'Item with that id is not found' },
				{ status: 400 }
			);
		}

		const updatedItem = await Item.findByIdAndUpdate(
			id,
			{
				$set: {
					quantity: quantity || searchedItem.quantity,
					costPrice: costPrice || searchedItem.costPrice,
					sellingPrice: sellingPrice || searchedItem.sellingPrice,
					mrpPrice: mrpPrice || searchedItem.mrpPrice,
				},
			},
			{ new: true }
		);

		return NextResponse.json({ data: updatedItem }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
