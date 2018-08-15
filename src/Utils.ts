import { TicketModel } from './models/Ticket';
require('es6-promise').polyfill();
import axios from 'axios';

export const currencySymbols: { [propName: string]: string; } = {
	rub: '​₽',
	usd: '$',
	eur: '€',
};

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
		.catch(() => {
			rates = {
				eur: 0.013152,
				usd: 0.0149,
			};
		});
}

export function convertPrice(price: number, currency: string): { price: number, symbol: string } {
	const rate = rates[currency] || 1;
	return {
		price: Math.round(price * rate),
		symbol: currencySymbols[currency] || currencySymbols['rub']
	};
}

export function pluralize(count: number, words: [string, string, string]): string {
	const cases = [2, 0, 1, 1, 1, 2];
	const index = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)];
	return words[index];
}

export function getTickets(): Promise<TicketModel[]> {
	return axios.get('/tickets.json')
		.then(response => response.data.tickets)
		.catch(() => []);
}
