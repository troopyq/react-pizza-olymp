import React from 'react';

import logo from '../../assets/icon/logo.png';
import cart from '../../assets/icon/cart.png';
import '../../assets/style/index.scss';
import { Button } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const Header = () => {
	const dispatch = useDispatch();
	const total = useSelector((state) => state.newTotal);

	return (
		<header className='header'>
			<NavLink exact to='/'>
				<div className='logo'>
					<img src={logo} className='logo__img' alt='logo' />
					<span className='logo__name'>React Pizza</span>
				</div>
			</NavLink>

			<NavLink exact to='/'>
				<span className='menu-item'>Католог</span>
			</NavLink>

			<NavLink exact to='/cart'>
				<Button className='cart'>
					<img className='cart__img' src={cart} alt='cart-img' />
					<span className='total'>{total} р.</span>
				</Button>
			</NavLink>
		</header>
	);
};
