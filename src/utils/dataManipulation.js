export default function dataManipulation(
  products,
  search,
  currCategory,
  sortDir,
  pageSize,
  currPage
) {
  //searching
  let searchedProducts = products;
  if (search !== "") {
    searchedProducts = products.filter((eachProduct) => {
      const userSearch = search.toLowerCase();
      const productTitles = eachProduct.title.toLowerCase();
      return productTitles.includes(userSearch);
    });
  }

  // Group by category
  let groupedCategory = searchedProducts;
  if (currCategory !== "All Categories") {
    groupedCategory = searchedProducts.filter((eachPr) => {
      return currCategory === eachPr.category;
    });
  }

  // sorting
  let sortedSearchedProducts = groupedCategory;
  if (sortDir !== 0) {
    if (sortDir === 1) sortedSearchedProducts.sort(ascendingCom);
    else sortedSearchedProducts.sort(decesdingCom);
  }

  function ascendingCom(product1, product2) {
    if (product1.price > product2.price) return 1;
    else return -1;
  }

  function decesdingCom(product1, product2) {
    if (product1.price < product2.price) return 1;
    else return -1;
  }

  // Pagination
  const totalPages = Math.ceil(sortedSearchedProducts.length / pageSize);

  let sidx = (currPage - 1) * pageSize; // 20
  let eidx = sidx + pageSize;
  const paginatedProducts = sortedSearchedProducts.slice(sidx, eidx);

  return { totalPages, paginatedProducts };
}
