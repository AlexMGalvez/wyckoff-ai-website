import { useSelector, useDispatch } from "react-redux";
import { setStock } from "../../../store/stockSlice";
import { setBenchMark } from "../../../store/benchMarkSlice";
import { setPattern } from "../../../store/patternSlice";
import { fetchStock } from "../../prediction/financeApi/Api";
import { fetchBenchMark } from "../../prediction/financeApi/Api";
import { apiToChartFormatter } from "../../prediction/data/helpers";

import classes from "./Symbol.module.css";

import { DUMMY_STOCK } from "./DummyData";
import { DUMMY_BENCH } from "./DummyData";

const RANGE = 1; // # of years

const Symbol = (props) => {
    const dispatch = useDispatch();

    const setStockHandler = async (event, data) => {
        props.setSymbols(null);

        //const stockRes = await fetchStock(data["1. symbol"], "yahoo_finance", RANGE);
        //const benchMarkRes = await fetchStock("%5EIXIC", "yahoo_finance", RANGE);
        const stockRes = DUMMY_STOCK;
        const benchMarkRes = DUMMY_BENCH;

        const formattedStock = apiToChartFormatter(stockRes, "yahoo_finance");
        const formattedBenchMark = apiToChartFormatter(benchMarkRes, "yahoo_finance");

        dispatch(setStock(formattedStock));
        dispatch(setBenchMark(formattedBenchMark));
        dispatch(setPattern(null));
    }

    return (
        <div className={classes["symbol-select"]}>
            <a onClick={(event) => setStockHandler(event, props.data)}>
                <div className={classes["symbol-ticker"]}>{props.data["1. symbol"]}</div>
                <p className={classes["symbol-name"]}>{props.data["2. name"]}</p>
            </a>
        </div>
    )
};

export default Symbol;