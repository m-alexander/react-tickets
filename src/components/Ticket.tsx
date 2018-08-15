import * as React from 'react';

import { TicketModel } from '../models/Ticket'

export interface TicketProps {
	ticket: TicketModel;
}

class Ticket extends React.Component<TicketProps> {
	render() {
		const { ticket } = this.props;

		return (
			<pre className="ticket">
				{JSON.stringify(ticket, null, 4)}
			</pre>
		);
	}
}

export default Ticket;
