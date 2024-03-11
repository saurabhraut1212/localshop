import React from 'react';

const TableRow = ({ item, addToOrder }) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{item.unit}</td>
			<td>{item.sellingPrice}</td>
			<td>
				<button
					onClick={() => addToOrder(item.name, item.unit, item.sellingPrice)}
				>
					Add for order
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
