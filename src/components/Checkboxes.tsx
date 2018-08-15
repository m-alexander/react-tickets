import * as React from 'react';

import './Checkboxes.scss'

interface CheckboxesProps {
  items: {
    title: string;
    value: any;
  }[];

  value: any[];
  onChange: (value: any[]) => void;
}

export default class Checkboxes extends React.Component<CheckboxesProps> {
  toggleOne(value: any) {
    const result = [...this.props.value];

    const index = this.props.value.indexOf(value);
    if (index === -1) {
      result.push(value);
    } else {
      result.splice(index, 1);
    }

    this.props.onChange(result);
  }

  toggleAll() {
    if (this.props.value.length === this.props.items.length) {
      this.props.onChange([]);
    } else {
      const items = this.props.items.map(item => item.value);
      this.props.onChange(items);
    }
  }

  toggleOnly(item: any) {
    this.props.onChange([item]);
  }

  render() {
    const { items, value } = this.props;

    return (
      <div className="checkboxes">
        <div className="checkboxes__item">
          <label className="checkboxes__label">
            <span className="checkbox">
              <input
                className="checkbox__field"
                type="checkbox"
                checked={value.length === items.length}
                onChange={() => this.toggleAll()}
              />
              <span className="checkbox__face"></span>
            </span>
            Все
          </label>
        </div>
      {
        items.map(item => (
          <div className="checkboxes__item" key={item.title}>
            <label className="checkboxes__label">
              <span className="checkbox">
                <input
                  className="checkbox__field"
                  type="checkbox"
                  checked={value.indexOf(item.value) > -1}
                  onChange={() => this.toggleOne(item.value)}
                />
                <span className="checkbox__face"></span>
              </span>
              {item.title}
            </label>
            <div className="checkboxes__only" onClick={() => this.toggleOnly(item.value)}>
              только
            </div>
          </div>
        ))
      }
      </div>
    );
  }
}
