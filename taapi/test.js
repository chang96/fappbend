const axios = require('axios')
const macdhistogram = require('./index')
const coin = 'EOSBTC'
const time = '15m'
let close100 = axios.get(`https://api.binance.com/api/v1/klines?symbol=${coin}&interval=${time}&limit=500`).
then(data => data.data).then(data => data.map(datum => (datum[4])));
let close200 = axios.get(`https://api.binance.com/api/v1/klines?symbol=${coin}&interval=${time}&limit=500`).
then(data => data.data).then(data => data.map(datum => (datum[4])));

function testing(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] < 0) {
        return true
    } else {
        return false
    }
}
let a = (async() => {
    const b = await macdhistogram.histogram(close100, close200)
    b.splice(0, 400)
    console.log(b)
})()