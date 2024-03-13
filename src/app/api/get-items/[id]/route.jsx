import { NextResponse } from 'next/server';
import { connectDb } from '../../../../db/dbconfig';
import Item from '../../../../models/itemModel';

export async function PUT(request, { params }) {
	const { id: itemId } = params;
	const { updatedQuantity } = await request.json();
	console.log(updatedQuantity, 'updated');
	console.log(itemId, 'itemId');
	try {
		await connectDb();

		const existingItem = await Item.findById(itemId);

		if (!existingItem) {
			return NextResponse.json(
				{ message: 'Item with that id not found' },
				{ status: 400 }
			);
		}

		const updatedItem = await Item.findByIdAndUpdate(itemId, {
			$set: {
				quantity: existingItem.quantity + updatedQuantity,
			},
		});

		if (!updatedItem) {
			return NextResponse.json(
				{ message: 'Item with that id is not getting' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: updatedItem }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
