import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import '../assets/style/index.scss';
import { FormCart, ProductCart } from '../component';

export const CartPage = () => {
	const cartList = useSelector((state) => state.cart);
	return (
		<>
			{cartList.length > 0 ? (
				<main className='main cart__content'>
					{cartList.map((cart) => {
						if (cart) return <ProductCart key={cart.id} {...cart} />;
					})}
					<FormCart />
				</main>
			) : (
				<main className='main cart__content'>
					<h2>Корзина пуста</h2>
				</main>
			)}
		</>
	);
};
