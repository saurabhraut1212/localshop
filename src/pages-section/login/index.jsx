'use client';

import React from 'react';
import LoginData from './login-data';
import Header from '../../components/Header';

const LoginPage = () => {
	return (
		<div>
			<Header />
			<h2>Login Page</h2>
			<LoginData />
		</div>
	);
};

export default LoginPage;
