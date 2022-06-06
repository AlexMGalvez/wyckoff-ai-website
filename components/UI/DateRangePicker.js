import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import 'react-day-picker/src/style.css';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { setPattern } from "../../store/patternSlice";
import { setClassification } from "../../store/classificationSlice";

import classes from "./DateRangePicker.module.css";

const pastMonth = new Date(2020, 10, 15);

const DateRangePicker = () => {
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
            if ((toDateIndex - fromDateIndex) < 5) {
                return footer = (
                    <div className={"error-msg"}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                        &nbsp;Must select a pattern over 5 days.
                    </div>
                );
            }
            eligiblePattern = Object.entries(stock.data).slice(fromDateIndex, toDateIndex + 1).map(day => day[1]);
            setPatternHandler(eligiblePattern);
            return footer = (
                <p>
                    {format(range.from, 'PPP')}-{format(range.to, 'PPP')}
                </p>
            );
        } else {
            return footer = (
                <div className={"error-msg"}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                    &nbsp;A weekend or holiday cant be selected.
                </div>
            );
        }
    }

    const setPatternHandler = (data) => {
        dispatch(setPattern({ name: "pattern", data }));
        dispatch(setClassification(null))
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
            className={classes["day-picker"]}
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