import React from 'react';
import RegisterForm from './register-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterData = () => {
	const router = useRouter();
	const initialValues = {
		email: '',
		password: '',
	};

	const handleFormSubmit = async (values) => {
		console.log(values, 'values');
		try {
			const response = await axios.post('/api/register', values);
			console.log(response, 'This is response');

			if (response.status === 200) {
				toast.success('Register successful');
				router.push('/login');
			} else {
				toast.error('Error in registering');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div>
			<RegisterForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
};

export default RegisterData;
