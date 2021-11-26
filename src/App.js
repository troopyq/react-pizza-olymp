import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import './assets/style/index.scss';
import { Header } from './component';
import { CartPage } from './pages/CartPage';
import { MainPage } from './pages/MainPage';

function App() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const setStateToLocalStorage = () => {
		console.log(state);
		localStorage.setItem('state', JSON.stringify(state));
		window.removeEventListener('beforeunload', setStateToLocalStorage);
	};

	useEffect(() => {
		setStateToLocalStorage();
	}, [state]);

	useEffect(() => {
		dispatch({ type: 'SET_STATE', payload: JSON.parse(localStorage.getItem('state')) });
		return () => {
			setStateToLocalStorage();
		};
	}, []);

	return (
		<HashRouter>
			<div className='App'>
				<div className='wrapper'>
					<Header />

					<Routes>
						<Route exact='true' path='/' element={<MainPage />}></Route>
						<Route exact='true' path='/cart' element={<CartPage />}></Route>
					</Routes>
				</div>
			</div>
		</HashRouter>
	);
}

export default App;
