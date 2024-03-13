import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const VALIDATION_SCHEMA = yup.object().shape({
	name: yup.string().required('Name is required'),
	quantity: yup.number().required('Quantity is required'),
	unit: yup.string().required('Unit is required'),
	costPrice: yup.number().required('costPrice is required'),
	sellingPrice: yup.number().required('SellingPrice is required'),
	mrpPrice: yup.number().required('mrpPrice is required'),
});

const AddItemForm = (props) => {
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
							placeholder="Name"
							value={values.name}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{touched.name && errors.name && <div>{errors.name}</div>}
						<label htmlFor="quantity">Quantity</label>
						<input
							type="text"
							id="quantity"
							placeholder="Quantity"
							value={values.quantity}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{touched.quantity && errors.quantity && (
							<div>{errors.quantity}</div>
						)}
						<label htmlFor="unit">Unit</label>
						<select
							name="unit"
							id="unit"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.unit}
						>
							<option value="">Select unit</option>
							<option value="nos">nos</option>
							<option value="gm">gm</option>
							<option value="kg">kg</option>
						</select>
						{touched.unit && errors.unit && <div>{errors.unit}</div>}
						<label htmlFor="costPrice">CostPrice</label>
						<input
							type="number"
							id="costPrice"
							placeholder="CostPrice per unit"
							value={values.costPrice}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{touched.costPrice && errors.costPrice && (
							<div>{errors.costPrice}</div>
						)}
						<label htmlFor="sellingPrice">SellingPrice</label>
						<input
							type="number"
							id="sellingPrice"
							placeholder="SellingPrice per unit"
							value={values.sellingPrice}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{touched.sellingPrice && errors.sellingPrice && (
							<div>{errors.sellingPrice}</div>
						)}
						<label htmlFor="mrpPrice">MrpPrice</label>
						<input
							type="number"
							id="mrpPrice"
							placeholder="MrpPrice per unit"
							value={values.mrpPrice}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{touched.mrpPrice && errors.mrpPrice && (
							<div>{errors.mrpPrice}</div>
						)}
						<button type="submit">Add Item</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddItemForm;

AddItemForm.propTypes = {
	initialValues: PropTypes.shape({
		name: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		unit: PropTypes.string.isRequired,
		costPrice: PropTypes.number.isRequired,
		sellingPrice: PropTypes.number.isRequired,
		mrpPrice: PropTypes.number.isRequired,
	}).isRequired,
	handleFormSubmit: PropTypes.func.isRequired,
};
