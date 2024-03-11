import React, { useEffect, useState } from 'react';

const OrderPage = ({ item, onRemove, onUpdateTotalSum }) => {
	const [quantity, setQuantity] = useState(1);
	const [totalSum, setTotalSum] = useState(item.sellingPrice);

	const onIncrease = () => {
		setQuantity((prev) => prev + 1);
		setTotalSum((prev) => prev + item.sellingPrice);
		onUpdateTotalSum(item.id, totalSum + item.sellingPrice);
	};

	const onDecrease = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
			setTotalSum((prev) => prev - item.sellingPrice);
			onUpdateTotalSum(item.id, totalSum - item.sellingPrice);
		}
	};

	useEffect(() => {
		onUpdateTotalSum(item.id, totalSum);
	}, [totalSum, item.id, onUpdateTotalSum]);

	return (
		<tr>
			<td>{item.name}</td>
			<td>
				<button onClick={onDecrease}>-</button>
				{quantity}
				<button onClick={onIncrease}>+</button>
			</td>
			<td>{item.unit}</td>
			<td>{item.sellingPrice}</td>
			<td>{totalSum}</td>
			<td>
				<button onClick={() => onRemove(item.id)}>Remove</button>
			</td>
		</tr>
	);
};

export default OrderPage;
