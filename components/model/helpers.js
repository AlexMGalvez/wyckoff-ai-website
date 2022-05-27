import * as tf from "@tensorflow/tfjs";

const loadModel = () =>
  tf.ready().then(async () => {
    try {
      let model;
      if (process.env.PUBLIC_URL) {
        // production enviornment
        model = await tf.loadLayersModel(
          process.env.PUBLIC_URL + "/model/wyckoff-ai-model.json"
        );
      } else {
        // development enviornment
        model = await tf.loadLayersModel(
          window.location.origin + "/model/wyckoff-ai-model.json"
        );
      }
      return model;
    } catch (err) {
      console.log(err);
    }
  });

const makePrediction = (model, pattern, PAD_MAX, SPECIAL_CHAR) => {
  const inputLayerShape = [2, PAD_MAX];
  const [X, paddingIndex] = reformatRawData(
    pattern,
    SPECIAL_CHAR,
    inputLayerShape
  );
  const inputTensor = tf.tensor3d(X);
  const normalizedInput = normalizeTensorFit(
    inputTensor,
    paddingIndex,
    PAD_MAX,
    SPECIAL_CHAR
  );
  const modelOut = model.predict(normalizedInput);
  inputTensor.dispose();
  normalizedInput.dispose();
  return modelOut;
};

/*
  Reformats raw data into an array X for feeding into the neural network and provides a padding index.

  Returns:
    X is defined as a double input array of a stock pattern containing 4 feature arrays of padMax length.
    X = [feature1 array, feature2 array, feature3 array, feature4 array]

    paddingArray is an array of numbers representing the indexes of each stock where padding begins.
*/
const reformatRawData = (pattern, SPECIAL_CHAR, inputLayerShape) => {
  let X = [
    [[...pattern.f1], [...pattern.f2], [...pattern.f3], [...pattern.f4]],
  ];
  let paddingIndex = X[0].length;

  // provide padding for short length arrays
  for (let i = X[0].length; i < inputLayerShape[1]; i++) {
    X[0][0].push(SPECIAL_CHAR);
    X[0][1].push(SPECIAL_CHAR);
    X[0][2].push(SPECIAL_CHAR);
    X[0][3].push(SPECIAL_CHAR);
  }
  return [X, paddingIndex];
};

const normalizeTensorFit = (tensor, paddingIndex, PAD_MAX, SPECIAL_CHAR) => {
  let i = 0;
  let normalizedTensors = [];
  tf.unstack(tensor).forEach((stockTensor) => {
    // extract prices and volumes from each stock, and remove padding
    let stockPricesTensor = tf.slice(
      tf.unstack(stockTensor)[0],
      0,
      paddingIndex
    );
    let stockVolumesTensor = tf.slice(
      tf.unstack(stockTensor)[1],
      0,
      paddingIndex
    );
    let benchPricesTensor = tf.slice(
      tf.unstack(stockTensor)[2],
      0,
      paddingIndex
    );
    let benchVolumesTensor = tf.slice(
      tf.unstack(stockTensor)[3],
      0,
      paddingIndex
    );

    let maxStockPrice = stockPricesTensor.max();
    let minStockPrice = stockPricesTensor.min();
    let maxStockVolume = stockVolumesTensor.max();
    let minStockVolume = stockVolumesTensor.min();
    let maxBenchPrice = benchPricesTensor.max();
    let minBenchPrice = benchPricesTensor.min();
    let maxBenchVolume = benchVolumesTensor.max();
    let minBenchVolume = benchVolumesTensor.min();

    // use linear scaling equation x' = (x - xmin) / (xmax - xmin) for prices and volumes seperately
    let normalizedStockPricesTensor = stockPricesTensor
      .sub(minStockPrice)
      .div(maxStockPrice.sub(minStockPrice));
    let normalizedStockVolumesTensor = stockVolumesTensor
      .sub(minStockVolume)
      .div(maxStockVolume.sub(minStockVolume));
    let normalizedBenchPricesTensor = benchPricesTensor
      .sub(minBenchPrice)
      .div(maxBenchPrice.sub(minBenchPrice));
    let normalizedBenchVolumesTensor = benchVolumesTensor
      .sub(minBenchVolume)
      .div(maxBenchVolume.sub(minBenchVolume));

    //let PAD_MAX = Math.max(...paddingArray);
    let normalizedStockTensor = tf.stack([
      normalizedStockPricesTensor.pad(
        [[0, PAD_MAX - paddingIndex]],
        SPECIAL_CHAR
      ),
      normalizedStockVolumesTensor.pad(
        [[0, PAD_MAX - paddingIndex]],
        SPECIAL_CHAR
      ),
      normalizedBenchPricesTensor.pad(
        [[0, PAD_MAX - paddingIndex]],
        SPECIAL_CHAR
      ),
      normalizedBenchVolumesTensor.pad(
        [[0, PAD_MAX - paddingIndex]],
        SPECIAL_CHAR
      ),
    ]);
    normalizedTensors.push(normalizedStockTensor);

    maxStockPrice.dispose();
    minStockPrice.dispose();
    maxStockVolume.dispose();
    minStockVolume.dispose();
    maxBenchPrice.dispose();
    minBenchPrice.dispose();
    maxBenchVolume.dispose();
    minBenchVolume.dispose();
    stockPricesTensor.dispose();
    stockVolumesTensor.dispose();
    normalizedStockPricesTensor.dispose();
    normalizedStockVolumesTensor.dispose();
    benchPricesTensor.dispose();
    benchVolumesTensor.dispose();
    normalizedBenchPricesTensor.dispose();
    normalizedBenchVolumesTensor.dispose();
    i++;
  });

  let normalizedTensor = tf.stack(normalizedTensors);
  return normalizedTensor;
};

module.exports = {
  loadModel,
  makePrediction,
};
