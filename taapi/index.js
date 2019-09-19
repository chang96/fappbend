const ema = require('./ema/ema')
const diff = require('./macd/emadiff')
const hist = require('./macd/ema9ofdiff')
const axios = require('axios')
const coin = 'ETHUSDT'
const time = '15m'
    // let close = axios.get(`https://api.binance.com/api/v1/klines?symbol=${coin}&interval=${time}&limit=500`).
    // then(data => data.data).then(data => data.map(datum => (datum[4])));
    // let close1 = axios.get(`https://api.binance.com/api/v1/klines?symbol=${coin}&interval=${time}&limit=500`).
    // then(data => data.data).then(data => data.map(datum => (datum[4])));

module.exports.histogram = async(close, close1) => {
    let c = await close
    let e = await close1
        //let d = await (ema.see(12, 12, c))
    macd = await diff.diff(c, e)
    let histogram = await hist.signal(macd)
        //return hist
    return histogram
        //d.splice(0, 400)
        //console.log()
}