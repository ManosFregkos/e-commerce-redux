import productsTypes from "./products.type";

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
