import React from "react";

interface ICheckboxFilter {
  name: string;
  uniqueValues: string[];
  selectedValues: string[];
  className?: string;
  onChangeValue: (value: string) => void;
}

const CheckboxFilter = ({
  name,
  uniqueValues,
  selectedValues,
  className,
  onChangeValue,
}: ICheckboxFilter) => (
  <div className={className}>
    <p>{name}</p>
    {uniqueValues.map((val) => (
      <div key={val} className="checkbox">
        <input
          type="checkbox"
          value={val}
          checked={selectedValues.includes(val)}
          onChange={() => onChangeValue(val)}
        />
        <label>{val}</label>
      </div>
    ))}
  </div>
);

export default CheckboxFilter;
