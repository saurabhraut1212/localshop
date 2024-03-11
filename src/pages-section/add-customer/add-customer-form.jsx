import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const VALIDATION_SCHEMA = yup.object().shape({
	name: yup.string().required('Name is required'),
	mobileNo: yup
		.number()
		.required('Mobile number is required')
		.positive('Mobile number must be positive')
		.integer('Mobile number must be an integer')
		.typeError('Invalid mobile number'),
});

const AddCustomerForm = (props) => {
	const { initialValues, handleFormSubmit } = props;
	return (
		<div>
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
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>
						{touched.name && errors.name && <div>{errors.name}</div>}

						<label htmlFor="mobileNo">MobileNo</label>
						<input
							type="number"
							id="mobileNo"
							name="mobileNo"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.mobileNo}
						/>
						{touched.mobileNo && errors.mobileNo && (
							<div>{errors.mobileNo}</div>
						)}
						<button type="submit">Add Customer</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddCustomerForm;

AddCustomerForm.propTypes = {
	initialValues: PropTypes.shape({
		email: PropTypes.string.isRequired,
		mobileNo: PropTypes.number.isRequired,
	}).isRequired,
	handleFormSubmit: PropTypes.func.isRequired,
};
