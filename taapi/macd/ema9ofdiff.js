//const diff = require('./emadiff')
const ema = require('../ema/ema')
module.exports.signal = async(diff) => {
    let macd = await diff
    let sig = await ema.minus1226(9, 9, macd)

    let macd1 = await diff
        //console.log(macd1.length)
    sig.emaarr.splice(0, 1)
    let a = macd1.map(function(mac, i) {
        return mac - sig.emaarr[i]
    })

    return a
        //console.log(sig)
}