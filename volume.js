const Binance = require('binance-api-node').default
const axios = require('axios')
const bi = Binance({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
    // getTime: xxx // time generator function, optional, defaults to () => Date.now()
})

// const eyo = bi.exchangeInfo().then(time => (time.symbols)).then(coins => {
//     return coins.filter(function(coin) {
//         let num = coin.symbol.split('').length
//         if (coin.symbol.split('')[coin.symbol.split('').length - 1] == 'H')
//             return coin

//     })
// }).then(coins => coins.map(coin => console.log(coin)))

// const eyo = axios.get(`https://api.binance.com/api/v1/ticker/price`, { params: { symbol: 'ETHUSDT' } }).then((datum) => {
//         console.log(datum.data.price)


//     })
let ETHPRICE = axios.get(`https://api.binance.com/api/v1/ticker/price`, { params: { symbol: 'ETHUSDT' } }).then((datum) => datum.data.price)
let BNBPRICE = axios.get(`https://api.binance.com/api/v1/ticker/price`, { params: { symbol: 'BNBUSDT' } }).then((datum) => datum.data.price)
let BTCPRICE = axios.get(`https://api.binance.com/api/v1/ticker/price`, { params: { symbol: 'BTCUSDT' } }).then((datum) => datum.data.price)
let stuff = axios.get(`https://api.binance.com/api/v1/ticker/24hr`)
async function getprice() {
    try {
        let ETH = await ETHPRICE
        let BNB = await BNBPRICE
        let BTC = await BTCPRICE

        return { ETH: ETH, BNB: BNB, BTC: BTC }
    } catch (err) {
        console.log(err)
    }
}
async function checkcoin(coins, volume) {
    try {
        const prices = await getprice()
        const coin = await coins
        const rgETH = /[ETH]$/
        const rgBTC = /[BTC]$/
        const rgBNB = /[BNB]$/
        const rgUSDT = /[USDT]$/
            //console.log(coin)
        if (coin.symbol.match(rgETH) && coin.quoteVolume * prices.ETH >= volume) {
            return true

        } else if (coin.symbol.match(rgBNB) && coin.quoteVolume * prices.BNB >= volume) {
            return true

        } else if (coin.symbol.match(rgBTC) && coin.quoteVolume * prices.BTC >= volume) {
            return true

        } else if (coin.symbol.match(rgUSDT) && coin.quoteVolume * 1 >= volume) {
            return true

        } else {
            return false
        }
    } catch (err) {
        console.log(err)
    }
}

// const eyo = axios.get(`https://api.binance.com/api/v1/ticker/24hr`).then((datum) => {
//         let volarr = []
//         return Promise.all(datum.data.map(async function(dat) {
//             let a = await checkcoin(dat)
//                 //console.log(a)
//             if (a === true) {
//                 //console.log(a)
//                 //console.log('1111' + dat.symbol)
//                 volarr.push(dat.symbol)
//                 return volarr
//                     // console.log(volarr)
//                     //return dat.symbol
//             }
//         }))
//     })
module.exports.volumeCheck = async function(volume) {
        let s = await stuff


        return Promise.all(s.data.map(async function(dat, i) {
            let a = await checkcoin(dat, volume)
            if (a === true) {

                return dat.symbol
            } else {
                //console.log('twale')
            }
        }))

        .then((arr) => {
            //let r = []
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined)) {
                    return a
                }
                //return r
            }))
        }).catch(err => console.log(err))
    }
    // let a = (async() => {
    //     let b = await eyo
    //     console.log(b)
    // })()