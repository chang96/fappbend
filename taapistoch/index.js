const axios = require('axios')
    // const coin = 'ETHUSDT'
const RSI = require('../taapiRSI/index')
    // const time = '1w'
    // let close = axios.get(`https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${time}&limit=500`).
    // then(data => data.data).then(data => data.map(datum => (datum[4])));

let pushing = async function(ar, n) {
    async function s(ar, n) {
        let arr = await ar
        let sortArr = []
        let m = n - 1
        for (let i = 0; i < arr.length - m; i++) {
            await sortArr.push(arr.slice(i, (n + i)))
        }
        return sortArr
    }
    let aa = await s(ar, n)
    return aa
}

// const stochParams = async function(close) {
//     let clos = await close
//     let clo = [...clos]
//     const current = await RSI.rsi(clo)
//     let sortArr = await pushing(current, 14)
//         //currentRSI = current[current.length - 1]
//     return Promise.all(sortArr.map(async function(ar) {
//             let arr = await ar
//             let arr1 = [...arr]
//             currentRSI = await arr[arr.length - 1]
//             descendingRSI = await (arr.sort(async function(x, y) {
//                 let a = await x
//                 let b = await y
//                 return b - a
//             }))
//             console.log(descendingRSI[0], descendingRSI[descendingRSI.length - 1], arr1[arr1.length - 1])
//             console.log({ highest: await descendingRSI[0] / 100, lowest: await descendingRSI[descendingRSI.length - 1] / 100, currentRSI: await arr1[arr1.length - 1] / 100 })
//             return { highest: await descendingRSI[0] / 100, lowest: await descendingRSI[descendingRSI.length - 1] / 100, currentRSI: await arr1[arr1.length - 1] / 100 }
//         }))
//         // return stochs
// }

const stochParams = async function(close) {
    let clos = await close
    let clo = [...clos]
    const current = await RSI.rsi(clo)
    let sortArr = (await pushing(current, 14))
        //currentRSI = current[current.length - 1]
        //console.log(sortArr)
    let stochs = sortArr.map(function(arr) {
        currentRSI = arr[arr.length - 1]
        descendingRSI = arr.sort(function(a, b) {
                return b - a
            })
            //console.log({ highest: descendingRSI[0] / 100, lowest: descendingRSI[descendingRSI.length - 1] / 100, currentRSI: currentRSI / 100 })
        return { highest: descendingRSI[0] / 100, lowest: descendingRSI[descendingRSI.length - 1] / 100, currentRSI: currentRSI / 100 }
    })
    return stochs
}

let stoch = async function(close) {
    let k = []
    let d = []
    let clos = await close
    let stochParam = await stochParams(clos)
        // console.log(stochParam)
    let allStochs = Promise.all(stochParam.map(async function(para) {
            let param = await para
            let num = await param.currentRSI.toFixed(4) - await param.lowest.toFixed(4)
            let den = await param.highest.toFixed(4) - await param.lowest.toFixed(4)
            let a = await num / den
                //console.log(a)
            return a

        }))
        //console.log(await allStochs)
    async function p(allStoch) {
        let allStochs = await allStoch
        for (let i = 0; i < await allStochs.length - 2; i++) {
            let avg = await allStochs[i] + await allStochs[i + 1] + await allStochs[i + 2]
                //console.log(avg)
            await k.push((await avg) / 0.03)
        }
        for (let i = 0; i < await k.length - 2; i++) {
            let avg = await k[i] + await k[i + 1] + await k[i + 2]
                //console.log(avg)
            await d.push((await avg) / 3)
        }
        return { k: k.reverse(), d: d.reverse() }
    }
    let xx = await p(allStochs)
    return xx
}

module.exports = { stochRSI: stoch }