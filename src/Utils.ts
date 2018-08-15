require('es6-promise').polyfill();
import axios from 'axios';


let rates: { [propName: string]: number; } = {}

export function loadCurrencyRates() {
	const url = 'http://free.currencyconverterapi.com/api/v5/convert?q=RUB_USD,RUB_EUR&compact=y';
	axios.get(url)
		.then(response => {
			rates = {
				eur: response.data.RUB_EUR.val,
				usd: response.data.RUB_USD.val,
			};
		})
		.catch(() => rates = {});
}

export function convertPrice(price: number, currency: string): number {
	const rate = rates[currency] || 1;
	return Math.round(price * rate);
}
