import { useState } from "react";
import debounce from "lodash.debounce";
import SymbolList from "./SymbolList";
import { fetchSymbols } from "../../prediction/financeApi/Api";

import classes from "./SearchBar.module.css";

import { DUMMY_SYMBOL_DATA } from "./DummyData";

const Searchbar = () => {
  const [symbols, setSymbols] = useState(null);

  // debounce the onChange to prevent multiple calls being made while typing
  const handleSearch = debounce(async (e) => {
    if (e.target.value == "") {
      setSymbols(null);
      return;
    }

    const res = await fetchSymbols(e.target.value, "alpha_vantage");
    // const res = await DUMMY_SYMBOL_DATA;

    // partially fix stock ticker mismatch issue between alpha vantage and yahoo finance apis 
    let compatibleRes = [];
    for (let i = 0; i < res.length; i++) {
      if (res[i]["1. symbol"].includes(".") == false) {
        compatibleRes.push(res[i]);
      }
    }

    setSymbols(compatibleRes);
  }, 500);

  return (
    <>
      <input
        className={classes["symbol-input"]}
        type="search"
        name="search"
        placeholder="Search for Stocks..."
        onChange={handleSearch}
        autoComplete="off"
      />
      <div className={classes["symbol-list"]} >
        <SymbolList data={symbols} setSymbols={setSymbols}/>
      </div>
    </>
  );
};

export default Searchbar;