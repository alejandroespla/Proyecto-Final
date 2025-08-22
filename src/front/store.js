export const initialStore = () => ({
  currentUser: null,
  products: [],
  message: null,
  selectedFilter: { category: "Todas las categorías", subcategory: null },
  messages: [],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_current_user":
      return { ...store, currentUser: action.payload };

    case "add_product":
      return { ...store, products: [...store.products, action.payload] };

    case "set_products":
      return { ...store, products: action.payload };

    case "set_selected_filter":
      return { ...store, selectedFilter: action.payload };

    case "add_message":
      return { ...store, messages: [...store.messages, action.payload] };

    case "mark_message_read":
      return {
        ...store,
        messages: store.messages.map(msg =>
          msg.id === action.payload ? { ...msg, read: true } : msg
        ),
      };

    default:
      console.error("Unknown action:", action.type);
      return store;
  }
}
