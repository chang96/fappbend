require('dotenv').config()
const tulind = require('tulind')
const mymacd = require('./taapi/index')
const Coins = require('./model/coin')
const axios = require('axios')
const v = require('./vpush').v
const myrsi = require('./taapiRSI/index')
const ema = require('./taapi/ema/ema')
const stochastic = require('./taapistoch/index')
const Binance = require('binance-api-node').default
const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true
})
const ha = require('./HA')
const renko = require('./screnko').renko
const eyo = require('./volume')

// Authenticated client, can make signed calls
const bi = Binance({
        apiKey: process.env.APIKEY,
        apiSecret: process.env.APISECRET,
        // getTime: xxx // time generator function, optional, defaults to () => Date.now()
    })
   

let find2 = async(size, volume, eyoar) => {
    let arr = []
    let eyoarr = await eyoar
    return Promise.all(
        eyoarr.map(async function(eyo) {
            let bars = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=1000`).
            then(data => (data.data))
            // let open300 = await (bars.map(datum => (datum[1])))
            // let high300 = await (bars.map(datum => (datum[2])))
            // let low300 = await 
            let forHa = [...bars]
            let ashi = await ha.HeikinAshi(forHa)
            let aclose300 =await (ashi.map(datum => (datum[3])))
            let aclose100 = [...aclose300]
            let aclose200 = [...aclose300]
            let aclose400 = [...aclose300]
            let aclose500 = [...aclose300]
            let astochClose = [...aclose300]
            let close300 = await (bars.map(datum => (datum[4])))
            let close100 = [...close300]
            let close200 = [...close300]
            let close400 = [...close300]
            let close500 = [...close300]
            let stochClose = [...close300]
            let volumepush = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))
            let v3 = volumepush.slice(19, 26)
            return { name: eyo, pip100: close100, pip200: close200, pip: close400,  v: volumepush, v3: v3, pip500: close500, stochClose: stochClose, forrenko:bars,
                apip100: aclose100, apip200: aclose200, apip: aclose400, apip500: aclose500, astochClose: astochClose,
            }
        })).catch(err => console.log(err))

}

let find1 = async(size, volume) => {
    // console.log(4)
    let arr = []
    let eyoarr = await eyo.volumeCheck(volume)
        //let eyoarr = eyoar
    return Promise.all(
        eyoarr.map(async function(eyo) {
            let bars = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=1000`).
            then(data => (data.data))
            let forHa = [...bars]
            let ashi = await ha.HeikinAshi(forHa)
            let aclose300 =await (ashi.map(datum => (datum[3])))
            let aclose100 = [...aclose300]
            let aclose200 = [...aclose300]
            let aclose400 = [...aclose300]
            let aclose500 = [...aclose300]
            let astochClose = [...aclose300]
            let close300 = await (bars.map(datum => (datum[4])))
            let close100 = [...close300]
            let close200 = [...close300]
            let close400 = [...close300]
            let close500 = [...close300]
            let stochClose = [...close300]
            //let volumepush = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            //then(data => data.data).then(data => data.map(datum => (datum[5])))
            //let v3 = volumepush.slice(19, 26)
            return { name: eyo, pip100: close100, pip200: close200, pip: close400, v: volumepush, v3: v3, pip500: close500, stochClose: stochClose, forrenko:bars,
                apip100: aclose100, apip200: aclose200, apip: aclose400, apip500: aclose500, astochClose: astochClose,
            }
        })).catch(err => console.log(err))

}
let find = async(size, volume) => {
    // console.log(4)
    let arr = []
    let eyoarr = await eyo.volumeCheck(volume)
    return Promise.all(
        eyoarr.map(async function(eyo) {
            let bars = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=1000`).
            then(data => (data.data))
            let forHa = [...bars]
            let ashi = await ha.HeikinAshi(forHa)
            let aclose300 =await (ashi.map(datum => (datum[3])))
            let aclose100 = [...aclose300]
            let aclose200 = [...aclose300]
            let aclose400 = [...aclose300]
            let aclose500 = [...aclose300]
            let astochClose = [...aclose300]
            let close300 =await (bars.map(datum => (datum[4])))
            let close100 = [...close300]
            let close200 = [...close300]
            let close400 = [...close300]
            let close500 = [...close300]
            let stochClose = [...close300]
            let volumepush = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))
            let v3 = volumepush.slice(19, 26)
            return { name: eyo, pip100: close100, pip200: close200, pip: close400, pip500: close500, v: volumepush, v3: v3, stochClose: stochClose, forrenko:bars,
                apip100: aclose100, apip200: aclose200, apip: aclose400, apip500: aclose500, astochClose: astochClose,
            }
        })).catch(err => console.log(err))

}

//(a[0][6] - a[1][6]) >= -0.9 * a[0][6] && (a[0][6] - a[1][6]) <= 0.7 && a[2][6] > -25 && b[0][17] < 40 && c[0][14] < c[1][14] && c[0][14] < 30
// const testing = function(a) {
//     if (a[0] <= 0 && a[1] <= 0 && a[2] <= 0 && a[3] <= 0 && a[4] <= 0 && a[5] <= 0 && a[6] >= 0)
//         return true
//     else return false
// }
function crossover(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 2] < 0) {
        //if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] < 0 && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else if(arr[arr.length - 1] >= 0 && arr[arr.length - 2] >= 0 &&  arr[arr.length - 3] < 0) {
        //if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] < 0 && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    }  else {
        return false
    }
}

function testing0(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] > arr[arr.length - 2]) {
        //if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] < 0 && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else {
        return false
    }
}

function pricing(arr) {
    if (arr[arr.length - 1] >= 1.03 * arr[arr.length - 2] && arr[arr.length - 2] >= 1.02 * arr[arr.length - 3] && arr[arr.length - 2] > 1.01 * arr[arr.length - 3]) {
        return true
    } else if (arr[arr.length - 1] >= 1.03 * arr[arr.length - 3]) {
        return true
    } else {
        return false
    }
}

function tickingfromnegative(arr) {
    //if (arr[arr.length - 1] >= 0 && arr[arr.length - 2] < 0) {
    if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] < 0 && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else {
        return false
    }
}

function testing2(arr) {
    //if (arr[arr.length - 1] >= 0 && arr[arr.length - 2] < 0) {
    if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else {
        return false
    }
}
//
function testing3(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 7] < 0 && arr[arr.length - 11] < 0 && arr[arr.length - 17] < 0) {
        return true
    } else {
        return false
    }
}

function histinc(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] > arr[arr.length - 2]) {
        return true
    } else {
        return false
    }
}

function histinc1(arr) {
    if (arr[arr.length - 1] > arr[arr.length - 2]) {
        return true
    } else if (arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else if (arr[arr.length - 1] > arr[arr.length - 2]) {
        return true
    } else {
        return false
    }
}

function histinc2(arr) {
    if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2]) {
        return true
    } else if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    } else if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2]) {
        return true
    } else {
        return false
    }
}

function histdec(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] < arr[arr.length - 2]) {
        return true
    } else if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] < arr[arr.length - 2] && arr[arr.length - 2] < arr[arr.length - 3]) {
        return true
    } else {
        return false
    }
}

function histneg(arr) {
    if (arr[arr.length - 1] < 0) {
        return true
    } else return false
}

function highrsi(arr) {
    if (arr[arr.length - 1] > 65) {
        return true
    } else return false
}

function testing4(arr) {
    if (arr[arr.length - 1] >= 0 && arr[arr.length - 1] >= arr[arr.length - 2] && arr[arr.length - 3] > 0 && arr[arr.length - 9] < 0) {
        return true
    } else {
        return false
    }
}

function pricing(arr) {
    if (arr[arr.length - 1] >= arr[arr.length - 2] && arr[arr.length - 2] >= arr[arr.length - 3] && arr[arr.length - 3] >= arr[arr.length - 4]) {
        return true
    } else return false
}

function voltesting(arr1, arr2) {
    return arr1.some(function(a, i) {
        return 1.1 * a >= arr2[i]
    })
}

function voltesting0(arr1, arr2) {
    arr1.splice(0, 4)
    arr2.splice(0, 4)
    return arr1.some(function(a, i) {
        return 1.1 * a >= arr2[i]
    })
}

function rsiLow(arr) {
    if (arr[arr.length - 1] <= 35 || arr[arr.length - 2] <= 35 || arr[arr.length - 3] <= 35 || arr[arr.length - 4] <= 35) {
        return true
    } else {
        return false
    }
}

function stochstrat(K, D) {
    if (K[0] >= D[0] && K[1] < D[1]) {
        return true
    } else if (K[0] >= D[0] && K[1] >= D[1] && K[2] < D[2]) {
        return true
    }
    // else if (K[0] >= D[0] && K[1] >= D[1] && K[2] >= D[2] && K[3] < D[3]) {
    //     return true
    // }
     else {
        return false
    }
}
let rgx1 = /BTC$/
let rgx2 = /ETH$/
let rgx3 = /USDT$/
let found = async(size, volume, rs, eyoar) => {
    let arr = []
        //console.log(3)
        //let candles = await find(size, volume)
    candles = await find2(size, volume, eyoar)
        //console.log(candles)
    return Promise.all(
            candles.map(async function(candle) {
                try {
                    let smav = await v(candle.v, 20)
                    let vtday = candle.v3
                    let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
                    let alpha = alph == NaN ? 0 : alph.toFixed(1)
                    let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
                        //console.log(mymyhist1)
                    let em = await ema.see(55, 55, candle.pip500)
                    let mymyhist = mymyhist1.histogram
                        //let mymysig = mymyhist1.signal
                    let mymymac = mymyhist1.macd
                        //let b = await tulind.indicators.rsi.indicator([candle.pip], [14])
                   let b = await myrsi.rsi(candle.pip)
                   let stochs = await stochastic.stochRSI(candle.stochClose)
                    let K = stochs.k
                    let D = stochs.d
                    let renkobars = await renko(candle.forrenko)
                       
                        // if (voltesting(vtday, smav) && tickingfromnegative(mymyhist)) {
                        //     return `${candle.name}.T`
                        // } else if (voltesting(vtday, smav) && rsiLow(b)) {
                        //     return `${candle.name}.R`
                        // } else if (voltesting(vtday, smav) && (crossover(mymyhist) || histinc(mymyhist)) && mymymac[mymymac.length - 1] < 0) {
                        //     return `${candle.name}.M0`
                        // } else 
                    let z = 40
                   // let rrssii = (b[b.length - 1] < 55 && (b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z || b[b.length - 7] < z))

                    // if (voltesting(vtday, smav) && crossover(mymyhist)) {
                    //     return candle.name
                    // } else if (voltesting0(vtday, smav) && histinc(mymyhist)) {
                    //     return candle.name
                    // }
                    // else if (voltesting(vtday, smav)) {
                    //     return candle.name
                    // }
                    //...............................................
                    // if (crossover(mymyhist) && candle.pip500[candle.pip500.length - 1] > em.ema && candle.pip500[candle.pip500.length - 2] < em.ema) {

                    //     return `${candle.name}`
                    // } else if (candle.pip500[candle.pip500.length - 2] < em.ema && candle.pip500[candle.pip500.length - 1] > em.ema && histinc1(mymyhist)) {

                    //     return `${candle.name}`&
                    // } else if (candle.pip500[candle.pip500.length - 1] > em.ema && crossover(mymyhist)) {

                    //     return `${candle.name}`
                    // } else
                    if(renkobars[1][0] == '+' &&renkobars[1][1] == '-' ){
                        return {name:`${candle.name}` }
                    }

                } catch (err) {
                    console.log(err)
                }
                //return arr
            })).then((arr) => {
            //let r = []
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined) ) {
                    //console.log(5)
                    return a
                }
                //return r
            }))
        }).catch(err => console.log(err))
        //console.log(candles[0])
}

let found1 = async(size, volume, rs) => {
    let arr = []
        //console.log(3)
    let candles = await find1(size, volume)
        //console.log(candles)
    return Promise.all(
            candles.map(async function(candle) {
                // let mymyhist = await mymacd.histogram(candle.pip100, candle.pip100)
                // mymyhist.splice(0, 450)
                //     console.log(mymyhist)
                // let b = await tulind.indicators.rsi.indicator([candle.pip100], [14])
                //console.log(candle.pip100)
                try {
                    let smav = await v(candle.v, 20)
                    let vtday = candle.v3
                    let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
                    let alpha = alph == NaN ? 0 : alph.toFixed(1)
                    let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
                        //console.log(mymyhist1)
                    let em = await ema.see(9, 9, candle.pip500)
                        //login n signup username mail pw public adress btc secret question secret answeer 3 investment plsn select plan sendmail for pending verification show paymnt whn done 
                        //balance requst for cash out 
                    let mymyhist = mymyhist1.histogram
                        //let mymysig = mymyhist1.signal
                    let mymymac = mymyhist1.macd
                   let b = await myrsi.rsi(candle.pip)
                    let stochs = await stochastic.stochRSI(candle.stochClose)
                    let K = await stochs.k
                    let D = await stochs.d
                    let renkobars = await renko(candle.forrenko)
                    let astochs = await stochastic.stochRSI(candle.astochClose)
                    let aK = await astochs.k
                    let aD = await astochs.d
                        //let c = await tulind.indicators.stoch.indicator([candle.val1, candle.val2, candle.val3], [14, 3, 3])
                        //console.log(c[1][14])
                        //console.log(a[2].length)
                        //b[b.length - 1] < 35 || b[b.length - 2] < 35 || b[b.length - 3] < 35 || b[b.length - 4] < 35 || b[b.length - 5] < 35 || b[b.length - 6] < 35 || b[b.length - 7] < 35)
                        // console.log(b[b.length - 1] < 35, b[b.length - 2] < 35, b[b.length - 3] < 35, b[b.length - 4] < 35, b[b.length - 5] < 35, b[b.length - 6] < 35, b[b.length - 7] < 35)
                        // let z = rs
                        //     //console.log((b[b.length - 1] < z || b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z))
                        // let testrsi = (b[b.length - 1] <= z || b[b.length - 2] <= z || b[b.length - 3] <= z)
                        //     //&& (b[b.length - 1] < z || b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z || b[b.length - 7] < z)
                        // if (testing(mymyhist)) {
                        //     //console.log({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                        //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                        //         //arr.push({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                        //         //arr.push({ name: candle.name })
                        //     return candle.name
                        // } else if ((testrsi && testing1(mymyhist))) {
                        //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                        //     return `${candle.name}::`
                    let z = 28
                        //console.log((b[b.length - 1] < z || b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z))
                        // let testrsi = (b[b.length - 1] <= z || b[b.length - 2] <= z || b[b.length - 3] <= z)
                        //&& (b[b.length - 1] < z || b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z || b[b.length - 7] < z)
                    //let rrssii = (b[b.length - 1] < 30 && (b[b.length - 2] < z || b[b.length - 3] < z || b[b.length - 4] < z || b[b.length - 5] < z || b[b.length - 6] < z || b[b.length - 7] < z))
                        // if ((testrsi && testing1(mymyhist))) {
                        // if ((testingrsi(b, z))) {
                        //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                        //     return `${candle.name}::`
                        // }
                        //if (testing(mymyhist) && rrssii) {

                    // if (mymymac[mymymac.length - 1] < 0 && mymymac[mymymac.length - 13] < 0 && mymymac[mymymac.length - 1] > mymymac[mymymac.length - 2] &&
                    //     mymymac[mymymac.length - 2] > mymymac[mymymac.length - 3] && mymyhist[mymyhist.length - 1] > mymyhist[mymyhist.length - 2] &&
                    //     mymyhist[mymyhist.length - 2] > mymyhist[mymyhist.length - 3]) {
                    //     return candle.name
                    // } else if (mymyhist[mymyhist.length - 1] >= 0 && mymyhist[mymyhist.length - 2] < 0) {
                    //     return candle.name
                    // } else if (mymyhist[mymyhist.length - 2] < 0 && mymyhist[mymyhist.length - 2] > mymyhist[mymyhist.length - 3] && pricing(candle.pip)) {
                    //     return candle.name
                    // } else if (mymymac[mymymac.length - 1] > 0 && tickingfromnegative(mymyhist)) {
                    //     return candle.name
                    // } else if (mymyhist[mymyhist.length - 1] >= 0 && mymyhist[mymyhist.length - 1] > mymyhist[mymyhist.length - 2] && mymyhist[mymyhist.length - 3] < 0) {
                    //     return candle.name
                    // } else if (mymyhist[mymyhist.length - 1] >= 0 && mymyhist[mymyhist.length - 1] > mymyhist[mymyhist.length - 2] && mymyhist[mymyhist.length - 2] > mymyhist[mymyhist.length - 3] && mymyhist[mymyhist.length - 4] < 0) {
                    //     return candle.name
                    // } else if (mymyhist[mymyhist.length - 1] >= 0 && mymyhist[mymyhist.length - 1] > mymyhist[mymyhist.length - 2] && mymyhist[mymyhist.length - 2] > mymyhist[mymyhist.length - 3] && mymyhist[mymyhist.length - 3] > mymyhist[mymyhist.length - 4] && mymyhist[mymyhist.length - 5] < 0) {
                    //     return candle.name
                    // } else if (tickingfromnegative(mymyhist) || crossover(mymyhist)) {
                    //     return candle.name
                    // } else if (mymymac[mymymac.length - 1] && tickingfromnegative(mymyhist)) {
                    //     return candle.name
                    // }
                    //.............................


                    if(renkobars[1][0] == '+'){
                        return {name:`${candle.name}` } 
                    } else if(aK[0] > aD[0] && ak[1] < aD[1]){
                        return {name:`ashi${candle.name}` } 
                    }

                    // if (crossover(mymyhist) && candle.pip500[candle.pip500.length - 1] > em.ema) {

                    //     return `${candle.name}`
                    // } else if (candle.pip500[candle.pip500.length - 1] > em.ema && histinc1(mymyhist)) {

                    //     return `${candle.name}`
                    // } else if (histinc(mymyhist) || crossover(mymyhist)) {

                    //     return `${candle.name}`
                    // } else if (stochstrat(K, D) || K[0] > D[0]) {
                    //     //console.log(K[0], D[0], K[1], D[1], candle.name)
                    //     return `${candle.name }`
                    // }

                    //// else if (histinc1(mymyhist) && voltesting0(vtday, smav) && candle.pip500[candle.pip500.length - 1] > em.ema && candle.pip500[candle.pip500.length - 23] < em.ema && candle.pip500[candle.pip500.length - 2] < em.ema) {
                    //     return candle.name
                    // }
                    // else if ((voltesting0(vtday, smav) && tickingfromnegative(mymyhist)) && rrssii) {
                    //     return candle.name
                    // }
                    // if ((rrssii && testing(mymyhist))) {
                    //     //console.log({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                    //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                    //         //arr.push({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                    //         //arr.push({ name: candle.name })
                    //     return `${candle.name}:::`

                    // } else if ((rrssii && testing1(mymyhist))) {
                    //     //console.log({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                    //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                    //         //arr.push({ name: candle.name, ma: a[0][6], si: a[1][6], hi: a[2][6] })
                    //         //arr.push({ name: candle.name })
                    //     return `${candle.name}   `
                    // } else if (testing(mymyhist)) {
                    //     console.log({ name: candle.name, hi: mymyhist[mymyhist.length - 1], rsi: b[b.length - 1] })
                    //     return `${candle.name}:  `
                    // } else if (mymymac[mymymac.length - 1] >= 0 && testing2(mymyhist)) {
                    //     return `${candle.name};;;;;  `
                    // } else if (testing3(mymymac) || testing4(mymymac)) {
                    //     return `${candle.name};;;   `
                    // } else {}
                } catch (err) {
                    console.log(err)
                }
                //return arr
            })).then((arr) => {
            //let r = []
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined)) {
                    // console.log(5)
                    return a
                }
                //return r
            }))
        }).catch(err => console.log(err))
        //console.log(candles[0])
}

let found2 = async(size, volume, rs, eyoar) => {
    let arr = []
        //console.log(3)
    let candles = await find2(size, volume, eyoar)
    return Promise.all(
            candles.map(async function(candle) {
                try {
                    //let smav = await v(candle.v, 20)
                    //let vtday = candle.v3
                    //let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
                    //let alpha = alph == NaN ? 0 : alph.toFixed(1)
                    let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
                        //console.log(mymyhist1)
                    let em = await ema.see(55, 55, candle.pip500)
                    let mymyhist = mymyhist1.histogram
                        //let mymysig = mymyhist1.signal
                    let mymymac = mymyhist1.macd
                   let b = await myrsi.rsi(candle.pip)
                    let stochs = await stochastic.stochRSI(candle.stochClose)
                    let K = stochs.k
                    let D = stochs.d
                    let renkobars = await renko(candle.forrenko)
                        //let c = await tulind.indicators.stoch.indicator([candle.val1, candle.val2, candle.val3], [14, 3, 3])
                        //console.log(c[1][14])
                        //console.log(a[2].length)
                        // if (voltesting(vtday, smav) && tickingfromnegative(mymyhist)) {
                        //     return `${candle.name}.T`
                        // } else if (voltesting(vtday, smav) && rsiLow(b)) {
                        //     return `${candle.name}.R`
                        // } else if (voltesting(vtday, smav) && (crossover(mymyhist) || histinc(mymyhist)) && mymymac[mymymac.length - 1] < 0) {
                        //     return `${candle.name}.M0`
                        // } else 
                        // if (voltesting(vtday, smav) && crossover(mymyhist)) {
                        //     return candle.name
                        // } else if (voltesting0(vtday, smav) && histinc(mymyhist)) {
                        //     return candle.name
                        // }
                        // if (crossover(mymyhist) && candle.pip500[candle.pip500.length - 1] > em.ema && candle.pip500[candle.pip500.length - 2] < em.ema) {

                    //     return `${alpha}${candle.name}`
                    // } else
                    if(renkobars[1][0] == '+'){
                        return {name:`${candle.name}`}
                    }
                    //  else if (candle.pip500[candle.pip500.length - 1] > em.ema && crossover(mymyhist)) {

                    //     return `${alpha}${candle.name}...`
                    // }

                } catch (err) {
                    console.log(err)
                }
                //return arr
            })).then((arr) => {
            //let r = []
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined) )  {
                    //console.log(5)
                    return a
                }
                //return r
            }))
        }).catch(err => console.log(err))
        //console.log(candles[0])
}

module.exports.founnd = async(size, volume, rs, eyoar) => {
    try {
        console.log(2)
        let a = await found(size, volume, rs, eyoar)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
    //console.log(a[0])
}

module.exports.founnd1 = async(size, volume, rs) => {
    try {
        console.log(2)
        let a = await found1(size, volume, rs)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
    //console.log(a[0])
}

module.exports.founnd2 = async(size, volume, rs, eyoar) => {
    try {
        console.log(2)
        let a = await found2(size, volume, rs, eyoar)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
    //console.log(a[0])
}

//https://forms.gle/hwuRPE7DSn6gR3nW6