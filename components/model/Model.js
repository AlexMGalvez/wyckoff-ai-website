import Card from "../UI/Card";
import LoadingModal from "../UI/LoadingModal";
import DateRangePicker from "../UI/DateRangePicker";
import PatternChartUI from "../prediction/patternChart/chartUI"

import helpers from ".//helpers";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setModel } from "../../store/modelSlice";


import { apiToChartFormatter } from "../prediction/data/helpers";


const PAD_MAX = 2061;
const SPECIAL_CHAR = 0;
const loadModel = helpers.loadModel;
const makePrediction = helpers.makePrediction;

const Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const model = useSelector((state) => state.model.model);
  const stock = useSelector((state) => state.stock.stock);
  const pattern = useSelector((state) => state.pattern.pattern);
  const dispatch = useDispatch();

  const setModelHandler = async () => {
    setIsLoading(true);
    const model = await loadModel();
    dispatch(setModel(model));
    setIsLoading(false);
  };

  const onDateChange = (event) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    }
    const startDate = convertDate(event.target.startValue);
    const endDate = convertDate(event.target.endValue);
    dispatch(setPatternStart(startDate));
    dispatch(setPatternEnd(endDate));

    setPatternHandler();
  };

  const makePredictionHandler = async () => {
    console.log("Making prediction...");
    const modelOut = await makePrediction(
      model,
      pattern,
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
      <DateRangePicker/>
      
  

      <PatternChartUI pattern={pattern} />
      {/* <button onClick={setPatternHandler}>Set Pattern</button> */}
    </Card>
  )

  const MakePredictionCard = () => (
    <>
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
    </>
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
