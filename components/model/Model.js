import Card from "../UI/Card";
import helpers from ".//helpers";
import { useSelector, useDispatch } from "react-redux";
import { setModel } from "../../store/modelSlice";
import { setPattern } from "../../store/patternSlice";

const PAD_MAX = 2061;
const SPECIAL_CHAR = 0;
const loadModel = helpers.loadModel;
const makePrediction = helpers.makePrediction;

const Model = () => {
  const model = useSelector((state) => state.model.model);
  const pattern = useSelector((state) => state.pattern);
  const dispatch = useDispatch();

  const setModelHandler = async () => {
    console.log("Loading model...");
    const model = await loadModel();
    dispatch(setModel(model));
    console.log("Model loaded");
    console.log("");
    
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

  return (
    <div>
      <Card>
        <button onClick={setModelHandler}>Load Model</button>
      </Card>
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
    </div>
  );
};

export default Model;
