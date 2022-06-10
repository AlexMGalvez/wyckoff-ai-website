import Card1 from "../../components/UI/cards/Card1";
import Card2 from "../../components/UI/cards/Card2";
import AttButton from "../../components/UI/button/AttButton";
import LoadingModal from "../../components/UI/LoadingModal";
import DateRangePicker from "../../components/UI/DateRangePicker";
import PatternChartUI from "../../components/prediction/patternChart/chartUI"
import StockChartUI from "../../components/prediction/stockChart/chartUI";
import SearchBar from "../../components/UI/search/SearchBar";
import modelHelpers from "../../components/model/modelHelpers";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'

import { setModel } from "../../store/modelSlice";
import { setClassification } from "../../store/classificationSlice";

import classes from "./index.module.css";

const PAD_MAX = 395; // Hard coded pad max must equal maximum timestep length
const SPECIAL_CHAR = 0;
const loadModel = modelHelpers.loadModel;
const makePrediction = modelHelpers.makePrediction;

const ToolsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const model = useSelector((state) => state.model.model);
    const stock = useSelector((state) => state.stock.stock);
    const benchMark = useSelector((state) => state.benchMark.benchMark);
    const pattern = useSelector((state) => state.pattern.pattern);
    const classification = useSelector((state) => state.classification.classification);
    const dispatch = useDispatch();

    const setModelHandler = async () => {
        setIsLoading(true);
        const model = await loadModel();
        dispatch(setModel(model));
        setIsLoading(false);
    };

    const makePredictionHandler = async () => {
        const patternIn = { name: pattern.name, dates: [], f1: [], f2: [], f3: [], f4: [] };
        const j = benchMark.data.findIndex(day => day.date == pattern.data[0].date);

        if (j == -1) {
            throw 'Pattern dates do not align with the market benchmark.';
        }
        for (let i = 0; i < pattern.data.length; i++) {
            patternIn.dates.push(pattern.data[i]["date"].slice(0, 10));
            patternIn.f1.push(parseFloat(pattern.data[i]["close"]));
            patternIn.f2.push(parseInt(pattern.data[i]["volume"]));
            patternIn.f3.push(parseFloat(benchMark.data[j]["close"]));
            patternIn.f4.push(parseInt(benchMark.data[j]["volume"]));
            j++;
        }

        console.log("Making prediction...");
        const modelOut = await makePrediction(
            model,
            patternIn,
            PAD_MAX,
            SPECIAL_CHAR
        );
        console.log("Prediction results: ");
        console.log(modelOut.arraySync());
        console.log("");

        await dispatch(setClassification(modelOut.arraySync()[0]));
    };

    const StockCard = () => (
        <Card1>
            <SearchBar />
            <StockChartUI stock={stock} />
        </Card1>
    )

    const NullStockCard = () => (
        <Card1>
            <p>First select a stock: </p>
            <SearchBar />
        </Card1>
    )

    const SetModelCard = () => (
        <div className={classes["model-module"]}>
            <Card1>
                <p className={classes["headings"]}>Load model for the AI-assisted classifier: </p>
                <AttButton onClick={setModelHandler}>Load Model</AttButton>
            </Card1>
        </div>
    )

    const SetPatternCard = () => (
        <div className={classes["pattern-module"]}>
            <Card1>
                <p>Select a date range interval from the stock to classify: </p>
                <div className={classes["pattern-card-wrapper"]}>
                    <DateRangePicker />
                    <PatternChartUI pattern={pattern} />
                </div>
            </Card1>
        </div>
    )

    const MakePredictionCard = () => (
        <div className={classes["prediction-module"]}>
            <Card2>
                {classification == null ? <AttButton onClick={makePredictionHandler}>Classify Pattern</AttButton> : null}
                {model != null && pattern != null && classification != null ? <PredictionResults /> : null}
            </Card2>
        </div>
    )

    const PredictionResults = () => {
        // [1, 0] = In distribution
        // [0, 1] = In accumulation

        const classifyIndex = classification.indexOf(Math.max(...classification));

        if (classifyIndex == 0) {
            return (
                <>
                    <h2>Possible Distribution</h2>
                    <p>The AI predicts that this is a distribution scenario. Consider selling assets and placing short positions but remain flexible with your assets.</p>
                    <p>Continue analyzing near future market behaviour for any changes in Wyckoffian activity.</p>
                </>
            )
        }
        else if (classifyIndex == 1) {
            return (
                <>
                    <h2>Possible Accumulation</h2>
                    <p>The AI predicts that this is an accumulation scenario. Use Wyckoff principles to identify whether this is a final shakeout or likely to retest.</p>
                    <p>Continue analyzing near future market behaviour for any changes in Wyckoffian activity.</p>
                </>
            )
        }
    }

    return (
        <>
            <h1 className={classes["headings"]}>WYCKOFF PATTERN CLASSIFIER</h1>
            <div className={classes["grid-container"]}>
                <Card2 className={classes["text-module"]}>
                    <p>Come use the assistance of an AI for your next Wyckoff pattern analysis. This classifier compares a given price consolidation period with a market benchmark and 50 years of industry leading stock patterns to best predict it as falling in either an accumulation phase or distribution phase.</p>
                    <p>Reading and understanding the instructions section first before using this tool is essential for accurate pattern classifications. Read it here: (page unavailable at the moment)</p>
                    <div className={"warning-msg"}>
                        <FontAwesomeIcon icon={faWarning} size="sm" />
                        &nbsp;This feature is currently under development. Classification results should not be considered for any financial decisions.
                    </div>
                </Card2>
                <div className={classes["stock-module"]}>
                    {stock != null ? <StockCard /> : <NullStockCard />}
                </div>

                {isLoading ? <LoadingModal /> : null}
                {model == null && stock != null ? <SetModelCard /> : null}

                {model != null ? <SetPatternCard /> : null}

                {model != null && pattern != null ? <MakePredictionCard /> : null}
            </div>
        </>
    );
}

export default ToolsPage;