import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '..';

export const Product = ({ name, img, id, price }) => {
	const dispatch = useDispatch();

	function addToCart(id) {
		dispatch({
			type: 'ADD_TO_CART',
			payload: id,
		});
	}

	return (
		<div className='product'>
			<img className='product__img' src={img} alt={name} />
			<div className='product__content'>
				<h3 className='product__name'>{name}</h3>

				<Button className='product__price' onClick={() => addToCart(id)} type='outline'>
					{price} р.
				</Button>
			</div>
		</div>
	);
};
