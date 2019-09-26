//CJFEKO6QL8QQFZ4C. Please record this API key for future access to Alpha Vantage.
import request from "superagent";

export const setCurrenciesState = () => {
  return function(dispatch, getState) {
    if (getState().allCurrencies.length === 0) {
      return request
        .get(
          "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=CJFEKO6QL8QQFZ4C"
        )
        .then(response => {
          dispatch({
            type: "SET_CURRENCIES_STATE",
            payload: Object.keys(response.body.message)
          });
        })
        .catch(console.error);
    }
  };
};
