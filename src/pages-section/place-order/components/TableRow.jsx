import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const TableRow = ({
	order,
	item,
	addToOrder,
	onUpdateTotalSum,
	onUpdateQuantity,
}) => {
	const [newQuantity, setNewQuantity] = useState(0);
	const [customPrice, setCustomPrice] = useState(0);
	const [unit, setUnit] = useState('');

	useEffect(() => {
		if (unit === 'gm') {
			const convertedQuantity = newQuantity / 1000;
			if (convertedQuantity > item.quantity) {
				toast.error('No available quantity');
				setNewQuantity(0);
			}
		} else if (unit === 'kg' && newQuantity > item.quantity) {
			toast.error('No available quantity');
			setNewQuantity(0);
		}
	}, [newQuantity, unit, item.quantity]);

	const updateTotal = (newQuantity) => {
		console.log(newQuantity, 'newQuantity');
		const convertedQuantity = unit === 'gm' ? newQuantity / 1000 : newQuantity;
		const total = convertedQuantity * parseFloat(item.sellingPrice);
		console.log(total, 'total here');
		onUpdateTotalSum(item.id, total, newQuantity);
	};

	const updateTotalCustom = (newPrice) => {
		const convertedQuantity = unit === 'gm' ? newQuantity / 1000 : newQuantity;
		onUpdateTotalSum(item.id, newPrice, convertedQuantity);
	};

	useEffect(() => {
		if (unit === 'gm') {
			updateTotalCustom(customPrice);
		} else {
			updateTotal(newQuantity);
		}
	}, [newQuantity, customPrice, unit]);

	const addToOrderWithDetails = () => {
		const convertedQuantity = unit === 'gm' ? newQuantity / 1000 : newQuantity;
		const totalPrice =
			unit === 'gm'
				? customPrice
				: convertedQuantity * parseFloat(item.sellingPrice);

		addToOrder({
			itemId: item._id,
			name: item.name,
			unit: unit,
			sellingPrice: item.sellingPrice,
			quantity: convertedQuantity,
			totalPrice: totalPrice,
		});
	};

	const handleUpdate = () => {
		const convertedQuantity = unit === 'gm' ? newQuantity / 1000 : newQuantity;
		onUpdateQuantity(item._id, convertedQuantity);
	};

	const isItemInOrder = order.some(
		(orderItem) => orderItem.itemId === item._id
	);

	return (
		<tr>
			<td>{item.name}</td>
			<td>
				<input
					type="number"
					value={newQuantity || ''}
					onChange={(e) => {
						const newQuantity = parseFloat(e.target.value, 10);
						setNewQuantity(isNaN(newQuantity) ? 0 : newQuantity);
					}}
				/>
			</td>
			<td>
				{item.quantity}
				{item.unit}
			</td>
			<td>
				<select
					name="unit"
					id="unit"
					value={unit}
					onChange={(e) => setUnit(e.target.value)}
				>
					<option value="">Select unit</option>
					<option value="kg">kg</option>
					<option value="gm">gm</option>
					<option value="nos">nos</option>
				</select>
			</td>
			<td>{item.sellingPrice}</td>
			<td>
				{unit === 'gm' ? (
					<input
						type="number"
						value={customPrice || ''}
						onChange={(e) => {
							const newPrice = parseFloat(e.target.value, 10);
							setCustomPrice(isNaN(newPrice) ? 0 : newPrice);
							updateTotalCustom(newPrice);
						}}
					/>
				) : (
					newQuantity * parseFloat(item.sellingPrice)
				)}
			</td>
			<td>
				<button
					onClick={() => {
						if (!isItemInOrder) {
							addToOrderWithDetails();
							handleUpdate();
						} else {
							toast.error('Item is already in the order');
						}
					}}
					disabled={newQuantity <= 0 || isItemInOrder}
				>
					Add for order
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
