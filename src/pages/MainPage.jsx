import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import '../assets/style/index.scss';
import { Product } from '../component';

export const MainPage = () => {
	const productsList = useSelector((state) => state.products);

	return (
		<main className='main'>
			<h2>Пицца</h2>
			<div className='product__list'>
				{productsList.map((product) => {
					if (product.type === 'PIZZA') return <Product key={product.id} {...product} />;
				})}
			</div>
			<h2>Курица</h2>
			<div className='product__list'>
				{productsList.map((product) => {
					if (product.type === 'CHIKEN') return <Product key={product.id} {...product} />;
				})}
			</div>
		</main>
	);
};
