import { useState, useEffect } from "react";
import ChartJS from "./Chart";
import classes from "./ChartUI.module.css";

const ChartUi = (props) => {
  const [chartsToDisplay, setChartsToDisplay] = useState([]);

  const getData = async () => {
    const charts = [];
    if (props.stock != null) {
      charts.push(<ChartJS key={1} stock={props.stock.data}/>);
    }
    setChartsToDisplay(charts);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
      <div className={classes.chart}>
        {chartsToDisplay}
      </div>
  );
};

export default ChartUi;