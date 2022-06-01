import { useSelector, useDispatch } from "react-redux";
import { setStock } from "../../../store/stockSlice";
import { setPattern } from "../../../store/patternSlice";
import { fetchStock } from "../../prediction/financeApi/Api";
import { apiToChartFormatter } from "../../prediction/data/helpers";

const Symbol = (props) => {
    const dispatch = useDispatch();

    // const setStockHandler = (event, data) => {
    //     props.setSymbols(null);
    //     //dispatch(setStock(stock));
    //     const res = await fetchStock(data);
    // }

    const setStockHandler = async (event, data) => {
        props.setSymbols(null);
        const res = await fetchStock(data);
        const formattedStock = apiToChartFormatter(res);
        console.log("toset: ", formattedStock)
        dispatch(setStock(formattedStock));
        dispatch(setPattern(null));
    }

    return (
        <div className="bg-white p-2 border-b-2 border-gray-300">
            <a onClick={(event) => setStockHandler(event, props.data)}>
                <div className="text-xl font-medium text-black">{props.data["1. symbol"]}</div>
                <p className="text-slate-500">{props.data["2. name"]}</p>
            </a>
        </div>
    )
};

export default Symbol;