const api = require('binance')
const binanceWS = new api.BinanceWS(true)

binanceWS.onKline('BNBBTC', '1m', (data) => {
    return (data)
}).then(data => {
    console.log(data)
})