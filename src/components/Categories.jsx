import React from "react";
import PaginationContext, {
  usePaginationWrapper,
} from "../context/PaginationContext";

function Categories(props) {
  const { categories, setCurrCategory } = props;
  const { setCurrPage } = usePaginationWrapper();

  const handleCategory = (cat) => {
    setCurrCategory(cat);
    setCurrPage(1);
  };

  return (
    <>
      <button
        className="category_option"
        onClick={() => {
          handleCategory("All Categories");
        }}
      >
        All categories
      </button>
      {!!categories.length &&
        categories.map((eachCate, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handleCategory(eachCate);
              }}
              className="category_option"
            >
              {eachCate}
            </button>
          );
        })}
    </>
  );
}
export default Categories;
