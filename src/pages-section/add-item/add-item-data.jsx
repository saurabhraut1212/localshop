import React from 'react';
import AddItemForm from './add-item-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddItemData = () => {
	const router = useRouter();

	const initialValues = {
		name: '',
		quantity: 0,
		unit: '',
		costPrice: 0,
		sellingPrice: 0,
		mrpPrice: 0,
	};
	const handleFormSubmit = async (values) => {
		console.log(values, 'values in form');
		try {
			const response = await axios.post('/api/add-item', values);
			if (response.status === 200) {
				toast.success('Item added successfully');
				router.push('/');
			} else {
				toast.error('Error in adding item');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div>
			<AddItemForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
};

export default AddItemData;
