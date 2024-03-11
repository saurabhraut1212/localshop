import mongoose from 'mongoose';

const billDetailsSchema = new mongoose.Schema({
	date: { type: String, required: true },
	paidAmount: { type: Number, required: true },
	remainingAmount: { type: Number, required: true },
	totalAmount: { type: Number, required: true },
});

const customerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		mobileNo: { type: Number, required: true },
		billDetails: [billDetailsSchema],
	},
	{
		timestamps: true,
	}
);

const Customer =
	mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;
