import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrenciesState } from "../actions";
import request from "superagent";
import "./CurrencyCard.css";

class CurrencyCard extends Component {
  state = {
    forex: null,
    selected_from_currency: "USD",
    selected_to_currency: "EUR"
  };

  componentDidMount() {
    request
      .get(
        "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=CJFEKO6QL8QQFZ4C"
      )
      .then(response => {
        this.setState({ forex: response.body });
        console.log(this.state.forex["Realtime Currency Exchange Rate"]);
      })
      .catch(console.error);
  }

  exchangeResult = () => {
    let value = document.getElementById("amount").value;
    const amount = parseFloat(value);
    let rate = "";
    if (this.state.forex === undefined) {
      console.log("no rate yet");
    } else {
      rate = this.state.forex["Realtime Currency Exchange Rate"][
        "5. Exchange Rate"
      ];
      rate = parseFloat(rate);
    }

    let result = amount * rate;
    if (isNaN(result) === true) {
      result = 0;
    }
    result = result.toFixed(2);
    document.getElementById("result").textContent =
      result +
      " " +
      this.state.forex["Realtime Currency Exchange Rate"][
        "3. To_Currency Code"
      ];
    //console.log(rate, amount, result);
  };

  fromCurrency = e => {
    this.setState({ selected_from_currency: e.target.value });

    //const fromCoin = e.target.value;
    //console.log(fromCoin);
  };

  toCurrency = v => {
    this.setState({ selected_to_currency: v.target.value });
    const from = this.state.selected_from_currency;

    const toCoin = v.target.value;
    //console.log(toCoin);
    request
      .get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${toCoin}&apikey=CJFEKO6QL8QQFZ4C`
      )
      .then(response => {
        this.setState({ forex: response.body });
        console.log(this.state.forex["Realtime Currency Exchange Rate"]);
      })
      .catch(console.error);
  };

  render() {
    return (
      <div className="card">
        <br />
        {/* <label>From: </label> */}
        <select
          className="fromSelect"
          name="fromlist"
          defaultValue="USD"
          onChange={this.fromCurrency}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="PHP">PHP</option>
        </select>
        <label className="one">/ </label>
        <select
          className="toSelect"
          name="tolist"
          defaultValue="EUR"
          onChange={this.toCurrency}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="PHP">PHP</option>
        </select>
        <br />
        <br />
        <label className="currpair">Currency pair:{<br />}</label>
        {this.state.forex ? (
          <div>
            <label className="pair">
              {
                this.state.forex["Realtime Currency Exchange Rate"][
                  "1. From_Currency Code"
                ]
              }
              /
              {
                this.state.forex["Realtime Currency Exchange Rate"][
                  "3. To_Currency Code"
                ]
              }
              {<br />}
            </label>
            <label className="exchange">
              {<br />}Exchange Rate:{<br />}
            </label>
            <label className="rate">
              {parseFloat(
                this.state.forex["Realtime Currency Exchange Rate"][
                  "5. Exchange Rate"
                ]
              )}
            </label>
          </div>
        ) : (
          <p>No Currency</p>
        )}
        <br />
        <input
          type="text"
          id="amount"
          onChange={this.exchangeResult}
          autoComplete="off"
        />
        <br></br>
        <p className="result" id="result"></p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currencies: state
});

export default connect(
  mapStateToProps,
  { setCurrenciesState }
)(CurrencyCard);
