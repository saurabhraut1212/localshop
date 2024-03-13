import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdateQuantityTable from './update-quantity-table';

const UpdateQuantityData = () => {
	const [items, setItems] = useState([]);
	const [searchItem, setSearchItem] = useState('');

	const GetAllItems = async () => {
		try {
			const response = await axios.get('/api/get-items');
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
		GetAllItems();
	}, []);

	const filteredData = items.filter((item) => {
		if (!searchItem) {
			return;
		}
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	const handleUpdateItem = async (id, updatedItem) => {
		try {
			const response = await axios.put(
				`/api/update-quantity/${id}`,
				updatedItem
			);
			if (response.status === 200) {
				toast.success('Update successful');
				GetAllItems();
				setSearchItem('');
			} else {
				toast.error('Error in update');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div>
			<label htmlFor="search">Search Item</label>
			<input
				type="text"
				placeholder="Enter item name"
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			{filteredData.length > 0 && (
				<table>
					{searchItem ? (
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Unit</th>
								<th>Cost Price</th>
								<th>Selling Price</th>
								<th>Mrp Price</th>
								<th>Update</th>
							</tr>
						</thead>
					) : (
						''
					)}
					<tbody>
						{filteredData.map((item) => (
							<UpdateQuantityTable
								key={item._id}
								item={item}
								onUpdateItem={handleUpdateItem}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UpdateQuantityData;
