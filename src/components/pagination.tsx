import React from "react";

import LeftArrow from "../images/left-arrow.png";
import RightArrow from "../images/right-arrow.png";

interface IPagination {
  totalCount: number;
  activePage: number;
  onChangePage: (index: number) => void;
}

const Pagination = ({ totalCount, activePage, onChangePage }: IPagination) => {
  const totalPages = Math.ceil(totalCount / 5);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && activePage !== page) {
      onChangePage(page);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <img
          className={`${activePage === 1 ? "disabled" : ""}`}
          width="100%"
          height="100%"
          loading="lazy"
          src={LeftArrow}
          alt="left_arrow"
        />
      </button>
      <ul className="pagination-list">
        {Array.from({ length: totalPages }, (_, index) => {
          console.log(activePage, "ace");
          return (
            <li
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-item ${
                activePage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </li>
          );
        })}
      </ul>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <img
          className={`${activePage === totalPages ? "disabled" : ""}`}
          width="100%"
          height="100%"
          loading="lazy"
          src={RightArrow}
          alt="right_arrow"
        />
      </button>
    </div>
  );
};

export default Pagination;
