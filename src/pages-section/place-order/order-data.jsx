import React, { useEffect, useState } from 'react';
import TableRow from './components/TableRow';
import toast from 'react-hot-toast';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import OrderPage from './components/OrderPage';
import AddToRemaining from './components/AddToRemaining';
import { useRouter } from 'next/navigation';

const OrderData = () => {
	const router = useRouter();
	const [items, setItems] = useState([]);
	const [order, setOrder] = useState([]);
	const [totalBill, setTotalBill] = useState(0);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [discount, setDiscount] = useState(0);

	const updateQuantity = async (itemId, newQuantity) => {
		try {
			const response = await axios.put(`/api/get-items/${itemId}`, {
				updatedQuantity: -newQuantity,
			});
			if (response.status === 200) {
				console.log('Quantity updated');
				AllItems();
			} else {
				console.log('Error in updating quantity');
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const AllItems = async () => {
		try {
			const response = await axios.get('/api/get-items');
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

	useEffect(() => {
		// Fetch items on initial load
		AllItems();
	}, []);

	const handleAddToOrder = ({
		itemId,
		name,
		unit,
		sellingPrice,
		quantity,
		totalPrice,
	}) => {
		const existingItem = order.find((item) => item.name === name);

		if (existingItem) {
			console.log('Item already exists:', name);
			return;
		} else {
			setOrder((prevOrder) => [
				...prevOrder,
				{
					id: uuidv4(),
					itemId,
					name,
					unit,
					sellingPrice,
					quantity,
					total: totalPrice,
				},
			]);
			setSearchItem('');
		}
	};

	const handlePlaceOrder = async () => {
		try {
			const orderData = {
				items: order,
				totalBill: totalBill,
			};
			const response = await axios.post('/api/place-order', orderData);

			if (response.status === 200) {
				toast.success('Order placed successfully');
				setOrder([]);
			} else {
				toast.error('Error placing order');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const removeFromOrder = async (itemId, id, quantity) => {
		try {
			const response = await axios.put(`/api/get-items/${itemId}`, {
				updatedQuantity: quantity,
			});
			if (response.status === 200) {
				console.log('Quantity updated');
				AllItems();
			} else {
				console.log('Error in updating quantity');
			}
		} catch (error) {
			console.error(error.message);
		}
		const updateOrder = order.filter((orderItem) => orderItem.id !== id);
		setOrder(updateOrder);
		updateTotalBill(updateOrder);
	};

	const updateTotalSum = (itemId, updatedTotal, quantity) => {
		console.log(quantity, itemId, updatedTotal, 'item id and updated total');
		setOrder((prevOrder) =>
			prevOrder.map((orderItem) =>
				orderItem.id === itemId
					? { ...orderItem, quantity: quantity, total: updatedTotal }
					: orderItem
			)
		);
		console.log(order, 'order');
		updateTotalBill(order);
	};

	useEffect(() => {
		updateTotalBill(order);
	}, [order]);

	const updateTotalBill = (updatedOrder) => {
		const totalAmount = updatedOrder.reduce((accumulator, item) => {
			return accumulator + Number(item.total);
		}, 0);
		setTotalBill(totalAmount);
	};

	const handleFormOpen = () => {
		setIsFormOpen(true);
	};

	const handleAddToRemaining = async (remainingData, id) => {
		try {
			const response = await axios.post(
				`/api/add-customer/${id}`,
				remainingData
			);
			if (response.status === 200) {
				toast.success('Remaining Amount is added');
				router.push('/');
				setIsFormOpen(false);
			} else {
				toast.error('Error in adding remaining amount');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const filteredData = items.filter((item) => {
		if (!searchItem) {
			return;
		}
		return item.name.toLowerCase().includes(searchItem.toLowerCase());
	});

	const handleDiscount = () => {
		const updatedTotalBill = totalBill - Number(discount);
		setTotalBill(updatedTotalBill);
		setDiscount('');
	};

	return (
		<div>
			<label htmlFor="search">Search</label>
			<input
				type="text"
				id="search"
				value={searchItem}
				onChange={(e) => setSearchItem(e.target.value)}
			/>
			{filteredData.length > 0 || order.length > 0 ? (
				<>
					<table>
						{searchItem ? (
							<thead>
								<tr>
									<th>Name</th>
									<th>Quantity</th>
									<th>Available Qty</th>
									<th>Unit</th>
									<th>SellingPrice(per unit)</th>
									<th>Total</th>
									<th>Add</th>
								</tr>
							</thead>
						) : (
							''
						)}

						<tbody>
							{filteredData.map((item) => (
								<TableRow
									key={item.id}
									item={item}
									addToOrder={handleAddToOrder}
									onUpdateTotalSum={updateTotalSum}
									onUpdateQuantity={updateQuantity}
									order={order}
								/>
							))}
						</tbody>
					</table>
					{order.length > 0 && (
						<>
							<h2>Order Summary</h2>
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Quantity</th>
										<th>Unit</th>
										<th>Selling Price</th>
										<th>Total</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{order.map((item) => (
										<OrderPage
											key={item.id}
											item={item}
											onRemove={removeFromOrder}
										/>
									))}
								</tbody>
								<p>TotalBill:{totalBill}</p>
								<label htmlFor="discount">Discount:</label>
								<input
									type="number"
									id="discount"
									name="discount"
									value={discount}
									onChange={(e) => setDiscount(e.target.value)}
								/>
								<button onClick={handleDiscount}>Add Discount</button>
								<button onClick={handlePlaceOrder}>Place Order</button>
								<button onClick={handleFormOpen}>Add to remaining</button>
								{isFormOpen && (
									<tr>
										<td colSpan="6">
											<AddToRemaining
												order={order}
												totalBill={totalBill}
												onAddToRemaining={handleAddToRemaining}
											/>
										</td>
									</tr>
								)}
							</table>
						</>
					)}
				</>
			) : (
				<p>No items available</p>
			)}
		</div>
	);
};

export default OrderData;
