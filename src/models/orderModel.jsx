import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		items: [
			{
				name: { type: String, required: true },
				counter: { type: Number, default: 1 },
				unit: { type: String, required: true },
				sellingPrice: { type: Number, required: true },
				total: { type: Number, required: true },
			},
		],
		total: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
