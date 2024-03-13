'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const HomePage = () => {
	const router = useRouter();

	const [customer, setCustomer] = useState('');
	const [allCustomers, setAllCustomers] = useState([]);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		const FetchAllCustomers = async () => {
			try {
				const response = await axios.get('/api/get-remaining');
				if (response.status === 200) {
					setAllCustomers(response.data.data);
				} else {
					console.log('Error in getting customers');
				}
			} catch (error) {
				console.error(error.message);
			}
		};
		FetchAllCustomers();
	}, []);
	const handleSearchCustomer = () => {
		const filterData = allCustomers.find(
			(customerItem) =>
				customerItem.name.toLowerCase() === customer.toLowerCase()
		);
		setFilteredData(filterData);
	};

	const navigateToPage = (path) => {
		router.push(path);
	};
	return (
		<div>
			<Header />
			<h1>Welcome To The Shop</h1>
			<h2>Search the customer account</h2>
			<input
				type="text"
				placeholder="Search account by name"
				value={customer}
				onChange={(e) => setCustomer(e.target.value)}
			/>
			<button onClick={handleSearchCustomer}>Search</button>
			{filteredData !== null && (
				<>
					{filteredData ? (
						<>
							<p>Already have an account go for order</p>
							<button onClick={() => navigateToPage('/place-order')}>
								Place Order
							</button>
						</>
					) : (
						<>
							<p>Do not have an account ...first create the account</p>
							<button onClick={() => navigateToPage('/add-customer')}>
								Add Customer
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default HomePage;
