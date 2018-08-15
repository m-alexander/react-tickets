import * as React from 'react';

import Ticket from './Ticket';
import Options from './Options';

import { TicketModel } from '../models/Ticket';
import { OptionsModel } from '../models/Options';

import { loadCurrencyRates } from '../Utils';

import './App.scss';

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

	constructor(props: {}) {
		super(props);

		loadCurrencyRates();
	}

	filteredList(): TicketModel[] {
		let tickets: TicketModel[] = [...data.tickets];

		const { stops } = this.state.options;
		tickets = tickets.filter((item: TicketModel) => {
			return stops.indexOf(item.stops) > -1;
		});

		tickets.sort((a, b) => a.price - b.price);

		return tickets;
	}

	render() {
		const list = this.filteredList();
		const { currency } = this.state.options;

		return (
			<div className="content">
				<img className="content__logo" src={require('../assets/logo.png')} alt="Logo" />
				<div className="content__columns">
					<Options
						value={this.state.options}
						onChange={(options) => this.setState({ options })}
					/>
					<div className="content__tickets">
						{list.map((ticket: any) =>
							<Ticket
								key={list.indexOf(ticket)}
								ticket={ticket}
								currency={currency}
							/>
						)}
						{list.length === 0 &&
							<div className="tickets-empty">По вашему запросу ничего не найдено</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
