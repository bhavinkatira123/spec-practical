import React from "react";
import UpArrow from "../images/up-arrow.png";
import DownArrow from "../images/down-arrow.png";

interface ISortFilter {
  name: string;
  dateFilter?: boolean;
  sortDate: boolean;
  decendingSort: boolean;
  onChangeSort: (payload: { decending: boolean; date: boolean }) => void;
}

const SortFilter = ({
  name,
  dateFilter,
  sortDate,
  decendingSort,
  onChangeSort,
}: ISortFilter) => {
  const isDateFilter = name === "Date";
  const downArrowEnabled =
    (isDateFilter && sortDate && decendingSort) ||
    (!isDateFilter && !sortDate && decendingSort);

  const upArrowEnabled =
    (isDateFilter && sortDate && !decendingSort) ||
    (!isDateFilter && !sortDate && !decendingSort);

  const handleSort = (decending: boolean) => {
    onChangeSort({ decending, date: isDateFilter });
  };

  return (
    <div className="sort-filter-container">
      <p className="sort-filter-name">{name}</p>
      <div className="sort-icon-container">
        <div className="sort-icon">
          <img
            alt="up_arrow"
            className={!upArrowEnabled ? "disabled" : ""}
            height="100%"
            width="100%"
            loading="lazy"
            src={UpArrow}
            onClick={() => handleSort(false)}
          />
        </div>
        <div className="sort-icon">
          <img
            alt="down_arrow"
            className={!downArrowEnabled ? "disabled" : ""}
            height="100%"
            width="100%"
            loading="lazy"
            src={DownArrow}
            onClick={() => handleSort(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default SortFilter;
