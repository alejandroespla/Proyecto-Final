export const initialStore = () => {
  return {
    currentUser: null,
    products: [],
    message: null,
    selectedFilter: { category: "Todas las categorías", subcategory: null }, // NUEVO
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_current_user":
      return { ...store, currentUser: action.payload };

    case "add_product":
      return { ...store, products: [...store.products, action.payload] };

    case "set_products":
      return { ...store, products: action.payload };

    case "set_selected_filter": // NUEVO
      return { ...store, selectedFilter: action.payload };

    default:
      console.error("Unknown action:", action.type);
      return store;
  }
}
