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
// import { ClickCallback } from "react-stockcharts/lib/interactive";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { useTheme } from 'next-themes'

// recieved from click format: "yyyy-mm-ddT05:00:00.000Z"
// patternStart/End format: "yyyy-mm-dd"

let ChartJS = (props) => {
    const changeCalculator = change();
    const stock = useSelector((state) => state.stock.stock);
    const { theme, setTheme } = useTheme()
    //const patternStart = useSelector((state) => state.patternStart.patternStart);

    const { type, width, ratio } = props;

    let initialData = [];

    for (let i = 0; i < stock.data.length; i++) {
        initialData.push({
            date: new Date(stock.data[i].date),
            open: stock.data[i].open,
            high: stock.data[i].high,
            low: stock.data[i].low,
            close: stock.data[i].close,
            volume: stock.data[i].volume
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
    const changeScroll = () => {
        let style = document.body.style.overflow
        document.body.style.overflow = (style === 'hidden') ? 'auto' : 'hidden'
    }

    // const onClickHandler = (moreProps) => {
    //     console.log("Clicked")
    //     console.log(moreProps) // Test this in production
    // }

    // const onContextMenuHandler = (moreProps) => {
    //     console.log("Right clicked")
    //     console.log(moreProps) // Test this in production
    // }

    return (
        <div
        // onMouseEnter={changeScroll}
        // onMouseLeave={changeScroll}
        >
            <ChartCanvas height={400}
                width={width}
                ratio={ratio}
                margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
                type={type}
                seriesName={stock.name}
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
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s") } tickStroke={theme == "dark" ? "white": "black"}/>
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
                    <XAxis axisAt="bottom" orient="bottom" stroke={theme == "dark" ? "white": "black"} tickStroke={theme == "dark" ? "white": "black"}/>
                    <YAxis axisAt="right" orient="right" ticks={5} stroke={theme == "dark" ? "white": "black"} tickStroke={theme == "dark" ? "white": "black"}/>
                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%Y-%m-%d")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    {theme == "dark" ? <CandlestickSeries wickStroke={ d => d.close > d.open ? "#6BA583" : "#DB0000"} fill={d => d.close > d.open ? "#6BA583" : "#DB0000"} /> : <CandlestickSeries/>}

                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                        yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />

                    <OHLCTooltip origin={[-40, 0]} />
                    {/* <ClickCallback
                        onClick={ (moreProps, e) => { onClickHandler(moreProps) } }
                        onContextMenu={ (moreProps, e) => { onContextMenuHandler(moreProps) } }
					/> */}
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        </div>
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