const axios = require('axios')
    // const coin = 'ETHUSDT'
const RSI = require('../taapiRSI/index')
    // const time = '1w'
    // let close = axios.get(`https://api.binance.com/api/v3/klines?symbol=${coin}&interval=${time}&limit=500`).
    // then(data => data.data).then(data => data.map(datum => (datum[4])));

    async function pushing(ar, n) {
    let arr = await ar
    let sortArr = []
    let m = n - 1
    for (let i = 0; i < arr.length - m; i++) {
        sortArr.push(arr.slice(i, (n + i)))
    }
    return sortArr
}

    async function stochParams(close) {
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

    async function stoch(close) {
    let k = []
    let d = []
    let clos = await close
    let stochParam = await stochParams(clos)
        // console.log(stochParam)
    let allStochs = stochParam.map(function(param) {
        let num = param.currentRSI.toFixed(4) - param.lowest.toFixed(4)
        let den = param.highest.toFixed(4) - param.lowest.toFixed(4)
        return num / den

    })
    for (let i = 0; i < allStochs.length - 2; i++) {
        let avg = allStochs[i] + allStochs[i + 1] + allStochs[i + 2]
        k.push((avg * 100) / 3)
    }
    for (let i = 0; i < k.length - 2; i++) {
        let avg = k[i] + k[i + 1] + k[i + 2]
        d.push((avg) / 3)
    }
    return { k: k, d: d }
}

module.exports = { stochRSI: stoch }