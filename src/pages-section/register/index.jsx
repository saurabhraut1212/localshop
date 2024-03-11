'use client';

import React from 'react';
import RegisterData from './register-data';
import Header from '../../components/Header';

const RegisterPage = () => {
	return (
		<div>
			<Header />
			<h2>Register Form</h2>
			<RegisterData />
		</div>
	);
};

export default RegisterPage;
