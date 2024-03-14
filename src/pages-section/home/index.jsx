'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// ... (previous code)

const HomePage = () => {
	const router = useRouter();

	const [customer, setCustomer] = useState('');
	const [allCustomers, setAllCustomers] = useState([]);
	const [filteredData, setFilteredData] = useState(null);
	const [searchClicked, setSearchClicked] = useState(false);

	useEffect(() => {
		const fetchAllCustomers = async () => {
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
		fetchAllCustomers();
	}, []);

	const handleSearchCustomer = () => {
		const filterData = allCustomers.find(
			(customerItem) =>
				customerItem.name.toLowerCase() === customer.toLowerCase()
		);
		setFilteredData(filterData);
		setSearchClicked(true);
	};

	const resetCustomerInput = () => {
		setCustomer(''); // Reset customer input after search is done
	};

	const navigateToPage = (path) => {
		router.push(path);
	};

	const handleInputChange = (e) => {
		setCustomer(e.target.value);
		setSearchClicked(false);
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
				onChange={handleInputChange}
			/>
			<button onClick={handleSearchCustomer}>Search</button>
			{searchClicked && customer !== '' && filteredData !== null && (
				<>
					{filteredData ? (
						<>
							<p>Already have an account, go for an order</p>
							<button
								onClick={() => {
									resetCustomerInput();
									navigateToPage('/place-order');
								}}
							>
								Place Order
							</button>
						</>
					) : (
						<>
							<p>Do not have an account ...first create the account</p>
							<button
								onClick={() => {
									resetCustomerInput();
									navigateToPage('/add-customer');
								}}
							>
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
