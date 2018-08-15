import * as React from 'react';

import * as moment from 'moment';
import 'moment/locale/ru';

import { TicketModel } from '../models/Ticket'

import { pluralize, convertPrice } from '../Utils';

import './Ticket.scss'

export interface TicketProps {
	ticket: TicketModel;
	currency: string;
}

class Ticket extends React.Component<TicketProps> {
	render() {
		const formatDate = (date: string) => moment(date, 'DD.MM.YY').format('D MMM YYYY, ddd');

		const { ticket, currency } = this.props;
		const { price, symbol } = convertPrice(ticket.price, currency);

		return (
			<div className={'ticket'}>
				<div className={'ticket__buy'}>
					<img className={'ticket__logo'} src={require('../assets/comp.png')} />
					<button className={'button-buy'}>
						<div>Купить</div>
						<div>
							за {price.toLocaleString()}
							<span className="button-buy__price">{symbol}</span>
						</div>
					</button>
				</div>
				<div className={'ticket__content'}>
					<div className={'ticket__from'}>
						<div className={'ticket__time'}>{ticket.departure_time}</div>
						<div className={'ticket__place'}>
							{ticket.origin}, {ticket.origin_name}
						</div>
						<div className={'ticket__date'}>{formatDate(ticket.departure_date)}</div>
					</div>
					<div className={'ticket__stops'}>
						{ticket.stops > 0 && (
							ticket.stops + ' ' + pluralize(ticket.stops, ['пересадка', 'пересадки', 'пересадок'])
						)}
					</div>
					<div className={'ticket__to'}>
						<div className={'ticket__time'}>{ticket.arrival_time}</div>
						<div className={'ticket__place'}>
							{ticket.destination_name}, {ticket.destination}
						</div>
						<div className={'ticket__date'}>{formatDate(ticket.arrival_date)}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Ticket;
