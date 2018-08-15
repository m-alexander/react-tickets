import * as React from 'react';

interface ToggleProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

export default class Toggle extends React.Component<ToggleProps> {
  render() {
    const { items, value, onChange } = this.props;

    return (
      <div className="toggle">
        {
          items.map((item) =>
            <label key={item}>
              <input
                type="radio"
                value={item}
                checked={item === value}
                onChange={() => onChange(item)}
              />
              {item}
            </label>
          )
        }
      </div>
    );
  }
}
