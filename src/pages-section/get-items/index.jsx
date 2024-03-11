'use client';

import React from 'react';
import Header from '../../components/Header';
import GetItemsData from './get-items-data';

const GetItemsPage = () => {
	return (
		<div>
			<Header />
			<h2>All Items</h2>
			<GetItemsData />
		</div>
	);
};

export default GetItemsPage;
