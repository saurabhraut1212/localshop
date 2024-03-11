import React from 'react';
import AddCustomerForm from './add-customer-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddCustomerData = () => {
	const router = useRouter();

	const initialValues = {
		name: '',
		mobileNo: 0,
	};

	const handleFormSubmit = async (values) => {
		try {
			const response = await axios.post('/api/add-customer', values);
			if (response.status === 200) {
				toast.success('Customer added successfully');
				router.push('/');
			} else {
				toast.error('Error in adding customer');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div>
			<AddCustomerForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
};

export default AddCustomerData;
