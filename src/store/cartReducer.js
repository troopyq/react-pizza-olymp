const defaultState = {
	cart: [],
	total: 0,
	newTotal: 0,
	delivery: {
		sum: 300,
		used: false,
	},
	discounts: [
		{
			id: '1disc',
			type: 'sum',
			sum: 300,
			condition: 1000,
			used: false,
			text: 'Доставка от 1000р. БЕСПЛАТНА',
		},
		{
			id: '2disc',
			type: 'percent',
			sum: 10,
			condition: 2000,
			used: false,
			text: 'Доставка от 2000р. дает скидку 10%',
		},
	],
	products: [
		{
			id: 1,
			type: 'PIZZA',
			name: 'Пицца Пепперони',
			price: 299,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477350/dish_large_______-____-1023x432-pizza-full_0005__________.png',
		},
		{
			id: 2,
			type: 'PIZZA',
			name: 'Пицца 4 Сыра',
			price: 699,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477351/dish_large_______-____-1023x432-pizza-full_0004_______.png',
		},
		{
			id: 3,
			type: 'PIZZA',
			name: 'Пицца Баварская',
			price: 499,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/479638/dish_large_______-____-1023x432-pizza-full_0006__________.jpg',
		},
		{
			id: 4,
			type: 'PIZZA',
			name: 'Пицца Греческая',
			price: 699,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477353/dish_large_______-____-1023x432-_________-UPD2.png',
		},
		{
			id: 5,
			type: 'PIZZA',
			name: 'Пицца Хот-Дог',
			price: 599,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477354/dish_large_______-____-1023x432-___-___-UPD.png',
		},
		{
			id: 6,
			type: 'PIZZA',
			name: 'Пицца 2 в 1',
			price: 899,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/479635/dish_large_______-____-1023x432-pizza-2-in-1.jpg',
		},
		{
			id: 7,
			type: 'PIZZA',
			name: 'Пицца Деревенская',
			price: 499,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/479637/dish_large_______-____-1023x432-pizza-full_0002____________-_-_______.jpg',
		},
		{
			id: 8,
			type: 'CHIKEN',
			name: 'Филе куриное 3 шт',
			price: 149,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477338/dish_large________-____-3__.jpg',
		},
		{
			id: 9,
			type: 'CHIKEN',
			name: 'Наггетсы куриные 5 шт',
			price: 99,
			img: 'https://smartomato.ams3.cdn.digitaloceanspaces.com/uploads/media/photo/477340/dish_large_________-5__.jpg',
		},
	],
};

export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const product = state.products.find((el) => el.id === action.payload);
			const cart = state.cart;
			const productCart = cart.find((el) => el.id === action.payload);
			if (productCart) {
				productCart.amount += 1;
			} else {
				product.amount = 1;
				cart.push(product);
			}

			const total = state.total + product.price;
			const calc = calcTotal(total, state, cart);
			return { ...state, cart, total: total, newTotal: calc.total, discounts: calc.discounts };
		}
		case 'REMOVE_FROM_CART': {
			const product = state.products.find((el) => el.id === action.payload);
			let cart = state.cart;
			cart = cart.map((el) => {
				if (el.id === action.payload) {
					if (el.amount > 0) {
						--el.amount;
						return el;
					}
					if (el.amount <= 1) return;
				}
				return el;
			});
			cart = cart.filter((el) => {
				if (!el) return;
				if (el.id === action.payload) {
					if (el.amount === 0) {
						return false;
					}
				}
				return true;
			});
			console.log(cart);

			const total = state.total - product.price;

			const calc = calcTotal(total, state, cart);
			return { ...state, cart, total: total, newTotal: calc.total, discounts: calc.discounts };
		}

		case 'SET_STATE': {
			console.log(action.payload);
			if (action.payload) {
				return { ...action.payload };
			}
			return { ...state };
		}

		default:
			return state;
	}
};

function calcTotal(total, state, cart) {
	let newTotal = total;
	let newDiscounts = state.discounts;

	newDiscounts.forEach((disc) => {
		if (cart.length > 0) {
			if (disc.type === 'sum') {
				if (newTotal >= disc.condition) {
					disc.used = true;
					state.delivery.used = false;
				} else if (newTotal < disc.condition) {
					newTotal += state.delivery.sum;

					state.delivery.used = true;
					disc.used = false;
				}
			}
			if (disc.type === 'percent') {
				if (newTotal >= disc.condition) {
					newTotal -= Math.floor((newTotal / 100) * disc.sum);
					disc.used = true;
				} else if (newTotal < disc.condition) {
					disc.used = false;
				}
			}
			console.log('prev total: ' + total);
			console.log('new total: ' + newTotal);
		} else if (cart.length === 0) {
			state.delivery.used = false;
		}
	});

	return { total: newTotal, discounts: newDiscounts };
}
