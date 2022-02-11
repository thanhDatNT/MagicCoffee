export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SET_ORDERS = 'SET_ORDERS';

const API_URL = 'https://thanhdatnt.github.io/database/coffee.json';

export const getProducts = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_PRODUCTS,
          payload: json,
        });
      } else {
        console.log('Unable to fetch!');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setOrders = orders => dispatch => {
  dispatch({
    type: SET_ORDERS,
    payload: orders,
  });
};
