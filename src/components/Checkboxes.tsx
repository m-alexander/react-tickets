import * as React from 'react';

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

  render() {
    const { items, value } = this.props;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={value.length === items.length}
            onChange={() => this.toggleAll()}
          />
          Все
        </label>
      {
        items.map(item => (
          <label key={item.title}>
            <input
              type="checkbox"
              checked={value.indexOf(item.value) > -1}
              onChange={() => this.toggleOne(item.value)}
            />
            {item.title}
          </label>
        ))
      }
      </div>
    );
  }
}
