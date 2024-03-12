### Concepts:

- API Call - https://fakestoreapi.com/
- Routing
- Pagination: Context
- Search
- Sorting
- Redux for add and remove cart

#### Roadmap:

- Start with App.jsx and setup basic routes
- Setup Home page
  - Setup pagination context
- Setup dataManipulation js file
- Setup ProductList component
  - Setup Redux for Add to Cart: CartSlice, store
- Setup Categories component navbar
- Setup Cart page

### Component Details:

- Setup App.jsx with Routes
- Add NavBar component with router
- Add Home page
  - useState: products, categories, search, currCategory, sortDir
  - Fetch products and categories from API
  - Render return method
    - Search and Sort Header
    - Pagination buttons
    - ProductList component
  - Setup Categories component and Add in Home component
  - Setup Pagination context
    - state: currPage, pageSize
  - Call dataManipulation util method
- ProductList component
  - Show product details
  - Setup redux
- Setup Redux store and slice
  - cartProducts and cartQuantity initialState
  - addToCart, removeFromCart reducers
- Cart component
