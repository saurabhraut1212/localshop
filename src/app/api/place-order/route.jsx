import { NextResponse } from 'next/server';
import Order from '../../../models/orderModel';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const { items, totalBill } = await request.json();
	console.log(items, 'items');
	console.log(totalBill, 'totalBill');

	try {
		await connectDb();

		const newOrder = await Order.create({ items, totalBill });
		return NextResponse.json({ data: newOrder }, { status: 200 });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
