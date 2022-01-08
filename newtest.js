require('dotenv').config()
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
const rha = require('./rHA')
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
            let bars = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo.symbol}&interval=${size}&limit=1000`).
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
            let qv = eyo.volume // quote volume in usdt
            let volumepush = [...bars].map(datum => (datum[5]))//await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            // then(data => data.data).then(data => data.map(datum => (datum[5])))
            let v3 = volumepush.slice(19, 26)
            
            let xbars = [...volumepush]
            xbars.splice(0, 899)
            let volumepushx = [...xbars]
            // let volumepush = [...volumepushx]
            let volumepush1h = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo.symbol}&interval=1h&limit=25`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))

            let volumepush7d = [...volumepushx.slice(82, 89)]
            let thisWeek = volumepush7d[6]
            volumepush7d.pop()
            let average = avg(volumepush7d)
            const volumeChange7d = (Number(thisWeek) - average )/ average

            let volumepush30d = [...volumepushx.slice(59, 89)]
            let thirtieth = volumepush30d[29]
            volumepush30d.pop()
            let average30d = avg(volumepush30d)
            const volumeChange30d = (Number(thirtieth) - average30d )/ average30d

            let volumepush90d = [...volumepushx]
            let ninetieth = volumepush90d[89]
            volumepush90d.pop()
            let average90d = avg(volumepush90d)
            const volumeChange90d = (Number(ninetieth) - average90d)/ average90d

            const volumeChange1h = (Number(volumepush1h[24]) - Number(volumepush1h[0])) / Number(volumepush1h[0])
            

            const volumeChange = (Number(volumepush[volumepush.length - 1]) - Number(volumepush[volumepush.length - 2])) / Number(volumepush[volumepush.length - 2])
            

            return { name: eyo.symbol, pip100: close100, pip200: close200, pip: close400, v: volumepush, v3: v3, pip500: close500, stochClose: stochClose, forrenko:bars,
                apip100: aclose100, apip200: aclose200, apip: aclose400, apip500: aclose500, astochClose: astochClose,qv: qv, 
                volumeChange: Math.ceil(volumeChange*100), volumeChange1h: Math.ceil(volumeChange1h*100), volumeChange7d: Math.ceil(volumeChange7d*100), volumeChange30d: Math.ceil(volumeChange30d*100), volumeChange90d: Math.ceil(volumeChange90d*100), // pip100: close100,  v: volumepush,
                total_volume: Math.ceil(Number(v3[v3.length -1]) )
            }
        })).catch(err => console.log(err))

}
let find = async(size, volume) => {
    // console.log(4)
    let arr = []
    let eyoarr = await eyo.volumeCheck(volume)
        //let eyoarr = eyoar
    return Promise.all(
        eyoarr.map(async function(eyo) {
            let bars = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo.symbol}&interval=${size}&limit=1000`).
            then(data => (data.data))
            let forHa = [...bars]
            let ashi = await rha.HeikinAshi(forHa)
            let aclose300 =await (ashi.map(datum => (datum[4])))
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
            let qv = eyo.volume // quote volume in usdt
            let volumepush = [...bars].map(datum => (datum[5]))//await axios.get(`https://api.binance.com/api/v3/klines?symbol=${eyo}&interval=${size}&limit=26`).
            // then(data => data.data).then(data => data.map(datum => (datum[5])))
            let v3 = volumepush.slice(19, 26)
            return { name: eyo.symbol, pip100: close100, pip200: close200, pip: close400, v: volumepush, v3: v3, pip500: close500, stochClose: stochClose, forrenko:[...ashi],
                apip100: aclose100, apip200: aclose200, apip: aclose400, apip500: aclose500, astochClose: astochClose,qv: qv
            }
        })).catch(err => console.log(err))

}


let find4 = async(size, volume) => {
    let arr = []

    let eyoarr = await eyo.volumeCheck(volume)
    // console.log(eyoarr)
    return Promise.all(
        eyoarr.map(async function(eyo) {
            // let bars = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo.symbol}&interval=${size}&limit=500`).
            // then(data => (data.data))
            // // let open300 = await (bars.map(datum => (datum[1])))
            // // let high300 = await (bars.map(datum => (datum[2])))
            // // let low300 = await 
         
            // let close300 = await (bars.map(datum => (datum[4])))
            // let close100 = [...close300]
            // let close200 = [...close300]
            // let close400 = [...close300]
            // let close500 = [...close300]
            // let stochClose = [...close300]
            let volumepushx = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo.symbol}&interval=${size}&limit=90`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))
            let volumepush = [...volumepushx]
            let volumepush1h = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${eyo.symbol}&interval=1h&limit=25`).
            then(data => data.data).then(data => data.map(datum => (datum[5])))

            let volumepush7d = [...volumepushx.slice(82, 89)]
            let thisWeek = volumepush7d[6]
            volumepush7d.pop()
            let average = avg(volumepush7d)
            const volumeChange7d = (Number(thisWeek) - average )/ average

            let volumepush30d = [...volumepushx.slice(59, 89)]
            let thirtieth = volumepush30d[29]
            volumepush30d.pop()
            let average30d = avg(volumepush30d)
            const volumeChange30d = (Number(thirtieth) - average30d )/ average30d

            let volumepush90d = [...volumepushx]
            let ninetieth = volumepush90d[89]
            volumepush90d.pop()
            let average90d = avg(volumepush90d)
            const volumeChange90d = (Number(ninetieth) - average90d)/ average90d

            const volumeChange1h = (Number(volumepush1h[24]) - Number(volumepush1h[0])) / Number(volumepush1h[0])
            

            const volumeChange = (Number(volumepush[volumepush.length - 1]) - Number(volumepush[volumepush.length - 2])) / Number(volumepush[volumepush.length - 2])
            
            let v3 = volumepush.slice(19, 26)
            return { name: eyo.symbol, v3: v3, volumeChange: Math.ceil(volumeChange*100), volumeChange1h: Math.ceil(volumeChange1h*100), volumeChange7d: Math.ceil(volumeChange7d*100), volumeChange30d: Math.ceil(volumeChange30d*100), volumeChange90d: Math.ceil(volumeChange90d*100), // pip100: close100,  v: volumepush,
                total_volume: Math.ceil(Number(v3[v3.length -1]) )
            }
        })).catch(err => console.log(err))

}


async function mymap (candle, size){
    let finalArr = []
    const smallTime = ['5m', '15m', '30m']
    const bigTime = ['1h', '2h', '4h', '1d', '1w']
    try {
        // let smav = await v(candle.v, 20)
        // let vtday = candle.v3
        // let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
        // let alpha = alph == NaN ? 0 : alph.toFixed(1) //
        let qv = candle.qv
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
        let b = await myrsi.rsi(candle.pip, 14)
        let stochs = await stochastic.stochRSI(candle.stochClose, 14)
        let K = await stochs.k
        let D = await stochs.d
        let b6 = await myrsi.rsi(candle.pip, 6)
        let stochs6 = await stochastic.stochRSI(candle.stochClose, 6)
        let K6 = await stochs6.k
        let D6 = await stochs6.d
        
        let renkobars = await renko(candle.forrenko)
        let renkobars00s = [...renkobars[2]]
        let renkobars000 = [...renkobars[2]]
        let renkobars100 = [...renkobars[2]]
        let renkobars200 = [...renkobars[2]]
        let renkobars300 = [...renkobars[2]]
        let rmymyhist1 = await mymacd.histogram(renkobars100, renkobars200)  
        let rcurrentPrice = renkobars100[renkobars100.length -1]
        let rsecondToTheLastPrice = renkobars100[ renkobars100.length - 2 ]
        let rem20 = await ema.see(20, 20, renkobars300)
        let rem55 = await ema.see(55, 55, renkobars300)
        let rmymyhist = rmymyhist1.histogram
        let rb = await myrsi.rsi(renkobars000,14)
        let rstochs = await stochastic.stochRSI(renkobars00s,14)
        let rK = await rstochs.k
        let rD = await rstochs.d
        let amymyhist1 = await mymacd.histogram(candle.apip100, candle.apip200)
        let aem55 = await ema.see(55, 55, candle.apip500)
        let aem99  = await ema.see(99, 99, candle.apip500)
        let aem200 = await ema.see(200, 200, candle.apip500)
        let amymyhist = amymyhist1.histogram
        let amymymac = amymyhist1.macd
        let ab = await myrsi.rsi(candle.apip, 14)
        let astochs = await stochastic.stochRSI(candle.astochClose, 14)
        let aK = await astochs.k
        let aD = await astochs.d
        let ab6 = await myrsi.rsi(candle.apip, 6)
        let astochs6 = await stochastic.stochRSI(candle.astochClose, 6)
        let aK6 = await astochs6.k
        let aD6 = await astochs6.d

        await finalArr.push({name:`${candle.name}`, desc:"fapp", volumeChange: candle.volumeChange,volumeChange1h: candle.volumeChange1h,
        volumeChange7d:candle.volumeChange7d, volumeChange30d: candle.volumeChange30d, volumeChange90d:candle.volumeChange90d, total_volume:candle.total_volume
    })

        if(bigTime.indexOf(size) !== -1){
            //crossing up from a given stoch
            if(xstochStrat(rK, rD, 15) && renkobars[1][0] == '+' ){
                await finalArr.push({name:`${candle.name}`, desc: 'rbplus', volume: qv})
            }
            if(xstochStrat(aK, aD)){
                await finalArr.push({name:`${candle.name}`, desc: 'abplus', volume: qv})
            }
        }

        if(smallTime.indexOf(size) > -1){
            if(lowRSI(rb, 33, 7) === true && lowRSI(ab, 30, 9) === true && stochstrat(aK, aD) && aK[0] >= 20 ){
                await finalArr.push({name: candle.name, desc: 'xlowrsiplusstoch', volume: qv})
            }
        }


        if(renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'r++', volume: qv})
        } 
        if(renkobars[1][0] == '+' && renkobars[1][1] == '-'){
            await  finalArr.push({name:`${candle.name}`, desc:'-r+', volume: qv})
        }
        if(renkobars[1][0] == '-'){
            await finalArr.push({name:`${candle.name}`, desc:'r--', volume: qv})
        } 
        if(renkobars[1][0] == '-' && renkobars[1][1] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'+r-', volume: qv})
        }
        if(renkobars[1][0] == '+' && renkobars[1][1] == '-' && rK[0] >= 20){
            await finalArr.push({name:`${candle.name}`, desc: 'xr15', volume: qv})
        }
        if(renkobars[1][0] == '+' && renkobars[1][1] == '-' && rK[0] >= 1){
            await finalArr.push({name:`${candle.name}`, desc: 'xr1', volume: qv})
        }
        if(rcurrentPrice >= rem20.ema && rsecondToTheLastPrice < rem20.ema && getSome([...renkobars[2]], rem20.ema, 3, 7, 'up')){ //rsecondToTheLastPrice < rem20
            await finalArr.push({name:`${candle.name}`, desc:'rem20+', volume: qv} )
        }
        if(rcurrentPrice >= rem55.ema && rsecondToTheLastPrice < rem55.ema && getSome([...renkobars[2]], rem55.ema, 3, 7, 'up')){//&& rsecondToTheLastPrice < rem55
            await finalArr.push({name:`${candle.name}`, desc:'rem55+', volume: qv} )
        } 
        if(rK[0] >= rD[0] && rK[1] < rD[1] && renkobars[1][0] == '+' ){
            await finalArr.push({name:`${candle.name}`, desc:'rstr+', volume: qv} )
        }
        if(rK[0] >= rD[0] && rK[1] < rD[1] && rK[0] >= 10 && renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'rstr10+', volume: qv}) 
        }
        if(rK[0] >= rD[0] && rK[1] < rD[1] && rK[0] >= 20 && renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'rstr20+', volume: qv}) 
        }
        if(rK[0] >= rD[0] && rK[1] < rD[1] && rK[0] >= 10 && rK[0] <= 80 && renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'rstr1080+', volume: qv}) 
        }
        if(rK[0] >= rD[0] && rK[1] < rD[1] && rK[0] >= 10 && rK[0] <= 90 && renkobars[1][0] == '+'){
            await finalArr.push({name:`${candle.name}`, desc:'rstr1090+', volume: qv}) 
        }
        if(crossover(rmymyhist) && renkobars[1][0] == '+'){
            await finalArr.push({name: `${candle.name}`, desc:'rhist+', volume: qv})
        }
        if(histinc(rmymyhist)){
            await finalArr.push({name: candle.name, desc: 'rhistickup', volume: qv})
        }
        if(crossunder(rmymyhist)){
            await finalArr.push({name: `${candle.name}`, desc: 'rhist-', volume: qv})
        }
        if(rb[rb.length - 1] <= 30 ){
            await  finalArr.push({name: `${candle.name}`, desc: 'rrsi-', volume: qv})
        } 
        if(rb[rb.length - 1] > 30 ){
            await finalArr.push({name: `${candle.name}`, desc: 'rrsi+', volume: qv})
        } 
        if(lowRSI(rb, 30, 7)== true && renkobars[1][0] == '+' && renkobars[1][1] == '-' && rK[0] >= 20 ){
            if(lowRSI(rb, 25, 7)== true && renkobars[1][0] == '+' && renkobars[1][1] == '-' && rK[0] >= 20 ){
                if(lowRSI(rb, 20, 7)== true && renkobars[1][0] == '+' && renkobars[1][1] == '-' && rK[0] >= 20 ){
                    await finalArr.push({name: candle.name, desc: 'rrsistoch<20', volume: qv})
                } else {
                    await finalArr.push({name: candle.name, desc: 'rrsistoch<25', volume: qv})
                }
            } else {
                await finalArr.push({name: candle.name, desc: 'rrsistoch<30', volume: qv})
            }
            
        } 
        if(lowRSI(rb, 25, 7) ){
            if(lowRSI(rb, 20, 7) ){
                    await finalArr.push({name: candle.name, desc: 'rrsi<20', volume: qv})
                }
             else {
                await finalArr.push({name: candle.name, desc: 'rrsi<25', volume: qv})
            }     
        } 

        if(currentPrice >= em55.ema && secondToTheLastPrice < em55.ema && getSome([...candle.pip], em55.ema, 3, 13, 'up')){
            await finalArr.push({name:`${candle.name}`, desc:'em55+', volume: qv} )
        }
        if(currentPrice >= em99.ema && secondToTheLastPrice < em99.ema && getSome([...candle.pip], em99.ema, 3, 13, 'up') ){
            await finalArr.push({name:`${candle.name}`, desc:'em99+', volume: qv} )
        }
        if(currentPrice >= em200.ema && secondToTheLastPrice < em200.ema && getSome([...candle.pip], em200.ema, 3, 13, 'up') ){
            await finalArr.push({name:`${candle.name}`, desc:'em200+', volume: qv} )
        }
        if(currentPrice < em55.ema && secondToTheLastPrice >= em55.ema && getSome([...candle.pip], em55.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'em55-', volume: qv} )
        }
        if(currentPrice < em99.ema && secondToTheLastPrice >= em99.ema && getSome([...candle.pip], em99.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'em99-', volume: qv} )
        }
        if(currentPrice < em200.ema && secondToTheLastPrice >= em200.ema && getSome([...candle.pip], em200.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'em200-', volume: qv}) 
        }
        if(K[0] >= D[0] && K[1] < D[1]){
            await finalArr.push({name:`${candle.name}`, desc:'str+', volume: qv} )
        }
        if(K[0] >= D[0] && K[1] < D[1] && K[0] >= 50){
            await finalArr.push({name:`${candle.name}`, desc:'str50+', volume: qv}) 
        }
        if(K[0] < D[0] && K[1] >= D[1]){
            await finalArr.push({name:`${candle.name}`, desc:'str-', volume: qv} )
        }
        if(K6[0] <= 1 ){
            await finalArr.push({name:`${candle.name}`, desc:'6str0', volume: qv} )
        }
        if(b6[b6.length -1] < 30 ){
            await finalArr.push({name: `${candle.name}`, desc: '6rsi0', volume: qv})
        } 
        if(crossover(mymyhist)){
            await finalArr.push({name: `${candle.name}`, desc:'hist+', volume: qv})
        }
        if(crossunder(mymyhist)){
            await finalArr.push({name: `${candle.name}`, desc: 'hist-', volume: qv})
        }
        if(histinc(mymyhist)){
            await finalArr.push({name: candle.name, desc: 'histickup', volume: qv})
        }
        if(b[b.length -1] <= 30 ){
            await  finalArr.push({name: `${candle.name}`, desc: 'rsi-', volume: qv})
        } 
        if(b[b.length -1] > 30 ){
            await finalArr.push({name: `${candle.name}`, desc: 'rsi+', volume: qv})
        } 

        
        if(acurrentPrice >= aem55.ema && asecondToTheLastPrice < aem55.ema && getSome([...candle.apip], aem55.ema, 3, 13, 'up') ){
            await finalArr.push({name:`${candle.name}`, desc:'aem55+', volume: qv} )
        }
        if(acurrentPrice >= aem99.ema && asecondToTheLastPrice < aem99.ema && getSome([...candle.apip], aem99.ema, 3, 13, 'up') ){
            await finalArr.push({name:`${candle.name}`, desc:'aem99+', volume: qv} )
        }
        if(acurrentPrice >= aem200.ema && asecondToTheLastPrice < aem200.ema && getSome([...candle.apip], aem200.ema, 3, 13, 'up') ){
            finalArr.push({name:`${candle.name}`, desc:'aem200+', volume: qv} )
        }
        if(acurrentPrice < aem55.ema && asecondToTheLastPrice >= aem55.ema && getSome([...candle.apip], aem55.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'aem55-', volume: qv} )
        }
        if(acurrentPrice < em99.ema && asecondToTheLastPrice >= aem99.ema && getSome([...candle.apip], aem99.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'aem99-', volume: qv} )
        }
        if(acurrentPrice < aem200.ema && asecondToTheLastPrice >= aem200.ema && getSome([...candle.apip], aem200.ema, 3, 13, 'down') ){
            await finalArr.push({name:`${candle.name}`, desc:'aem200-', volume: qv}) 
        }
        if(stochstrat(aK, aD)){
            await finalArr.push({name:`${candle.name}`, desc:'astr+', volume: qv} )
        }
        if(stochstrat(aK, aD) && aK[0] >= 20){
            await finalArr.push({name:`${candle.name}`, desc:'astr20+', volume: qv}) 
        }
        if(stochstrat(aK, aD) && aK[0] >= 40 && aK[0] <= 80 ){
            await finalArr.push({name:`${candle.name}`, desc:'astr4080+', volume: qv}) 
        }
        if(stochstrat(aK, aD) && aK[0] >= 10 && aK[0] <= 90 ){
            await finalArr.push({name:`${candle.name}`, desc:'astr1090+', volume: qv}) 
        }
        if(aK[0] < aD[0] && aK[1] >= aD[1]){
            await finalArr.push({name:`${candle.name}`, desc:'astr-', volume: qv} )
        }
        if(aK6[0] <= 1 ){
            await finalArr.push({name:`${candle.name}`, desc:'a6str0', volume: qv} )
        }
        if(ab6[ab6.length -1] < 30 ){
            await finalArr.push({name: `${candle.name}`, desc: 'a6rsi0', volume: qv})
        } 
        if(crossover(amymyhist)){
            await finalArr.push({name: `${candle.name}`, desc:'ahist+', volume: qv})
        }
        if(crossunder(amymyhist)){
            await  finalArr.push({name: `${candle.name}`, desc: 'ahist-', volume: qv})
        }
        if(histinc(amymyhist)){
            await finalArr.push({name: candle.name, desc: 'ahistickup', volume: qv})
        }
        if(ab[ab.length - 1] <= 30 ){
            await finalArr.push( {name: `${candle.name}`, desc: 'arsi-', volume: qv})
        } 
        if(ab[ab.length - 1] > 30 ){
            await finalArr.push({name: `${candle.name}`, desc: 'arsi+', volume: qv})
        }
        if(lowRSI(ab, 35, 10)){
            await finalArr.push({name: `${candle.name}`, desc: 'lowrsi', volume: qv})
        }
        if(lowRSI(ab, 35, 10) && stochstrat(aK, aD) && aK[0] >= 20 ){
            await finalArr.push({name: `${candle.name}`, desc: 'lowrsiplusstoch', volume: qv})
        }
        if(lowRSI(ab, 30, 10) == true && stochstrat(aK, aD) && aK[0] >= 20){
            if(lowRSI(ab, 25, 10) == true && stochstrat(aK, aD) && aK[0] >= 20){
                if(lowRSI(ab, 20, 10) == true && stochstrat(aK, aD) && aK[0] >= 20){
                    await finalArr.push({name: candle.name, desc: 'arsistoch<20', volume: qv})
                } else {
                    await finalArr.push({name: candle.name, desc: 'arsistoch<25', volume: qv})
                }
            } else {
                await finalArr.push({name: candle.name, desc: 'arsistoch<30', volume: qv})
            }
            
        } 
        if(lowRSI(ab, 25, 10) == true ){
            if(lowRSI(ab, 20, 10) == true){
                    await finalArr.push({name: candle.name, desc: 'arsi<20', volume: qv})
                }
             else {
                await finalArr.push({name: candle.name, desc: 'arsi<25', volume: qv})
            }     
        } 
       
    } catch (err) {
        console.log(err)
    }
//console.log(finalArr)
return finalArr
}


async function callCandles(fn, candles, size) {
    //let candles =  promisedCandles
    let finalAr = []
    for(let i =0; i<candles.length; i++){
        if(i === candles.length - 1){
            let fa = await fn(candles[i], size)
            await finalAr.push(...fa)
            return finalAr
        } 
        let fa = await fn(candles[i], size)
        await finalAr.push(...fa)

    }
    // await candles.forEach(async function(candle){
    //     let fa = await fn(candle)
    //   await finalAr.push(...fa)
        
    // })
//   return Promise.all(finalAr).catch(e=> console.log(e))
}


function avg(arr){
    const l = arr.length
    const sum =  arr.reduce(function(a, b){
        return Number(a)+Number(b)
    }, 0)
    const av = sum/l
    return Math.ceil(av)
}

function getSome (arr, param, start, end, direction){
    if (direction === 'up'){
        return arr.reverse().slice(start, end).every(candle=> candle < param)
    } else {
        return arr.reverse().slice(start, end).every(candle=> candle > param)
    }
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

function histinc(arr) {
    if (arr[arr.length - 1] <= 0 && arr[arr.length - 1] > arr[arr.length - 2]  && arr[arr.length - 2] > arr[arr.length - 3]) { //arr[arr.length - 1] >= 0 &&
        return true
    } else {
        return false
    }
}

function lowRSI(arr, cap, lookback){
    return [...arr].reverse().slice(0, lookback).some(function(rsi){
        return rsi <= cap
    })
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
function xstochStrat (K, D, cap = 20){
    var result
    for(let i = 0; i < K.length; i++){
        //console.log(K[i] > D[i])
        if(K[0] < D[0]) return false
        if(K[i] >= D[i] && K[i+1] <= D[i+1] && K[i]>=cap){
            //console.log(K[i] > D[i] && K[i-1] < D[i-1] && K[i]>=cap, i, '+')
            return true
        }
        
        if(K[i] > D[i] && K[i+1] < D[i+1] && K[i]<cap){
            //console.log(K[i] > D[i] && K[i-1] < D[i-1] && K[i]<cap, i, '-')
            return false
        }
        if(i == 25)
        return false

    }
}
let rgx1 = /BTC$/
let rgx2 = /ETH$/
let rgx3 = /USDT$/
let found = async(size, volume, rs, eyoar) => {
    try{
    let arr = []
    candles = await find2(size, volume, eyoar)
    let r = await callCandles(mymap, candles, size)
    return r
    } catch(e){
        console.log(e)
    }
    // return Promise.all(
    //         candles.map(async function(candle) {
    //             try {
    //                 let smav = await v(candle.v, 20)
    //                 let vtday = candle.v3
    //                 let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
    //                 let alpha = alph == NaN ? 0 : alph.toFixed(1)
    //                 let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
    //                 let em = await ema.see(55, 55, candle.pip500)
    //                 let mymyhist = mymyhist1.histogram
    //                 let mymymac = mymyhist1.macd
    //                let b = await myrsi.rsi(candle.pip)
    //                let stochs = await stochastic.stochRSI(candle.stochClose)
    //                 let K = stochs.k
    //                 let D = stochs.d
    //                 let renkobars = await renko(candle.forrenko)
                       
                        
                    
    //                 if(renkobars[1][0] == '+' &&renkobars[1][1] == '-' ){
    //                     return {name:`${candle.name}` }
    //                 }

    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         })).then((arr) => {
    //         return Promise.all(arr.filter(function(a) {
    //             if ((a !== undefined) ) {
    //                 return a
    //             }
    //         }))
    //     }).catch(err => console.log(err))
}

let found1 = async(size, volume, rs) => {
   try{
    let arr = []
    let candles = await find1(size, volume)
    let r = await callCandles(mymap, candles, size)
   // console.log(r)
    return r
   }catch(e){
       console.log(e)
    }
   
}

let found2 = async(size, volume, rs) => {
    try{
        let arr = []
        let candles = await find(size, volume,)
        let r = await callCandles(mymap, candles, size)
        return r
    } catch(e){
        console.log(e)
    }

    
    let found4 = async(size, volume, rs) => {
        try{
         let arr = []
         let candles = await find4(size, volume)
         let r = await callCandles(mymap, candles, size)
        // console.log(r)
         return r
        }catch(e){
            console.log(e)
         }
        
     }
    // return Promise.all(
    //         candles.map(async function(candle) {
    //             try {
    //                 //let smav = await v(candle.v, 20)
    //                 //let vtday = candle.v3
    //                 //let alph = vtday[vtday.length - 1] / smav[smav.length - 1]
    //                 //let alpha = alph == NaN ? 0 : alph.toFixed(1)
    //                 let mymyhist1 = await mymacd.histogram(candle.pip100, candle.pip200)
                        
    //                 let em = await ema.see(55, 55, candle.pip500)
    //                 let mymyhist = mymyhist1.histogram
    //                 let mymymac = mymyhist1.macd
    //                let b = await myrsi.rsi(candle.pip)
    //                 let stochs = await stochastic.stochRSI(candle.stochClose)
    //                 let K = stochs.k
    //                 let D = stochs.d
    //                 let renkobars = await renko(candle.forrenko)
                       
    //                 if(renkobars[1][0] == '+'){
    //                     return {name:`${candle.name}`}
    //                 }

    //             } catch (err) {
    //                 console.log(err)
    //             }
    //         })).then((arr) => {
    //         return Promise.all(arr.filter(function(a) {
    //             if ((a !== undefined) )  {
    //                 return a
    //             }
    //         }))
    //     }).catch(err => console.log(err))
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

module.exports.founnd2 = async(size, volume, rs) => {
    try {
        console.log(2)
        let a = await found2(size, volume, rs)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
}

module.exports.founnd4 = async(size, volume, rs) => {
    try {
        console.log(2)
        let a = await found4(size, volume, rs)
        console.log(a)
        return a
    } catch (err) {
        console.log(err)
    }
}


//https://forms.gle/hwuRPE7DSn6gR3nW6