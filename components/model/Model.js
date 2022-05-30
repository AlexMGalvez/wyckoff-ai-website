import Card from "../UI/Card";
import LoadingModal from "../UI/LoadingModal";

import helpers from ".//helpers";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setModel } from "../../store/modelSlice";
import { setPattern } from "../../store/patternSlice";

const PAD_MAX = 2061;
const SPECIAL_CHAR = 0;
const loadModel = helpers.loadModel;
const makePrediction = helpers.makePrediction;

const Model = () => {
  const [isLoading, setIsLoading] = useState(false);
  const model = useSelector((state) => state.model.model);
  const pattern = useSelector((state) => state.pattern);
  const dispatch = useDispatch();

  const setModelHandler = async () => {
    setIsLoading(true);
    const model = await loadModel();
    dispatch(setModel(model));
    setIsLoading(false);
  };

  const makePredictionHandler = async () => {
    console.log("Making prediction...");
    const modelOut = await makePrediction(
      model,
      pattern.pattern,
      PAD_MAX,
      SPECIAL_CHAR
    );
    console.log("Prediction results: ");
    console.log(modelOut.arraySync());
    console.log("");
  };

  const SetModelCard = () => (
    <Card>
      <button onClick={setModelHandler}>Load Model</button>
    </Card>
  )

  const MakePredictionCard = () => (
    <Card>
      <span>
        Selected stock: {pattern.pattern.name}
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

  // if (isLoading) {
  //   return (
  //     <LoadingModal/>
  //   );
  // }

  return (
    <>
      {isLoading ? <LoadingModal/> : null}
      {model == null  && !isLoading ? <SetModelCard /> : null}
      {model != null ? <MakePredictionCard /> : null}
    </>
  );
};

export default Model;
