import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Table from './components/Table';

const GetRemainingData = () => {
	const [items, setItems] = useState([]);
	const [searchItem, setSearchItem] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const [overAllRemaining, setOverAllRemaining] = useState(null);

	useEffect(() => {
		const fetchRemainingData = async () => {
			try {
				const response = await axios.get('/api/get-remaining');
				if (response.status === 200) {
					setItems(response.data.data);
					toast.success('Getting RemainingData Items');
				} else {
					toast.error('Error in getting items');
				}
			} catch (error) {
				toast.error(error.message);
			}
		};

		fetchRemainingData();
	}, []);

	useEffect(() => {
		totalRemainingAmount();
	}, [selectedId, items]);

	const handleItemDelete = async (itemId, billDetailId) => {
		try {
			const response = await axios.delete(
				`/api/get-remaining/${itemId}/${billDetailId}`
			);
			if (response.status === 200) {
				toast.success('Item deleted successfully');
				fetchRemainingData();
			} else {
				toast.error('Error deleting item');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const fetchRemainingData = async () => {
		try {
			const updatedResponse = await axios.get('/api/get-remaining');
			if (updatedResponse.status === 200) {
				setItems(updatedResponse.data.data);
				totalRemainingAmount();
			} else {
				toast.error('Error in fetching updated items');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const filteredDataFun = () => {
		if (searchItem.trim() === '') {
			return;
		}
		const response = items.filter((item) =>
			item.name.toLowerCase().includes(searchItem.toLowerCase())
		);

		setFilteredData(response);
		setSelectedId(response.length > 0 ? response[0]._id : '');
		setSearchItem('');
		totalRemainingAmount();
	};

	const totalRemainingAmount = () => {
		const itemToCalculate = items.find((item) => item._id === selectedId);
		if (!itemToCalculate) {
			setOverAllRemaining(0);
			return;
		}
		const totalAmount = itemToCalculate.billDetails.reduce(
			(accumulator, billDetail) => accumulator + billDetail.remainingAmount,
			0
		);
		setOverAllRemaining(totalAmount);
	};

	return (
		<div>
			<label htmlFor="search">Search</label>
			<input
				type="text"
				id="search"
				name="search"
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			<button
				onClick={() => {
					filteredDataFun();
					totalRemainingAmount();
				}}
			>
				Search
			</button>
			{filteredData.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date</th>
							<th>PaidAmount</th>
							<th>RemainingAmount</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.map((item) =>
							item.billDetails.map((billDetail) => (
								<Table
									key={billDetail._id}
									item={item}
									billDetail={billDetail}
									onDelete={handleItemDelete}
								/>
							))
						)}
					</tbody>
					<tfoot>
						<tr>TotalRemaining:{overAllRemaining}</tr>
					</tfoot>
				</table>
			) : (
				<p>No items available</p>
			)}
		</div>
	);
};

export default GetRemainingData;
