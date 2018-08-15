import * as React from 'react';

import Ticket from './Ticket';

import { TicketModel } from '../models/Ticket'

import * as data from '../tickets.json';

interface AppState {
	tickets: TicketModel[];
}

export default class App extends React.Component<{}, AppState> {
	state: AppState = {
		tickets: [],
	};

	componentWillMount() {
		const tickets = [...data.tickets];
		tickets.sort((a, b) => a.price - b.price);
		this.setState({ tickets })
	}

	render() {
		const list = this.state.tickets;

		return (
			<div className="content">
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
