import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'react-day-picker/src/style.css';

import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

import { setPattern } from "../../store/patternSlice";

const pastMonth = new Date(2020, 10, 15);

const DateRangePicker = () => {
    const defaultSelected = DateRange = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
    };
    const [range, setRange] = useState();
    const stock = useSelector((state) => state.stock.stock);

    const startBoundryDay = stock.data[0].date.slice(8, 11).replace(/^0+/, '');
    const startBoundryMonth = stock.data[0].date.slice(5, 7).replace(/^0+/, '');
    const startBoundryYear = stock.data[0].date.slice(0, 4);
    const endBoundryDay = stock.data[stock.data.length - 1].date.slice(8, 11).replace(/^0+/, '');
    const endBoundryMonth = stock.data[stock.data.length - 1].date.slice(5, 7).replace(/^0+/, '');
    const endBoundryYear = stock.data[stock.data.length - 1].date.slice(0, 4);
    const startBoundryDate = new Date(startBoundryYear, startBoundryMonth - 1, startBoundryDay);
    const endBoundryDate = new Date(endBoundryYear, endBoundryMonth - 1, endBoundryDay);

    const dispatch = useDispatch();

    /*
    Determines whether a given date range is eligible for producing a pattern. Outputs the selected dates and creates the pattern if it is eligible, and Outputs an error message if it is not.
    */
    const dateEligibility = (range) => {
        function dateToString(t) {
            const a = [{ year: "numeric" }, { month: "2-digit" }, { day: "2-digit" }];
            const s = "-"

            function format(m) {
                let f = new Intl.DateTimeFormat("en", m);
                return f.format(t);
            }
            return a.map(format).join(s) + " 00:00:00";
        }

        const fromDate = dateToString(range.from);
        const toDate = dateToString(range.to);
        const fromDateIndex = stock.data.findIndex(day => day.date == fromDate);
        const toDateIndex = stock.data.findIndex(day => day.date == toDate);
        let eligiblePattern;

        if (fromDateIndex != -1 && toDateIndex != -1) {
            eligiblePattern = Object.entries(stock.data).slice(fromDateIndex, toDateIndex + 1).map(day => day[1]);
            setPatternHandler(eligiblePattern);
            return footer = (
                <p>
                    {format(range.from, 'PPP')}-{format(range.to, 'PPP')}
                </p>
            );
        } else {
            return footer = (
                <p>
                    Weekend or holiday cant be selected
                </p>
            );
        }
    }

    const setPatternHandler = (data) => {
        // const pattern = {
        //   name: "CVS",
        //   dates: [
        //     "2004-05-17",
        //     "2004-05-18",
        //     "2004-05-19",
        //     "2004-05-20",
        //     "2004-05-21",
        //     "2004-05-24",
        //     "2004-05-25",
        //     "2004-05-26",
        //     "2004-05-27",
        //     "2004-05-28",
        //     "2004-06-01",
        //     "2004-06-02",
        //     "2004-06-03",
        //     "2004-06-04",
        //     "2004-06-07",
        //     "2004-06-08",
        //     "2004-06-09",
        //     "2004-06-10",
        //     "2004-06-14",
        //     "2004-06-15",
        //     "2004-06-16",
        //     "2004-06-17",
        //     "2004-06-18",
        //     "2004-06-21",
        //     "2004-06-22",
        //     "2004-06-23",
        //     "2004-06-24",
        //     "2004-06-25",
        //     "2004-06-28",
        //     "2004-06-29",
        //     "2004-06-30",
        //     "2004-07-01",
        //     "2004-07-02",
        //     "2004-07-06",
        //     "2004-07-07",
        //     "2004-07-08",
        //     "2004-07-09",
        //     "2004-07-12",
        //     "2004-07-13",
        //     "2004-07-14",
        //     "2004-07-15",
        //     "2004-07-16",
        //     "2004-07-19",
        //     "2004-07-20",
        //     "2004-07-21",
        //     "2004-07-22",
        //     "2004-07-23",
        //     "2004-07-26",
        //     "2004-07-27",
        //     "2004-07-28",
        //     "2004-07-29",
        //     "2004-07-30",
        //     "2004-08-02",
        //     "2004-08-03",
        //     "2004-08-04",
        //     "2004-08-05",
        //     "2004-08-06",
        //     "2004-08-09",
        //     "2004-08-10",
        //     "2004-08-11",
        //     "2004-08-12",
        //     "2004-08-13",
        //   ],
        //   f1: [
        //     19.75, 20.025, 19.84, 19.98, 19.93, 19.99, 20.575001, 20.52, 20.98, 20.84,
        //     20.809999, 20.809999, 20.799999, 20.955, 20.955, 20.885, 20.74, 21.26,
        //     21.23, 21.299999, 21.32, 21.190001, 20.98, 20.965, 20.84, 20.85,
        //     20.754999, 20.67, 20.844999, 21.075001, 21.01, 20.85, 20.83, 20.92,
        //     21.049999, 21.264999, 21.535, 21.219999, 21.815001, 21.639999, 21.42,
        //     21.24, 21.48, 21.690001, 21.440001, 21.275, 20.98, 20.674999, 21.309999,
        //     20.940001, 21.004999, 20.934999, 21.32, 20.885, 20.605, 20.165001,
        //     19.639999, 19.705, 19.875, 19.795, 19.530001, 19.575001,
        //   ],
        //   f2: [
        //     3897000, 4539000, 3832800, 2582800, 4943000, 3938600, 3350200, 3429200,
        //     5182600, 2969800, 3408400, 2996400, 3171400, 2343200, 2998400, 4645400,
        //     2415800, 3226200, 4876600, 3031800, 1970400, 2519200, 4797200, 2494600,
        //     2505400, 3646800, 3503400, 5668800, 4034600, 4560000, 3746200, 3248600,
        //     2259200, 3115600, 2725800, 4038800, 4610600, 4859400, 3951800, 3098000,
        //     2020400, 3468600, 3035000, 3867600, 3586000, 3339800, 3228800, 2744800,
        //     3928200, 4604400, 3631400, 2350600, 3322400, 3018400, 5397200, 2762400,
        //     4241400, 2288400, 4169200, 3139400, 3068400, 4533600,
        //   ],
        //   f3: [
        //     1876.640015, 1897.819946, 1898.170044, 1896.589966, 1912.089966,
        //     1922.97998, 1964.650024, 1976.150024, 1984.5, 1986.73999, 1990.77002,
        //     1988.97998, 1960.26001, 1978.619995, 2020.619995, 2023.530029,
        //     1990.609985, 1999.869995, 1969.98999, 1995.599976, 1998.22998,
        //     1983.670044, 1986.72998, 1974.380005, 1994.150024, 2020.97998,
        //     2015.569946, 2025.469971, 2019.819946, 2034.930054, 2047.790039,
        //     2015.550049, 2006.660034, 1963.430054, 1966.079956, 1935.319946,
        //     1946.329956, 1936.920044, 1931.660034, 1914.880005, 1912.709961,
        //     1883.150024, 1883.829956, 1917.069946, 1874.369995, 1889.060059,
        //     1849.089966, 1839.02002, 1869.099976, 1858.26001, 1881.060059,
        //     1887.359985, 1892.089966, 1859.420044, 1855.060059, 1821.630005,
        //     1776.890015, 1774.640015, 1808.699951, 1782.420044, 1752.48999,
        //     1757.219971,
        //   ],
        //   f4: [
        //     1528890000, 1435100000, 1834960000, 1540900000, 1376620000, 1422080000,
        //     1770600000, 1591030000, 1641260000, 1233190000, 1459030000, 1520120000,
        //     1526670000, 1417600000, 1485300000, 1464790000, 1520200000, 1345640000,
        //     1402630000, 1527280000, 1353130000, 1449920000, 1697770000, 1363000000,
        //     1660890000, 1803560000, 1685690000, 1972100000, 1611080000, 1581530000,
        //     1754160000, 1739310000, 1200230000, 1927550000, 1762310000, 1789150000,
        //     1388750000, 1504000000, 1499660000, 1461800000, 1669940000, 2099400000,
        //     1774620000, 1628240000, 2109750000, 1964570000, 1697910000, 1667060000,
        //     1769400000, 1847380000, 1703350000, 1507320000, 1533970000, 1494480000,
        //     1659390000, 1574660000, 1692260000, 1263490000, 1468460000, 1794260000,
        //     1632660000, 1347750000,
        //   ],
        // }

        dispatch(setPattern({name: "pattern", data}));
    };

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
            footer = dateEligibility(range);
        }
    }

    return (
        <DayPicker
            mode="range"
            captionLayout="dropdown"
            defaultMonth={pastMonth}
            selected={range}
            footer={footer}
            onSelect={setRange}
            fromDate={startBoundryDate}
            toDate={endBoundryDate}
        />
    );
}

export default DateRangePicker;