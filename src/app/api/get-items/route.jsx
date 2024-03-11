import { NextResponse } from 'next/server';
import Item from '../../../models/itemModel';
import { connectDb } from '../../../db/dbconfig';

export async function GET(request) {
	try {
		await connectDb();
		const items = await Item.find({});
		if (!items || items.length === 0) {
			return NextResponse.json({ message: 'No items found' }, { status: 404 });
		}
		return NextResponse.json({ data: items }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Error getting items', error: error.message },
			{ status: 500 }
		);
	}
}
