'use client';

import React from 'react';
import Header from '../../components/Header';
import UpdateQuantityData from './update-quantity-data';

const UpdateQuantityPage = () => {
	return (
		<div>
			<Header />
			<h2>Update Quantity</h2>
			<UpdateQuantityData />
		</div>
	);
};

export default UpdateQuantityPage;
