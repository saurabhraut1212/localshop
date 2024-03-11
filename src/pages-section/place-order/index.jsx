'use client';

import React from 'react';
import Header from '../../components/Header';
import OrderData from './order-data';

const PlaceOrderPage = () => {
	return (
		<div>
			<Header />
			<h2>Place Order</h2>
			<OrderData />
		</div>
	);
};

export default PlaceOrderPage;
