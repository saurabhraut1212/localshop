'use client';

import React from 'react';
import Header from '../../components/Header';
import AddItemData from './add-item-data';

const AddItemPage = () => {
	return (
		<div>
			<Header />
			<h2>Add Item</h2>
			<AddItemData />
		</div>
	);
};

export default AddItemPage;
