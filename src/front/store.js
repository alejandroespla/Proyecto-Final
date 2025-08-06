

export const initialStore = () => {
  return {
    currentUser: null, // se llena después del login
    products: [],
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_current_user":
      return {
        ...store,
        currentUser: action.payload,
      };

    case "add_product":
      return {
        ...store,
        products: [...store.products, action.payload],
      };

    case "set_products":
      return {
        ...store,
        products: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
