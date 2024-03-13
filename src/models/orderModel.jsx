import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	unit: { type: String, required: true },
	sellingPrice: { type: Number, required: true },
	quantity: { type: Number, required: true },
	total: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
	{
		items: [orderItemSchema],
		totalBill: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
