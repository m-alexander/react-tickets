import * as React from 'react';

import Checkboxes from './Checkboxes';
import Toggle from './Toggle';

import { OptionsModel } from '../models/Options'

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
        <Toggle
          items={['rub', 'usd', 'eur']}
          value={currency}
          onChange={value => onChange({ stops, currency: value })}
        />

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
    );
  }
}

export default Options;
