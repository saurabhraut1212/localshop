import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const GetRemainingData = () => {
	const [items, setItems] = useState([]);
	const [searchItem, setSearchItem] = useState('');
	const [filteredData, setFilteredData] = useState('');
	const [amount, setAmount] = useState(0);

	const GetCustomerData = async () => {
		try {
			const response = await axios.get('/api/get-remaining');

			if (response.status === 200) {
				toast.success('Getting items');
				setItems(response.data.data);
			} else {
				toast.error('Error in getting items');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		GetCustomerData();
	}, []);

	const searchHandler = () => {
		if (searchItem.trim() === '') {
			return;
		}
		const response = items.find(
			(item) => item.name.toLowerCase() === searchItem.toLowerCase()
		);

		setFilteredData(response);
	};

	const updateOverAllRemaining = async () => {
		const id = filteredData._id;
		try {
			const response = await axios.put(`/api/get-remaining/${id}`, {
				updatedValue: amount,
			});
			if (response.status === 200) {
				toast.success('OverAllRemaining value is updated');
				setFilteredData(response.data.data);
				GetCustomerData();
			} else {
				toast.error('Error in updating overAllRemaining');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div>
			<input
				type="text"
				placeholder="Search customer"
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			<button onClick={searchHandler}>Search</button>
			{filteredData && (
				<>
					<input
						type="number"
						placeholder="Enter amount to be paid"
						value={amount || ''}
						onChange={(e) => {
							const newAmount = parseFloat(e.target.value);
							setAmount(isNaN(newAmount) ? '' : newAmount);
						}}
					/>
					<button onClick={updateOverAllRemaining}>
						UpdateRemainingAmount
					</button>
					{/* Display overall remaining amount */}
					<p>
						OverAllRemaining:
						{filteredData.overAllRemaining}
					</p>
				</>
			)}
		</div>
	);
};

export default GetRemainingData;
