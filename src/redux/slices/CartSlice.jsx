import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",

  initialState: {
    cartProducts: [],
    cartQuantity: 0, //total cart quantity
  },

  reducers: {
    addToCart: (state, action) => {
      //payload
      // action is immutable.
      let productTobeAdded = { ...action.payload }; //productTobeAdded = action.payload

      state.cartQuantity++;

      // find if productTobeAdded is already in cartProducts array or not by find
      let fetchedProduct = state?.cartProducts?.find((eProduct) => {
        return eProduct.id === productTobeAdded.id;
      });

      /* if productTobeAdded is not there, then set numOfQuantity as 1 
      and push into cartProducts arr */
      if (!!!fetchedProduct) {
        productTobeAdded.numOfQuantity = 1; //numOfQuantity new parameter added
        state.cartProducts.push(productTobeAdded);
      } else {
        fetchedProduct.numOfQuantity++;
      }
    },

    removeFromCart: (state, action) => {
      //payload
      const removeProduct = action.payload;

      // find id of removeProduct by findIndex method
      const idx = state.cartProducts.findIndex((eProduct) => {
        return eProduct.id === removeProduct.id;
      });

      // if id is present
      if (idx !== -1) {
        // get product from redux store
        let product = state.cartProducts[idx];

        /* if quantity is 1 then remove the product 
        else decrease numOfQuantity */
        if (product.numOfQuantity === 1) {
          console.log("removeFromCart reducer:", idx, state.cartProducts);

          // filter all others products
          const data = state.cartProducts.filter((pr) => {
            return pr.id !== product.id;
          });

          state.cartProducts = data;
        } else {
          state.cartProducts[idx].numOfQuantity--;
        }

        state.cartQuantity--;
      }
    },
  },
});

export default cartSlice;
