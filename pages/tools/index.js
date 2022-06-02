import Link from "next/link";
import Card from "../../components/UI/Card";
import Model from "../../components/model/Model";
import StockChartUI from "../../components/prediction/stockChart/chartUI";
import SearchBar from "../../components/UI/search/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setStock } from "../../store/stockSlice";

const ToolsPage = () => { 
    const stock = useSelector((state) => state.stock.stock);
    const model = useSelector((state) => state.stock.stock);
    const dispatch = useDispatch();

    const StockCard = () => (
        <Card>
            <SearchBar />
            <StockChartUI stock={stock}/>
        </Card>
    )

    const NullStockCard = () => (
        <Card>
            <p>First select a stock: </p>
            <SearchBar />
        </Card>
    )

    return (
        <>
            <h1>Analysis Tools</h1>
            <Link href="/">
                <a>Navigate</a>
            </Link>

            {stock != null ? <StockCard /> : <NullStockCard />}
            {model != null && stock != null ? <Model /> : null}
        </>
    );
}

export default ToolsPage;