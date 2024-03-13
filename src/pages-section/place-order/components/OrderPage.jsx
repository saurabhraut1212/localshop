import React from 'react';

const OrderPage = ({ item, onRemove }) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{item.quantity}</td>
			<td>{item.unit}</td>
			<td>{item.sellingPrice}</td>
			<td>{item.total}</td>
			<td>
				<button onClick={() => onRemove(item.itemId, item.id, item.quantity)}>
					Remove
				</button>
			</td>
		</tr>
	);
};

export default OrderPage;
