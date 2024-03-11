import { NextResponse } from 'next/server';
import Order from '../../../models/orderModel';
import { connectDb } from '../../../db/dbconfig';

export async function POST(request) {
	const order = await request.json();

	try {
		await connectDb();

		const newOrder = await Order.create({ items: order });
		return NextResponse.json({ data: newOrder }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 400 });
	}
}
