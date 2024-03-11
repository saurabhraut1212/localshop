import React from 'react';

const TableRow = ({ item }) => {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{item.quantity}</td>
			<td>{item.unit}</td>
			<td>{item.costPrice}</td>
			<td>{item.sellingPrice}</td>
			<td>{item.mrpPrice}</td>
		</tr>
	);
};

export default TableRow;
