import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import dataManipulation from "../utils/dataManipulation";
import PaginationContext, {
  usePaginationWrapper,
} from "../context/PaginationContext";
import useFetch from "../utils/useFetch";

// custom hooks
// useMemo and useCallback

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [currCategory, setCurrCategory] = useState("All Categories");
  const [sortDir, setSortDir] = useState(0);

  // fetch from context
  const { currPage, setCurrPage, pageSize, setPageSize } =
    usePaginationWrapper();

  // fetching produts
  useEffect(() => {
    async function getProducts() {
      const rawData = await fetch("https://fakestoreapi.com/products/");
      const data = await rawData.json();
      setProducts(data);
    }
    getProducts();
  }, []);

  // fetching categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  // call dataManipulation method
  const { totalPages, paginatedProducts } = dataManipulation(
    products,
    search,
    currCategory,
    sortDir,
    pageSize,
    currPage
  );

  const handlerSearch = (e) => {
    setSearch(e.target.value);
    setCurrPage(1);
  };

  const handlerSort = (dir) => {
    setSortDir(dir);
    setCurrPage(1);
  };

  return (
    <>
      {/* Header Nav bar: Search & Sort */}
      <header className="nav_wrapper">
        <div className="search_sortWrapper">
          {/* input field */}
          <input
            className="search_input"
            value={search}
            type="text"
            onChange={handlerSearch}
          />
          {/* sorting */}
          <div className="icons_container">
            <ArrowCircleUpIcon
              style={{ color: "white" }}
              fontSize="large"
              onClick={() => handlerSort(1)}
            ></ArrowCircleUpIcon>
            <ArrowCircleDownIcon
              fontSize="large"
              style={{ color: "white" }}
              onClick={() => handlerSort(-1)}
            ></ArrowCircleDownIcon>
          </div>
        </div>

        {/* categories */}
        <div className="categories_wrapper">
          <Categories
            categories={categories}
            setCurrCategory={setCurrCategory}
          ></Categories>
        </div>
      </header>

      {/* Product Container */}
      <div className="product_wrapper">
        <ProductList paginatedProducts={paginatedProducts}></ProductList>
      </div>

      {/* pagination */}
      <div className="pagination">
        {/* previous page button */}
        <button
          onClick={() => {
            if (currPage === 1) return;
            setCurrPage(currPage - 1);
          }}
          disabled={currPage === 1 ? true : false}
        >
          <KeyboardArrowLeftIcon fontSize="large"></KeyboardArrowLeftIcon>
        </button>

        {/* current page number */}
        <div className="pagenum">{currPage}</div>

        {/* next page button */}
        <button
          onClick={() => {
            if (currPage === totalPages) return;
            setCurrPage(currPage + 1);
          }}
          disabled={currPage === totalPages ? true : false}
        >
          <ChevronRightIcon fontSize="large"></ChevronRightIcon>
        </button>
      </div>
    </>
  );
}

export default Home;
