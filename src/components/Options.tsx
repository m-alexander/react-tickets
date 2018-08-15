import * as React from 'react';

import Checkboxes from './Checkboxes';
import Toggle from './Toggle';

import { OptionsModel } from '../models/Options'

import './Options.scss'

interface OptionsProps {
  value: OptionsModel;
  onChange: (options: OptionsModel) => void;
}

class Options extends React.Component<OptionsProps> {
  render() {
    const { stops, currency } = this.props.value;
    const { onChange } = this.props;

    return (
      <div className="options">
        <div className={'options__currency'}>
          <div className={'options__head'}>Валюта</div>
          <div className="options__items">
            <Toggle
              items={['rub', 'usd', 'eur']}
              value={currency}
              onChange={value => onChange({ stops, currency: value })}
            />
          </div>
        </div>
        <div className={'options_stops'}>
          <div className={'options__head'}>Количество пересадок</div>
            <Checkboxes
              items={[
                { title: 'Без пересадок', value: 0 },
                { title: '1 пересадка', value: 1 },
                { title: '2 пересадки', value: 2 },
                { title: '3 пересадки', value: 3 },
              ]}
              value={stops}
              onChange={value => onChange({ currency, stops: value })}
            />
        </div>
      </div>
    );
  }
}

export default Options;
