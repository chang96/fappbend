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
            let volumepush = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))
            let v3 = volumepush.slice(19, 26)
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

async function mymap (candle){
    let finalArr = []
    try {
        // let smav = await v(candle.v, 20)
        // let vtday = candle.v3
        // let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
        // let alpha = alph == NaN ? 0 : alph.toFixed(1)
        let currentPrice = candle.pip[candle.pip.length -1]
        let secondToTheLastPrice = candle.pip[candle.pip.length - 2]
        let acurrentPrice = candle.apip[candle.apip.length -1]
        let asecondToTheLastPrice = candle.apip[candle.apip.length -2]
        let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
        let em55 = await ema.see(55, 55, candle.pip500)
        let em99  = await ema.see(99, 99, candle.pip500)
        let em200 = await ema.see(200, 200, candle.pip500)
        let mymyhist = mymyhist1.histogram
        let mymymac = mymyhist1.macd
        let b = await myrsi.rsi(candle.pip)
        let stochs = await stochastic.stochRSI(candle.stochClose)
        let K = await stochs.k
        let D = await stochs.d
        let renkobars = await renko(candle.forrenko)
        let amymyhist1 = await mymacd.histogram(candle.apip100, candle.apip200)
        let aem55 = await ema.see(55, 55, candle.apip500)
        let aem99  = await ema.see(99, 99, candle.apip500)
        let aem200 = await ema.see(200, 200, candle.apip500)
        let amymyhist = mymyhist1.histogram
        let amymymac = mymyhist1.macd
        let ab = await myrsi.rsi(candle.apip)
        let astochs = await stochastic.stochRSI(candle.astochClose)
        let aK = await astochs.k
        let aD = await astochs.d
          


        if(renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'r++'})
        } 
        if(renkobars[1][0] == '+' && renkobars[1][1] == '-'){
            await  finalArr.push({name:`${candle.name}`, desc:'-r+'})
        }
        if(renkobars[1][0] == '-'){
            await finalArr.push({name:`${candle.name}`, desc:'r-'})
        } 
        if(renkobars[1][0] == '-' && renkobars[1][1] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'+r-'})
        }
        if(currentPrice >= em55 && secondToTheLastPrice < em55){
            await finalArr.push({name:`${candle.name}`, desc:'+em55'} )
        }
        if(currentPrice >= em99 && secondToTheLastPrice < em99 ){
            await finalArr.push({name:`${candle.name}`, desc:'+em99'} )
        }
        if(currentPrice >= em200 && secondToTheLastPrice < em200){
            await finalArr.push({name:`${candle.name}`, desc:'+em200'} )
        }
        if(currentPrice < em55 && secondToTheLastPrice >= em55 ){
            await finalArr.push({name:`${candle.name}`, desc:'-em55'} )
        }
        if(currentPrice < em99 && secondToTheLastPrice >= em99 ){
            await finalArr.push({name:`${candle.name}`, desc:'-em99'} )
        }
        if(currentPrice < em200 && secondToTheLastPrice >= em200 ){
            await finalArr.push({name:`${candle.name}`, desc:'-em200'}) 
        }
        if(K[0] >= D[0] && K[1] < D[1]){
            await finalArr.push({name:`${candle.name}`, desc:'+str'} )
        }
        if(K[0] >= D[0] && K[1] < D[1] && K[0] >= 50){
            await finalArr.push({name:`${candle.name}`, desc:'+str50'}) 
        }
        if(K[0] < D[0] && K[1] >= D[1]){
            await finalArr.push({name:`${candle.name}`, desc:'-str'} )
        }
        if(crossover(mymyhist)){
            await finalArr.push({name: `${candle.name}`, desc:'hist+'})
        }
        if(crossunder(mymyhist)){
            await finalArr.push({name: `${candle.name}`, desc: 'hist-'})
        }
        if(b <= 30 ){
            await  finalArr.push({name: `${candle.name}`, desc: '<rsi'})
        } 
        if(b >= 70 ){
            await finalArr.push({name: `${candle.name}`, desc: '>rsi'})
        } 

        
        if(acurrentPrice >= aem55 && asecondToTheLastPrice < aem55){
            await finalArr.push({name:`${candle.name}`, desc:'+aem55'} )
        }
        if(acurrentPrice >= aem99 && asecondToTheLastPrice < aem99 ){
            await finalArr.push({name:`${candle.name}`, desc:'+em99'} )
        }
        if(acurrentPrice >= aem200 && asecondToTheLastPrice < aem200){
            finalArr.push({name:`${candle.name}`, desc:'+aem200'} )
        }
        if(acurrentPrice < aem55 && asecondToTheLastPrice >= aem55 ){
            await finalArr.push({name:`${candle.name}`, desc:'-aem55'} )
        }
        if(acurrentPrice < em99 && asecondToTheLastPrice >= aem99 ){
            await finalArr.push({name:`${candle.name}`, desc:'-aem99'} )
        }
        if(acurrentPrice < aem200 && asecondToTheLastPrice >= aem200 ){
            await finalArr.push({name:`${candle.name}`, desc:'-aem200'}) 
        }
        if(aK[0] >= aD[0] && aK[1] < aD[1]){
            await finalArr.push({name:`${candle.name}`, desc:'+astr'} )
        }
        if(aK[0] >= aD[0] && aK[1] < aD[1] && aK[0] >= 50){
            await finalArr.push({name:`${candle.name}`, desc:'+astr50'}) 
        }
        if(aK[0] < aD[0] && aK[1] >= aD[1]){
            await finalArr.push({name:`${candle.name}`, desc:'-astr'} )
        }
        if(crossover(amymyhist)){
            await finalArr.push({name: `${candle.name}`, desc:'ahist+'})
        }
        if(crossunder(amymyhist)){
            await  finalArr.push({name: `${candle.name}`, desc: 'ahist-'})
        }
        if(ab <= 30 ){
            await finalArr.push( {name: `${candle.name}`, desc: '<arsi'})
        } 
        if(ab >= 70 ){
            await finalArr.push({name: `${candle.name}`, desc: '>arsi'})
        } 
    } catch (err) {
        console.log(err)
    }
//console.log(finalArr)
return finalArr
}


async function callCandles(fn, candles) {
    //let candles =  promisedCandles
    //console.log(candles)
    var finalAr = []
    await candles.forEach(async function(candle){
        let fa = await fn(candle)
       console.log(fa)
        finalAr.push(...fa)
    })
    console.log(finalAr)
    return finalAr
}
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
//bjvjkvg
function crossunder(arr){
    if (arr[arr.length - 1] < 0 && arr[arr.length - 2] >= 0) {
        //if (arr[arr.length - 1] < 0 && arr[arr.length - 1] > arr[arr.length - 2] && arr[arr.length - 2] < 0 && arr[arr.length - 2] > arr[arr.length - 3]) {
        return true
    }
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

function stochstrat(K, D) {
    if (K[0] >= D[0] && K[1] < D[1]) {
        return true
    } else if (K[0] >= D[0] && K[1] >= D[1] && K[2] < D[2]) {
        return true
    }
    
     else {
        return false
    }
}
let rgx1 = /BTC$/
let rgx2 = /ETH$/
let rgx3 = /USDT$/
let found = async(size, volume, rs, eyoar) => {
    let arr = []
    candles = await find2(size, volume, eyoar)
    return Promise.all(
            candles.map(async function(candle) {
                try {
                    let smav = await v(candle.v, 20)
                    let vtday = candle.v3
                    let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
                    let alpha = alph == NaN ? 0 : alph.toFixed(1)
                    let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
                    let em = await ema.see(55, 55, candle.pip500)
                    let mymyhist = mymyhist1.histogram
                    let mymymac = mymyhist1.macd
                   let b = await myrsi.rsi(candle.pip)
                   let stochs = await stochastic.stochRSI(candle.stochClose)
                    let K = stochs.k
                    let D = stochs.d
                    let renkobars = await renko(candle.forrenko)
                       
                        
                    
                    if(renkobars[1][0] == '+' &&renkobars[1][1] == '-' ){
                        return {name:`${candle.name}` }
                    }

                } catch (err) {
                    console.log(err)
                }
            })).then((arr) => {
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined) ) {
                    return a
                }
            }))
        }).catch(err => console.log(err))
}

let found1 = async(size, volume, rs) => {
    let arr = []
    let candles = await find1(size, volume)
    
    return Promise.all(callCandles(mymap, candles))
    // return Promise.all(
    //         candles.map(async function(candle) {
               
    //             try {
    //                 // let smav = await v(candle.v, 20)
    //                 // let vtday = candle.v3
    //                 // let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
    //                 // let alpha = alph == NaN ? 0 : alph.toFixed(1)
    //                 let currentPrice = candle.pip[candle.pip.length -1]
    //                 let secondToTheLastPrice = candle.pip[candle.pip.length - 2]
    //                 let acurrentPrice = candle.apip[candle.apip.length -1]
    //                 let asecondToTheLastPrice = candle.apip[candle.apip.length -2]
    //                 let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
    //                 let em55 = await ema.see(55, 55, candle.pip500)
    //                 let em99  = await ema.see(99, 99, candle.pip500)
    //                 let em200 = await ema.see(200, 200, candle.pip500)
    //                 let mymyhist = mymyhist1.histogram
    //                 let mymymac = mymyhist1.macd
    //                 let b = await myrsi.rsi(candle.pip)
    //                 let stochs = await stochastic.stochRSI(candle.stochClose)
    //                 let K = await stochs.k
    //                 let D = await stochs.d
    //                 let renkobars = await renko(candle.forrenko)
    //                 let amymyhist1 = await mymacd.histogram(candle.apip100, candle.apip200)
    //                 let aem55 = await ema.see(55, 55, candle.apip500)
    //                 let aem99  = await ema.see(99, 99, candle.apip500)
    //                 let aem200 = await ema.see(200, 200, candle.apip500)
    //                 let amymyhist = mymyhist1.histogram
    //                 let amymymac = mymyhist1.macd
    //                 let ab = await myrsi.rsi(candle.apip)
    //                 let astochs = await stochastic.stochRSI(candle.astochClose)
    //                 let aK = await astochs.k
    //                 let aD = await astochs.d
                       
                      


    //                 if(renkobars[1][0] == '+'){
    //                     return {name:`${candle.name}`, desc:'r++'} 
    //                 } 
    //                 if(renkobars[1][0] == '+' && renkobars[1][1] == '-'){
    //                     return {name:`${candle.name}`, desc:'-r+'} 
    //                 }
    //                 if(renkobars[1][0] == '-'){
    //                     return {name:`${candle.name}`, desc:'r-'} 
    //                 } 
    //                 if(renkobars[1][0] == '-' && renkobars[1][1] == '+'){
    //                     return {name:`${candle.name}`, desc:'+r-'} 
    //                 }
    //                 if(currentPrice >= em55 && secondToTheLastPrice < em55){
    //                     return {name:`${candle.name}`, desc:'+em55'} 
    //                 }
    //                 if(currentPrice >= em99 && secondToTheLastPrice < em99 ){
    //                     return {name:`${candle.name}`, desc:'+em99'} 
    //                 }
    //                 if(currentPrice >= em200 && secondToTheLastPrice < em200){
    //                     return {name:`${candle.name}`, desc:'+em200'} 
    //                 }
    //                 if(currentPrice < em55 && secondToTheLastPrice >= em55 ){
    //                     return {name:`${candle.name}`, desc:'-em55'} 
    //                 }
    //                 if(currentPrice < em99 && secondToTheLastPrice >= em99 ){
    //                     return {name:`${candle.name}`, desc:'-em99'} 
    //                 }
    //                 if(currentPrice < em200 && secondToTheLastPrice >= em200 ){
    //                     return {name:`${candle.name}`, desc:'-em200'} 
    //                 }
    //                 if(K[0] >= D[0] && K[1] < D[1]){
    //                     return {name:`${candle.name}`, desc:'+str'} 
    //                 }
    //                 if(K[0] >= D[0] && K[1] < D[1] && K[0] >= 50){
    //                     return {name:`${candle.name}`, desc:'+str50'} 
    //                 }
    //                 if(K[0] < D[0] && K[1] >= D[1]){
    //                     return {name:`${candle.name}`, desc:'-str'} 
    //                 }
    //                 if(crossover(mymyhist)){
    //                     return {name: `${candle.name}`, desc:'hist+'}
    //                 }
    //                 if(crossunder(mymyhist)){
    //                     return {name: `${candle.name}`, desc: 'hist-'}
    //                 }
    //                 if(b <= 30 ){
    //                     return {name: `${candle.name}`, desc: '<rsi'}
    //                 } 
    //                 if(b >= 70 ){
    //                     return {name: `${candle.name}`, desc: '>rsi'}
    //                 } 

                    
    //                 if(acurrentPrice >= aem55 && asecondToTheLastPrice < aem55){
    //                     return {name:`${candle.name}`, desc:'+aem55'} 
    //                 }
    //                 if(acurrentPrice >= aem99 && asecondToTheLastPrice < aem99 ){
    //                     return {name:`${candle.name}`, desc:'+em99'} 
    //                 }
    //                 if(acurrentPrice >= aem200 && asecondToTheLastPrice < aem200){
    //                     return {name:`${candle.name}`, desc:'+aem200'} 
    //                 }
    //                 if(acurrentPrice < aem55 && asecondToTheLastPrice >= aem55 ){
    //                     return {name:`${candle.name}`, desc:'-aem55'} 
    //                 }
    //                 if(acurrentPrice < em99 && asecondToTheLastPrice >= aem99 ){
    //                     return {name:`${candle.name}`, desc:'-aem99'} 
    //                 }
    //                 if(acurrentPrice < aem200 && asecondToTheLastPrice >= aem200 ){
    //                     return {name:`${candle.name}`, desc:'-aem200'} 
    //                 }
    //                 if(aK[0] >= aD[0] && aK[1] < aD[1]){
    //                     return {name:`${candle.name}`, desc:'+astr'} 
    //                 }
    //                 if(aK[0] >= aD[0] && aK[1] < aD[1] && aK[0] >= 50){
    //                     return {name:`${candle.name}`, desc:'+astr50'} 
    //                 }
    //                 if(aK[0] < aD[0] && aK[1] >= aD[1]){
    //                     return {name:`${candle.name}`, desc:'-astr'} 
    //                 }
    //                 if(crossover(amymyhist)){
    //                     return {name: `${candle.name}`, desc:'ahist+'}
    //                 }
    //                 if(crossunder(amymyhist)){
    //                     return {name: `${candle.name}`, desc: 'ahist-'}
    //                 }
    //                 if(ab <= 30 ){
    //                     return {name: `${candle.name}`, desc: '<arsi'}
    //                 } 
    //                 if(ab >= 70 ){
    //                     return {name: `${candle.name}`, desc: '>arsi'}
    //                 } 
    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         }))
            
            .then((arr) => {
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined)) {
                    return a
                }
            }))
        }).catch(err => console.log(err))
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
                        
                    let em = await ema.see(55, 55, candle.pip500)
                    let mymyhist = mymyhist1.histogram
                    let mymymac = mymyhist1.macd
                   let b = await myrsi.rsi(candle.pip)
                    let stochs = await stochastic.stochRSI(candle.stochClose)
                    let K = stochs.k
                    let D = stochs.d
                    let renkobars = await renko(candle.forrenko)
                       
                    if(renkobars[1][0] == '+'){
                        return {name:`${candle.name}`}
                    }

                } catch (err) {
                    console.log(err)
                }
            })).then((arr) => {
            return Promise.all(arr.filter(function(a) {
                if ((a !== undefined) )  {
                    return a
                }
            }))
        }).catch(err => console.log(err))
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
}

//https://forms.gle/hwuRPE7DSn6gR3nW6