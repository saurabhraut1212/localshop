import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import PropTypes from 'prop-types';

const VALIDATION_SCHEMA = yup.object().shape({
	email: yup.string().email().required('Email is required'),
	password: yup.string().min(6, 'Minimum 6 characters are required'),
});

const RegisterForm = (props) => {
	const { initialValues, handleFormSubmit } = props;
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleFormSubmit}
			validationSchema={VALIDATION_SCHEMA}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
					/>
					{touched.email && errors.email && <div>{errors.email}</div>}

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
					/>
					{touched.password && errors.password && <div>{errors.password}</div>}
					<button type="submit">Register</button>
					<p>
						Already have an account <Link href="/login">login</Link>
					</p>
				</form>
			)}
		</Formik>
	);
};

export default RegisterForm;

RegisterForm.propTypes = {
	initialValues: PropTypes.shape({
		email: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}).isRequired,
	handleFormSubmit: PropTypes.func.isRequired,
};
