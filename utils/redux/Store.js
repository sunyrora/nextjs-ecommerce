import axios from 'axios';
import { createContext, useCallback, useReducer } from 'react';
import { ADD_TO_CART, MODIFY_QUANTITY } from './constants/cartConstants';
import { cartReducer } from './reducers/cartReducer';

export const Store = createContext(null);

export const initialState = {
  cart: {
    itemCount: 0,
    subTotal: 0,
    cartItems: [],
    shippingAddress: {},
  },
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const customDispatch = useCallback(
    async (action) => {
      try {
        switch (action.type) {
          case ADD_TO_CART:
          case MODIFY_QUANTITY: {
            const productId = action.payload._id;
            const { data } = await axios.get(`/api/products/${productId}`);

            const itemInCart = state.cart?.cartItems?.find(
              (item) => item._id === productId
            );

            const countInCart = itemInCart ? Number(itemInCart.qty) : 0;

            let compareQty = countInCart
              ? Number(countInCart) + Number(action.payload.qty)
              : Number(action.payload.qty);
            if (action.type === MODIFY_QUANTITY)
              compareQty = Number(action.payload.qty);

            if (data?.product?.countInStock < compareQty) {
              alert(
                `Only ${data.product?.countInStock} item(s) available in stock.`
              );

              return;
            }
          }
          default:
            dispatch(action);
        }
      } catch (error) {
        console.error('customDispatch error: ', error);
        throw error;
      }
    },
    [state]
  );

  return (
    <Store.Provider value={{ state, dispatch: customDispatch }}>
      {/* <Store.Provider value={{ state, dispatch }}> */}
      {children}
    </Store.Provider>
  );
}
