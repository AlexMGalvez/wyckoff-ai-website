import { useState, useEffect } from "react";
import ChartJS from "./Chart";
import classes from "./ChartUI.module.css";

const ChartUi = (props) => {
    const [chartsToDisplay, setChartsToDisplay] = useState([]);

    const getData = async () => {
      const charts = [];
      charts.push(<ChartJS key={1} stock={props.stock.data} />);
      setChartsToDisplay(charts);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    return <div>{chartsToDisplay}</div>;
};

export default ChartUi;