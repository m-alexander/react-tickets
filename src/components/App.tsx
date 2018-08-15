import * as React from 'react';

import Ticket from './Ticket';
import Options from './Options';

import { TicketModel } from '../models/Ticket';
import { OptionsModel } from '../models/Options';

import { loadCurrencyRates, convertPrice } from '../Utils';

import * as data from '../tickets.json';

interface AppState {
	tickets: TicketModel[];
	options: OptionsModel;
}

export default class App extends React.Component<{}, AppState> {
	state: AppState = {
		tickets: data.tickets,
		options: {
			stops: [0, 1, 2, 3],
			currency: 'rub'
		}
	};

	constructor() {
		super({});

		loadCurrencyRates();
	}

	filteredList(): TicketModel[] {
		const { stops, currency } = this.state.options;

		let tickets: TicketModel[] = data.tickets;

		tickets = tickets.filter((item: TicketModel) => {
			return stops.indexOf(item.stops) > -1;
		});

		tickets = tickets.map((ticket) => ({
			...ticket,
			price: convertPrice(ticket.price, currency),
		}));

		tickets.sort((a, b) => a.price - b.price);

		return tickets;
	}

	render() {
		const list = this.filteredList();

		return (
			<div className="content">
				<Options
					value={this.state.options}
					onChange={(options) => this.setState({ options })}
				/>
				<div className="tickets">
					{list.map((ticket: any) =>
						<Ticket
							key={list.indexOf(ticket)}
							ticket={ticket}
						/>
					)}
				</div>
			</div>
		);
	}
}
