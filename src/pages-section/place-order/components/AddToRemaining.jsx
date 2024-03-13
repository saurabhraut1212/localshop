import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AddToRemaining = ({ order, totalBill, onAddToRemaining }) => {
	const [date, setDate] = useState('');
	const [paidAmount, setPaidAmount] = useState('');
	const [remainingAmount, setRemainingAmount] = useState(totalBill);
	const [totalAmount, setTotalAmount] = useState(totalBill);
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState('');
	const [filteredCustomer, setFilteredCustomer] = useState('');

	const handleRemainingAmount = () => {
		setRemainingAmount(totalBill - Number(paidAmount));
	};

	const handleTotalAmount = () => {
		setTotalAmount(Number(paidAmount) + Number(remainingAmount));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (filteredCustomer && filteredCustomer._id) {
				const id = filteredCustomer._id;
				console.log(id, 'id is here');

				const formData = {
					date,
					paidAmount: Number(paidAmount),
					remainingAmount: Number(remainingAmount),
					totalAmount: Number(totalAmount),
					order,
				};

				if (onAddToRemaining) {
					onAddToRemaining(formData, id);
				}
				setSelectedCustomer('');
				setDate('');
				setPaidAmount('');
				setRemainingAmount(totalBill);
				setTotalAmount(totalBill);
			} else {
				console.error('No customer found or missing _id property.');
			}
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

	const handleFindCustomer = () => {
		const customer = customers.find(
			(customer) =>
				customer.name.toLowerCase() === selectedCustomer.toLowerCase()
		);
		setFilteredCustomer(customer);
		console.log(filteredCustomer, 'filterCustomer');
	};
	return (
		<div>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				id="name"
				value={selectedCustomer}
				onChange={(e) => setSelectedCustomer(e.target.value)}
			/>
			<button onClick={handleFindCustomer}>Find customer</button>
			{filteredCustomer && (
				<form onSubmit={handleSubmit}>
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
			)}
		</div>
	);
};

export default AddToRemaining;
