import * as React from 'react';

import './Toggle.scss'

interface ToggleProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

export default class Toggle extends React.Component<ToggleProps> {
  render() {
    const { items, value, onChange } = this.props;

    return (
      <ul className="toggle">
        {
          items.map((item) => {
            let className = 'toggle__item';
            if (item === value) {
              className += ' is-active';
            }
            return <li key={item} className={className} onClick={() => onChange(item)}>{item}</li>;
          })
        }
      </ul>
    );
  }
}
