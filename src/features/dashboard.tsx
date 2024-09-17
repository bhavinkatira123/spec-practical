import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchArticals,
  onChangeAuthor,
  onChangeCategory,
  onChangePage,
  onChangeSort,
} from "../articalSlice";
import { AppDispatch, RootState } from "../store";
import ArticalCard from "../components/articalCard";

import CheckboxFilter from "../components/checkboxFilter";
import Pagination from "../components/pagination";
import SortFilter from "../components/sortFilter";
import Loader from "../components/loader";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    filteredData,
    loading,
    count,
    data,
    selectedAuthors,
    selectedCategories,
    activePage,
    sortDate,
    decendingSort,
  } = useSelector((state: RootState) => state.artical);

  const uniqueAuthors = useMemo(() => {
    const authorsSet = new Set(data.map((ele) => ele.author));
    return Array.from(authorsSet);
  }, [data]);

  const uniqueCategories = useMemo(() => {
    const categoriesSet = new Set(data.map((ele) => ele.source));
    return Array.from(categoriesSet);
  }, [data]);

  const handleAuthorChange = (value: string) => {
    dispatch(onChangeAuthor(value));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(onChangeCategory(value));
  };

  const handleSortChange = ({
    decending,
    date,
  }: {
    decending: boolean;
    date: boolean;
  }) => {
    dispatch(onChangeSort({ decending, date }));
  };

  const handlePageChange = (page: number) => {
    dispatch(onChangePage(page));
  };

  useEffect(() => {
    dispatch(fetchArticals());
  }, []);

  return (
    <div className="main-container">
      <div className="filter-container">
        <CheckboxFilter
          name="Category"
          uniqueValues={uniqueCategories}
          selectedValues={selectedCategories}
          onChangeValue={handleCategoryChange}
        />
        <CheckboxFilter
          name="Author"
          className="mt-35px"
          uniqueValues={uniqueAuthors}
          selectedValues={selectedAuthors}
          onChangeValue={handleAuthorChange}
        />
        <div className="mt-35px">
          <p>Sort By</p>
          <SortFilter
            name="Date"
            sortDate={sortDate}
            decendingSort={decendingSort}
            onChangeSort={handleSortChange}
            dateFilter
          />
          <SortFilter
            name="Title"
            sortDate={sortDate}
            decendingSort={decendingSort}
            onChangeSort={handleSortChange}
          />
        </div>
      </div>
      <div className="card-container">
        {loading && <Loader />}
        {!!filteredData.length &&
          filteredData.map((ele, index) => {
            return (
              <ArticalCard
                author={ele.author}
                title={ele.title}
                body={ele.body}
                date={ele.date}
                image={ele.image}
                source={ele.source}
                url={ele.url}
                key={index}
              />
            );
          })}
        {!filteredData.length && !loading && (
          <p className="text-center">No result found for Selection!</p>
        )}
        {!!filteredData.length && (
          <Pagination
            totalCount={count}
            activePage={activePage}
            onChangePage={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
