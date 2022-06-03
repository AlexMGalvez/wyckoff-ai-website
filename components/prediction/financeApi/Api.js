export const fetchSymbols = async (keyword, apiName) => {
    if (apiName == "alpha_vantage") {
        const response = fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.NEXT_PUBLIC_ALPHAV_API}`)
            .then(res => res.json())
            .then(searchdata => {
                return (searchdata.bestMatches)
            }
            )
        return response;
    }
    else if (apiName == "yahoo_finance") {
        console.log("Yahoo Finance symbol fetching unavailable at the moment.")
    }
    return SYMBOL_DUMMY_DATA;
}

export const fetchStock = async (symbol, apiName, RANGE) => {
    if (apiName == "alpha_vantage") {
        console.log("The alpha vantage api has been disconnected for stock fetching due to lack of index stocks available.");
        // const response = fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHAV_API}`)
        //     .then(res => res.json())
        //     .then(searchdata => {
        //         return (searchdata)
        //     }
        //     )
        // return response;
    }
    else if (apiName == "yahoo_finance") {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': process.env.NEXT_PUBLIC_YAHOO_API_HOST,
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_YAHOO_API_KEY
            }
        };

        const response = fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1d&symbol=${symbol}&range=${RANGE}y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit`, options)
            .then(res => res.json())
            .then(res => { return (res) })
            .catch(err => console.error(err));
        
        //if (response == )
        return response;
    }
    return STOCK_DUMMY_DATA;
}
