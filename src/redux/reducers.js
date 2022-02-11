import { GET_PRODUCTS, SET_ORDERS } from "./actions";

const initialState = {
  products: [],
  orders: []
}

function productReducer(state = initialState, action) {
  switch (action.type) {
      case SET_ORDERS:
        return { ...state, orders: action.payload };
      case GET_PRODUCTS:
        return { ...state, products: action.payload };
      default:
        return state;
  }
}

export default productReducer;