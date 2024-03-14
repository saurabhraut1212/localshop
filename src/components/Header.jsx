import React from 'react';
import Link from 'next/link';

const Header = () => {
	return (
		<div>
			<div>
				<Link href="/">Home</Link>
			</div>
			<div>
				<Link href="place-order">Place Order</Link>
				<Link href="add-item">Add Item</Link>
				<Link href="get-items">View Items</Link>
				<Link href="update-quantity">Update Quantity</Link>
				<Link href="get-remaining">Get Remaining</Link>
				<Link href="register">Register</Link>
				<Link href="login">Login</Link>
			</div>
		</div>
	);
};

export default Header;
