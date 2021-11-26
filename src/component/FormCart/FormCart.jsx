import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '..';

export const FormCart = () => {
	const total = useSelector((state) => state.newTotal);
	const oldTotal = useSelector((state) => state.total);
	const discounts = useSelector((state) => state.discounts);
	const delivery = useSelector((state) => state.delivery);

	function getDate() {
		const d = new Date();

		const date =
			d.getFullYear() +
			'-' +
			('0' + (d.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + d.getDate()).slice(-2);

		return date;
	}

	return (
		<div className='form-block'>
			<form className='form-cart' action='/' method='POST'>
				<input id='city' type='text' name='city' placeholder='Город' />
				<input id='adress' type='text' name='adress' placeholder='Адрес' />

				<input id='date' type='date' name='date' min={getDate()} />

				<input type='time' name='time' />

				<p className='discounts'>
					{discounts.filter((disc) => disc.used).length
						? 'Были применены скидки:'
						: 'Для получение скидок закажите на большую сумму'}
					{discounts.map((disc, id) => {
						if (disc.used)
							return (
								<p key={disc.id}>
									{id + 1}. {disc.text}
								</p>
							);
					})}
					<p className='devilery-desc'>
						Доставка {delivery.used ? delivery.sum : 0}р. Для бесплатной доставки закажите на сумму
						от 1000р без учета доставки.
					</p>
				</p>

				<p className='total-text'>
					Сумма к оплате <span className='total-price'>{total} р.</span>
					{discounts.filter((disc) => disc.used).length ? (
						<span className='total-old-price'>{oldTotal} р.</span>
					) : (
						''
					)}
				</p>

				<Button type='fill'>Заказать</Button>
			</form>
		</div>
	);
};
