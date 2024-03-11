import React from 'react';

const Table = ({ item, billDetail, onDelete }) => {
	const handleDelete = (itemId, billDetailId) => {
		onDelete(itemId, billDetailId);
	};
	return (
		<tr>
			<td>{item.name}</td>
			<td>{billDetail.date}</td>
			<td>{billDetail.paidAmount}</td>
			<td>{billDetail.remainingAmount}</td>
			<td>
				<button onClick={() => handleDelete(item._id, billDetail._id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default Table;
