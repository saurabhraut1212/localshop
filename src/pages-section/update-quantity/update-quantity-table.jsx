import React, { useState } from 'react';

const UpdateQuantityTable = ({ item, onUpdateItem }) => {
	const [updatedQuantity, setUpdatedQuantity] = useState(item.quantity);
	const [updatedCostPrice, setUpdatedCostPrice] = useState(item.costPrice);
	const [updatedSellingPrice, setUpdatedSellingPrice] = useState(
		item.sellingPrice
	);
	const [updatedMrpPrice, setUpdatedMrpPrice] = useState(item.mrpPrice);

	const handleUpdate = () => {
		const id = item._id;

		const updatedItem = {
			quantity: updatedQuantity,
			costPrice: updatedCostPrice,
			sellingPrice: updatedSellingPrice,
			mrpPrice: updatedMrpPrice,
		};

		onUpdateItem(id, updatedItem);
	};
	return (
		<tr>
			<td>{item.name}</td>
			<td>
				<input
					type="number"
					value={updatedQuantity || ''}
					onChange={(e) => {
						const newQuantity = parseFloat(e.target.value, 10);
						setUpdatedQuantity(isNaN(newQuantity) ? 0 : newQuantity);
					}}
				/>
			</td>
			<td>{item.unit}</td>
			<td>
				<input
					type="number"
					value={updatedCostPrice || ''}
					onChange={(e) => {
						const newQuantity = parseFloat(e.target.value, 10);
						setUpdatedCostPrice(isNaN(newQuantity) ? 0 : newQuantity);
					}}
				/>
			</td>
			<td>
				<input
					type="number"
					value={updatedSellingPrice || ''}
					onChange={(e) => {
						const newQuantity = parseFloat(e.target.value, 10);
						setUpdatedSellingPrice(isNaN(newQuantity) ? 0 : newQuantity);
					}}
				/>
			</td>
			<td>
				<input
					type="number"
					value={updatedMrpPrice || ''}
					onChange={(e) => {
						const newQuantity = parseFloat(e.target.value, 10);
						setUpdatedMrpPrice(isNaN(newQuantity) ? 0 : newQuantity);
					}}
				/>
			</td>
			<td>
				<button onClick={handleUpdate}>Update item</button>
			</td>
		</tr>
	);
};

export default UpdateQuantityTable;
