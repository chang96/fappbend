const taapi = process.env.TAAPI;
const stores = require('../store/store')
let axios = require('axios');
//let pair = ['BTCUSDT', 'ETHUSDT', 'GVTETH', 'BNBETH', 'CELRETH', 'MATICETH', 'MATICUSDT', 'CELRUSDT', ]

module.exports.macd = axios.get('https://api.taapi.io/macd', {
        params: {
            secret: taapi,
            exchange: "binance",
            symbol: "ETHUSDT",
            interval: "5m",
        }
    })
    .then(function(response) {
        return response.data.valueMACD >= response.data.valueMACDSignal;
    })
    .catch(function(error) {
        return error;
    });

module.exports.rsi = axios.get('https://api.taapi.io/rsi', {
        params: {
            secret: taapi,
            exchange: "binance",
            symbol: "ETHUSDT",
            interval: "5m",
        }
    })
    .then(function(response) {
        //console.log(response.data)
        return response.data;
    })
    .catch(function(error) {
        return error;
    });

module.exports.stoch = axios.get('https://api.taapi.io/stoch', {
        params: {
            secret: taapi,
            exchange: "binance",
            symbol: "ETHUSDT",
            interval: "5m",
        }
    })
    .then(function(response) {
        return response.data;
    })
    .catch(function(error) {
        return error;
    });