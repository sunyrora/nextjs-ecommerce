import { createContext, useReducer } from 'react';
import { cartReducer } from './reducers/cartReducer';

export const Store = createContext(null);

export const initialState = {
  cart: {
    itemCount: 0,
    subTotal: 0,
    cartItems: [],
  },
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
