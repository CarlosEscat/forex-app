export default (state = [], { type, payload }) => {
  switch (type) {
    case "SET_CURRENCIES_STATE":
      return payload;

    default:
      return state;
  }
};
