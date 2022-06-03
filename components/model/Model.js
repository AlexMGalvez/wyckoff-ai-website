import Card from "../UI/Card";
import LoadingModal from "../UI/LoadingModal";
import DateRangePicker from "../UI/DateRangePicker";
import PatternChartUI from "../prediction/patternChart/chartUI"

import helpers from ".//helpers";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setModel } from "../../store/modelSlice";
import { setClassification } from "../../store/classificationSlice";

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

  const SetModelCard = () => (
    <Card>
      <p>Load model for AI-assisted classification: </p>
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
      <button onClick={makePredictionHandler}>Predict pattern</button>
      {model != null && pattern != null && classification != null ? <PredictionResults /> : null}
    </Card>
  )

  const PredictionResults = () => {
    // [1, 0, 0] = False accumulation pattern
    // [0, 1, 0] = Accumulation pattern ending at a spring in phase C
    // [0, 0, 1] = Incomplete accumulation pattern ending at a secondary test in phase B

    const classifyIndex = classification.indexOf(Math.max(...classification));

    if (classifyIndex == 0) {
      return (
        <>
          <h2>Possible Distribution</h2>
          <p>The AI predicts that this is a distribution scenario. Consider selling assets and placing short positions.</p>
          <p>Remain vigilant and flexible with your assets and continue analyzing near future market behaviour for any changes in Wyckoffian activity.</p>
        </>
      )
    }
    else if (classifyIndex == 1) {
      return (
        <>
          <h2>Possible Accumulation</h2>
          <p>The AI predicts that this is an accumulation scenario reaching its finishing stage of phase C and unlikely to lower much further in value.</p>
          <p>Consider placing long positions. Remain vigilant and flexible with your assets and continue analyzing near future market behaviour for any changes in Wyckoffian activity.</p>
        </>
      )
    }
    else if (classifyIndex == 2) {
      return (
        <>
          <h2>Possible Accumulation</h2>
          <p>The AI predicts that this is an incomplete accumulation scenario currently testing in phase B. Consider holding back on placing long positions until phase C is nearing completion.</p>
        </>
      )
    }
  }

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
