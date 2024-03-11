import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TableRow from './components/TableRow';

const GetItemsData = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const AllItems = async () => {
			try {
				const response = await axios.get('/api/get-items');
				console.log(response, 'response');
				if (response.status === 200) {
					setItems(response.data.data);
					toast.success('Getting Items');
				} else {
					toast.error('Error in getting items');
				}
			} catch (error) {
				toast.error(error.message);
			}
		};
		AllItems();
	}, []);
	return (
		<div>
			{items.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Quantity</th>
							<th>Unit</th>
							<th>CostPrice</th>
							<th>SellingPrice</th>
							<th>MrpPrice</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<TableRow key={item.id} item={item} />
						))}
					</tbody>
				</table>
			) : (
				<p>No items available</p>
			)}
		</div>
	);
};

export default GetItemsData;
