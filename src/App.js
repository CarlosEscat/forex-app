import React from "react";
import "./App.css";
import CurrencyCard from "./components/CurrencyCard";

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css?family=Arimo|Ramabhadra&display=swap"
        rel="stylesheet"
      ></link>
      <header className="App-header">
        <CurrencyCard />
      </header>
    </div>
  );
}

export default App;
