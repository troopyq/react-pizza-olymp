import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button } from '..';

import '../../assets/style/index.scss';

export const ProductCart = ({ name, img, id, price, amount }) => {
	const dispatch = useDispatch();

	function addCart(id) {
		dispatch({
			type: 'ADD_TO_CART',
			payload: id,
		});
	}
	function removeCart(id) {
		dispatch({
			type: 'REMOVE_FROM_CART',
			payload: id,
		});
	}

	return (
		<div className='product__cart'>
			<img className='product__img' src={img} alt={name} />
			<div className='product__content'>
				<h3 className='product__name'>{name}</h3>
			</div>
			<div className='product__control'>
				<Button onClick={() => removeCart(id)}>-</Button>
				<Button
					className='product__price'
					onClick={() => console.log('amount: ' + amount)}
					type='outline'>
					{amount || 0} | {price * amount} р.
				</Button>
				<Button onClick={() => addCart(id)}>+</Button>
			</div>
		</div>
	);
};
