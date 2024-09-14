import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IArticalData {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

export interface IArticalState {
  data: IArticalData[];
  filteredData: IArticalData[];
  loading: boolean;
  activePage: number;
  limit: number;
  count: number;
  selectedAuthors: string[];
  selectedCategories: string[];
  sortDate: boolean;
  decendingSort: boolean;
}
const initialState: IArticalState = {
  data: [],
  filteredData: [],
  loading: false,
  activePage: 1,
  limit: 5,
  count: 0,
  selectedAuthors: [],
  selectedCategories: [],
  sortDate: true,
  decendingSort: true,
};

export const fetchArticals = createAsyncThunk<IArticalData[]>(
  "articals/fetchArticals",
  async () => {
    const response = await fetch(
      "https://dummy-rest-api.specbee.site/api/v1/news"
    );
    return response.json();
  }
);

const applyFilters = (
  data: IArticalData[],
  selectedAuthors: string[],
  selectedCategories: string[]
) => {
  return data.filter(
    (ele) =>
      (selectedAuthors.length ? selectedAuthors.includes(ele.author) : true) &&
      (selectedCategories.length
        ? selectedCategories.includes(ele.source)
        : true)
  );
};

const applySorting = (
  data: IArticalData[],
  sortDate: boolean,
  descendingSort: boolean
) => {
  return [...data].sort((a, b) => {
    if (sortDate) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return descendingSort ? dateB - dateA : dateA - dateB;
    } else {
      return descendingSort
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }
  });
};

const articalSlice = createSlice({
  name: "artical",
  initialState,
  reducers: {
    onChangePage: (state, action) => {
      const page = action.payload;
      state.activePage = page;
      const startIndex = state.limit * (page - 1);

      state.filteredData = applyFilters(
        state.data,
        state.selectedAuthors,
        state.selectedCategories
      ).slice(startIndex, startIndex + state.limit);
    },
    onChangeAuthor: (state, action) => {
      const author = action.payload;
      const isAuthorSelected = state.selectedAuthors.includes(author);

      state.selectedAuthors = isAuthorSelected
        ? state.selectedAuthors.filter((ele) => ele !== author)
        : [...state.selectedAuthors, author];

      const filteredData = applyFilters(
        state.data,
        state.selectedAuthors,
        state.selectedCategories
      );
      state.filteredData = filteredData.slice(0, state.limit);
      state.activePage = 1;
      state.count = filteredData.length;
    },
    onChangeCategory: (state, action) => {
      const category = action.payload;
      const isCategorySelected = state.selectedCategories.includes(category);

      state.selectedCategories = isCategorySelected
        ? state.selectedCategories.filter((ele) => ele !== category)
        : [...state.selectedCategories, category];

      const filteredData = applyFilters(
        state.data,
        state.selectedAuthors,
        state.selectedCategories
      );
      state.filteredData = filteredData.slice(0, state.limit);

      state.activePage = 1;
      state.count = filteredData.length;
    },
    onChangeSort: (state, action) => {
      const { date, decending } = action.payload;

      state.sortDate = date || false;
      state.decendingSort = decending || false;
      state.data = applySorting(
        state.data,
        state.sortDate,
        state.decendingSort
      );

      state.filteredData = applyFilters(
        state.data,
        state.selectedAuthors,
        state.selectedCategories
      ).slice(0, state.limit);
      state.activePage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticals.fulfilled, (state, action) => {
        state.data = applySorting(
          action.payload,
          state.sortDate,
          state.decendingSort
        );
        state.filteredData = state.data.slice(0, state.limit);
        state.count = state.data.length;
        state.loading = false;
      })
      .addCase(fetchArticals.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { onChangePage, onChangeAuthor, onChangeCategory, onChangeSort } =
  articalSlice.actions;

export default articalSlice.reducer;
