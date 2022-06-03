import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    BarSeries,
    CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY,
    EdgeIndicator,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
    OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { change } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import stockSlice from "../../../store/stockSlice";

let ChartJS = (props) => {
    const changeCalculator = change();
    const pattern = useSelector((state) => state.pattern.pattern);

    const { type, width, ratio } = props;

    let initialData = [];

    for (let i = 0; i < pattern.data.length; i++) {
        initialData.push({
            date: new Date(pattern.data[i].date),
            open: pattern.data[i].open,
            high: pattern.data[i].high,
            low: pattern.data[i].low,
            close: pattern.data[i].close,
            volume: pattern.data[i].volume
        });
    }

    const calculatedData = changeCalculator(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider
        .inputDateAccessor(d => d.date);
    const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
    } = xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    // prevents page scroll on chart zoom 
    // const changeScroll = () => {
    //     let style = document.body.style.overflow
    //     document.body.style.overflow = (style === 'hidden') ? 'auto' : 'hidden'
    // }

    return (
        // <div
        //     onMouseEnter={changeScroll}
        //     onMouseLeave={changeScroll}
        // >
            <ChartCanvas height={400}
                width={width}
                ratio={ratio}
                margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
                type={type}
                seriesName={pattern.name}
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >

                <Chart id={2}
                    yExtents={[d => d.volume]}
                    height={150} origin={(w, h) => [0, h - 150]}
                >
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.volume}
                        widthRatio={0.95}
                        opacity={0.3}
                        fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}
                    />
                </Chart>
                <Chart id={1}
                    yExtents={d => [
                        Math.max(d.high, d.low),
                        Math.min(d.high, d.low),
                        ]}
                    padding={{ top: 40, bottom: 20 }}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <CandlestickSeries />
                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                        yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />

                    <OHLCTooltip origin={[-40, 0]} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        // </div>
    );
}

ChartJS.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

ChartJS.defaultProps = {
    type: "svg",
};
ChartJS = fitWidth(ChartJS);

export default ChartJS;