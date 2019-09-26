import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrenciesState } from "../actions";
import request from "superagent";
import "./CurrencyCard.css";

class CurrencyCard extends Component {
  state = { forex: null };
  constructor(props) {
    super(props);
    this.exchangeResult = this.exchangeResult.bind(this);
  }

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

  exchangeResult() {
    let x = document.getElementById("amount").value;
    const amount = parseFloat(x);
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
    document.getElementById("result").textContent = result;
    console.log(rate, amount, result);
  }

  // calculateButton() {
  //   let rate = "";
  //   if (this.state.forex !== null) {
  //     rate = this.state.forex["Realtime Currency Exchange Rate"][
  //       "5. Exchange Rate"
  //     ];
  //     rate = parseFloat(rate);
  //   }

  //   let value = document.getElementById("amount").textContent;
  //   const result = value * rate;

  //   console.log(result);
  // }

  render() {
    return (
      <div>
        {this.state.forex ? (
          <div>
            <label>
              Currency pair:
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
            </label>
            <p>
              Exchange Rate:
              {parseFloat(
                this.state.forex["Realtime Currency Exchange Rate"][
                  "5. Exchange Rate"
                ]
              )}
            </p>
          </div>
        ) : (
          <p>No Currency</p>
        )}
        <input type="text" id="amount" onChange={this.exchangeResult} />
        <br></br>
        <p id="result"></p>
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
