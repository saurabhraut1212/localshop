import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddToRemaining = ({ order, totalBill, onAddToRemaining }) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [paidAmount, setPaidAmount] = useState('');
	const [remainingAmount, setRemainingAmount] = useState(totalBill);
	const [totalAmount, setTotalAmount] = useState(totalBill);
	const [customers, setCustomers] = useState([]);

	const handleRemainingAmount = () => {
		setRemainingAmount(totalBill - Number(paidAmount));
	};

	const handleTotalAmount = () => {
		setTotalAmount(Number(paidAmount) + Number(remainingAmount));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const selectedCustomer = customers.find(
				(customer) => customer.name === name
			);
			if (!selectedCustomer) {
				console.error('Selected customer not found');
				return;
			}
			const id = selectedCustomer._id;
			const formData = {
				date,
				paidAmount: Number(paidAmount),
				remainingAmount: Number(remainingAmount),
				totalAmount: Number(totalAmount),
			};

			if (onAddToRemaining) {
				onAddToRemaining(formData, id);
			}

			setName('');
			setDate('');
			setPaidAmount('');
			setRemainingAmount(totalBill);
			setTotalAmount(totalBill);
		} catch (error) {
			console.error('Error submitting form:', error.message);
		}
	};

	useEffect(() => {
		const AllCustomers = async () => {
			try {
				const response = await axios.get('/api/add-customer');
				if (response.status === 200) {
					setCustomers(response.data.data);
					console.log(customers, 'customers');
				} else {
					console.log('Error in getting customers');
				}
			} catch (error) {
				console.log(error);
			}
		};
		AllCustomers();
	}, []);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<select
					name="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				>
					<option value="" disabled>
						Select a customer
					</option>
					{customers.map((customer) => (
						<option key={customer._id} value={customer.name}>
							{customer.name}
						</option>
					))}
				</select>
				<label htmlFor="date">Date</label>
				<input
					type="date"
					id="date"
					placeholder="Enter Date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<label htmlFor="paidAmount">PaidAmount</label>
				<input
					type="number"
					id="paidAmount"
					name="paidAmount"
					placeholder="Enter paid amount"
					value={paidAmount}
					onChange={(e) => setPaidAmount(e.target.value)}
				/>
				<label htmlFor="remainingAmount">RemainingAmount</label>
				<input
					type="number"
					id="remainingAmount"
					name="remainingAmount"
					placeholder="Remaining amount"
					value={remainingAmount}
					onChange={handleRemainingAmount}
				/>
				<label htmlFor="totalAmount">TotalAmount</label>
				<input
					type="number"
					id="totalAmount"
					name="totalAmount"
					placeholder="Total amount"
					value={totalAmount}
					onChange={handleTotalAmount}
				/>
				<button type="submit">Add to remaining</button>
			</form>
		</div>
	);
};

export default AddToRemaining;
