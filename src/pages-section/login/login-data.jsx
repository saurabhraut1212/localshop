import React from 'react';
import LoginForm from './login-form';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginData = () => {
	const router = useRouter();

	const initialValues = {
		email: '',
		password: '',
	};

	const handleFormSubmit = async (values) => {
		signIn('credentials', { ...values, redirect: false }).then((callback) => {
			if (callback?.error) {
				toast.error(callback.error);
			}
			if (callback?.ok && !callback?.error) {
				toast.success('Logged in successfully');
				router.push('/');
			}
		});
	};
	return (
		<div>
			<LoginForm
				initialValues={initialValues}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
};

export default LoginData;
