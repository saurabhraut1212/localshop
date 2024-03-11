import { NextResponse } from 'next/server';
import Item from '../../../models/itemModel';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const values = await request.json();
	console.log(values, 'values');

	try {
		await connectDb();
		const newItem = await Item.create(values);
		if (!newItem) {
			return NextResponse.json(
				{ message: 'Getting error for adding new item' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ data: newItem }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
