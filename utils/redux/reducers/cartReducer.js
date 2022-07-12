import * as cartActions from '../constants/cartConstants';
import { KEY_CART_LOCALSTORAGE } from '../constants/globalConstants';
import { initialState } from '../Store';

const getCartItemCount = (cartItems) =>
  cartItems?.reduce((acc, item) => acc + Number(item?.qty), 0);
const getCartSubTotal = (cartItems) =>
  cartItems?.reduce(
    (price, item) => price + Number(item?.price) * Number(item?.qty),
    0
  );

const addToCart = (cartState, newItem) => {
  const currentCart = cartState;

  const existItem = currentCart.cartItems.find(
    (item) => item._id === newItem._id
  );
  let cartItems = existItem;

  if (existItem) {
    cartItems = currentCart.cartItems.map((item) => {
      if (item._id === existItem._id) {
        const newQty = Number(item.qty) + Number(newItem.qty);
        if (newQty > newItem.countInStock) {
          alert(`Only ${item.countInStock} product(s) in stok.
            You have already added ${item.qty} into your cart.
          `);
          return item;
        } else {
          return { ...item, qty: newQty };
        }
      } else {
        return item;
      }
    });
  } else {
    cartItems = [...currentCart.cartItems, newItem];
  }

  const itemCount = getCartItemCount(cartItems);
  const subTotal = getCartSubTotal(cartItems);

  return { itemCount, subTotal, cartItems: [...cartItems] };
};

const removeFromCart = (cartState, id) => {
  const cartItems = cartState.cartItems.filter((item) => item._id !== id);
  const itemCount = getCartItemCount(cartItems);
  const subTotal = getCartSubTotal(cartItems);

  return {
    cartItems,
    itemCount,
    subTotal,
  };
};

const modifyQty = (cartState, id, qty) => {
  const cartItems = cartState.cartItems.map((item) =>
    item._id === id ? { ...item, qty: qty } : item
  );
  const itemCount = getCartItemCount(cartItems);
  const subTotal = getCartSubTotal(cartItems);
  return {
    cartItems,
    itemCount,
    subTotal,
  };
};

export function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD_TO_CART: {
      const newCartState = addToCart(state.cart, action.payload);
      const newState = { ...state, cart: { ...newCartState } };
      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }
    case cartActions.CART_RESET: {
      return action.payload
        ? { ...state, cart: { ...action.payload.cart } }
        : initialState;
    }
    case cartActions.MODIFY_QUANTITY: {
      const { _id, qty } = action.payload;
      const newCartState = modifyQty(state.cart, _id, qty);
      const newState = {
        ...state,
        cart: { ...newCartState },
      };

      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }
    case cartActions.REMOVE_FROM_CART: {
      const id = action.payload.id;
      const cart = removeFromCart(state.cart, id);
      const newState = { ...state, cart: { ...cart } };
      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }
    case cartActions.CART_SAVE_SHIPPING_ADDRESS: {
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }
    case cartActions.CART_CHECKOUT_ACTIVE_STEP: {
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          activeStep: action.payload,
        },
      };
      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }
    case cartActions.CART_CHECKOUT_PAYMENT_METHOD: {
      const newState = {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
      localStorage.setItem(KEY_CART_LOCALSTORAGE, JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
}
