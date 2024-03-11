'use client';

import React from 'react';
import Header from '../../components/Header';
import AddCustomerData from './add-customer-data';

const AddCustomerPage = () => {
	return (
		<div>
			<Header />
			<h2>Add Customer</h2>
			<AddCustomerData />
		</div>
	);
};

export default AddCustomerPage;
