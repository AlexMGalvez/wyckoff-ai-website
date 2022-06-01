// model format:
// pattern= {name, dates:[...], f1:[...], f2:[...], f3:[...], f4:[...]}

// chart format: 
// stock= {name, data: [{date, open, high, low, close, volumme}, ...]}
// date format: "yyyy-mm-dd 00:00:00"

// alphavantage api format:
// stock= {"Meta Data": {"1. Information": "", "2. Symbol": "", "3. Last Refreshed": "", "4. Output Size": "", "5. Time Zone": ""}, "Time Series (Daily)": {"yyyy-mm-dd": {"1. open": "", "2. high": "", "3. low": "", "4. close": "", "5. volume": ""}, ...}}

export const apiToChartFormatter = (apiData) => {
    let chartData = { name: apiData["Meta Data"]["2. Symbol"], data: [] };
    const dailyData = apiData["Time Series (Daily)"];

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
    return chartData;
}