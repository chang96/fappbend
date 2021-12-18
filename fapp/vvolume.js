// const allCoins = require("./volume")
// const axios  = require('axios')

const allCoins = require("../volume").volumeCheck
const axios = require("axios")
let find2 = async(size) => {
    let arr = []

    let eyoarr = await allCoins(50000000)
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

async function x(){
    const s = await find2('1d')
    return s.sort(function(a, b){
        return Number(b.volumeChange) - Number(a.volumeChange)
    })
}


function avg(arr){
    const l = arr.length
    const sum =  arr.reduce(function(a, b){
        return Number(a)+Number(b)
    }, 0)
    const av = sum/l
    return Math.ceil(av)
}



module.exports.f =  x
