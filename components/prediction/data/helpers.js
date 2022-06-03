// model input format:
// pattern= {name, dates:[...], f1:[...], f2:[...], f3:[...], f4:[...]}

// chart input format: 
// stock= {name, data: [{date, open, high, low, close, volumme}, ...]}
// date format: "yyyy-mm-dd 00:00:00"

// alpha vantage api fetch format:
// stock= {"Meta Data": {"1. Information": "", "2. Symbol": "", "3. Last Refreshed": "", "4. Output Size": "", "5. Time Zone": ""}, "Time Series (Daily)": {"yyyy-mm-dd": {"1. open": "", "2. high": "", "3. low": "", "4. close": "", "5. volume": ""}, ...}}

// yahoo finance api fetch format:
// stock= {"chart": {"result": [0: {"meta":{...}, "timestamp": [0: timestamp int, 1: timestamp int, ...], "indicators": {"quote": [0:{"open":[int: float, ...], "high":[int: float, ...], "close":[int: float, ...], "low":[int: float, ...], "volume":[int: int, ...]}], "adjclose": [...]}}]}}

export const apiToChartFormatter = (apiData, apiName) => {
    let chartData;
    if (apiName == 'alpha_vantage') {
        const dailyData = apiData["Time Series (Daily)"];
        chartData = { name: apiData["Meta Data"]["2. Symbol"], data: [] };
        
        for (const day in dailyData) {
            chartData.data.push({
                date: day + " 00:00:00",
                open: parseFloat(dailyData[day]["1. open"]).toFixed(2),
                high: parseFloat(dailyData[day]["2. high"]).toFixed(2),
                low: parseFloat(dailyData[day]["3. low"]).toFixed(2),
                close: parseFloat(dailyData[day]["4. close"]).toFixed(2),
                volume: parseInt(dailyData[day]["5. volume"])
            });
        }
        chartData.data.reverse();
    }
    else if (apiName == 'yahoo_finance') {
        const result = apiData["chart"]["result"][0];
        const dailyData = result["indicators"]["quote"][0];
        const timeStamps = result["timestamp"];

        function padZero(number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        }

        function unixtime2YYMMDD(unixtime) {
            let milliseconds = unixtime * 1000,
                dateObject = new Date(milliseconds),
                temp = [];
            temp.push(dateObject.getUTCFullYear().toString());
            temp.push(padZero(dateObject.getUTCMonth() + 1));
            temp.push(padZero(dateObject.getUTCDate()));
            return temp.join("-");
        }

        chartData = { name: result["meta"]["symbol"], data: [] }
        for (let i = 0; i < dailyData["open"].length; i++) {
            chartData.data.push({
                date: unixtime2YYMMDD(timeStamps[i]) + " 00:00:00",
                open: dailyData["open"][i].toFixed(2),
                high: dailyData["high"][i].toFixed(2),
                low: dailyData["low"][i].toFixed(2),
                close: dailyData["close"][i].toFixed(2),
                volume: parseInt(dailyData["volume"][i])
            });
        }
    }

    return chartData;
}