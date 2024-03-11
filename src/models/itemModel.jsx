import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		unit: { type: String, required: true },
		costPrice: { type: Number, required: true },
		sellingPrice: { type: Number, required: true },
		mrpPrice: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);
export default Item;
