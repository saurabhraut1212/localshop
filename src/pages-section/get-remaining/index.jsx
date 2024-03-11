'use client';

import React from 'react';
import Header from '../../components/Header';
import GetRemainingData from './get-remaining-data';

const GetRemainingPage = () => {
	return (
		<div>
			<Header />
			<h2>Remaining Amount Details</h2>
			<GetRemainingData />
		</div>
	);
};

export default GetRemainingPage;
