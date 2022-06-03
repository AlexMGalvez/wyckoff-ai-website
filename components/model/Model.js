import Card from "../UI/Card";
import LoadingModal from "../UI/LoadingModal";
import DateRangePicker from "../UI/DateRangePicker";
import PatternChartUI from "../prediction/patternChart/chartUI"

import helpers from ".//helpers";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setModel } from "../../store/modelSlice";

const PAD_MAX = 2061;
const SPECIAL_CHAR = 0;
const loadModel = helpers.loadModel;
const makePrediction = helpers.makePrediction;

const Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const model = useSelector((state) => state.model.model);
  const stock = useSelector((state) => state.stock.stock);
  const benchMark = useSelector((state) => state.benchMark.benchMark);
  const pattern = useSelector((state) => state.pattern.pattern);
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
    console.log("j: ", j)
    console.log("patternIn: ", patternIn)

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
  };

  const SetModelCard = () => (
    <Card>
      <p>Load model for AI classification tool: </p>
      <button onClick={setModelHandler}>Load Model</button>
    </Card>
  )

  const SetPatternCard = () => (
    <Card>
      <p>Select a pattern: </p>
      <DateRangePicker />
      <PatternChartUI pattern={pattern} />
    </Card>
  )

  const MakePredictionCard = () => (
    <Card>
      <span>
        Selected pattern from stock: {stock.name}
        <br />
        <br />
      </span>
      <button onClick={makePredictionHandler}>Predict pattern</button>
      <p>
        [1, 0, 0] = False accumulation pattern
        <br />
        [0, 1, 0] = Accumulation pattern ending at a spring in phase C
        <br />
        [0, 0, 1] = Incomplete accumulation pattern ending at a secondary test
        in phase B
        <br />
      </p>
    </Card>
  )

  return (
    <>
      {isLoading ? <LoadingModal /> : null}
      {model == null && !isLoading ? <SetModelCard /> : null}
      {model != null ? <SetPatternCard /> : null}
      {model != null && pattern != null ? <MakePredictionCard /> : null}
    </>
  );
};

export default Model;
