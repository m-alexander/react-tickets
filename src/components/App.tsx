import * as React from 'react';

import Ticket from './Ticket';
import Options from './Options';

import { TicketModel } from '../models/Ticket'
import { OptionsModel } from '../models/Options'

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
		}
	};

	filteredList(): TicketModel[] {
		const { stops } = this.state.options;

		let tickets = [...data.tickets];

		tickets = tickets.filter((item: TicketModel) => {
			return stops.indexOf(item.stops) > -1;
		});

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
							key={data.tickets.indexOf(ticket)}
							ticket={ticket}
						/>
					)}
				</div>
			</div>
		);
	}
}
