//const diff = require('./emadiff')
const ema = require('../ema/ema')
module.exports.signal = async(diff) => {
    try {
        // let macd = await diff
        // let sig = await ema.minus1226(9, 9, macd)

        // let macd1 = await diff
        let [macd, macd1, sig] = await Promise.all([diff, diff, ema.minus1226(9, 9, macd)])
            //console.log(macd1.length)
        sig.emaarr.splice(0, 1)
        let a = macd1.map(function(mac, i) {
            return mac - sig.emaarr[i]
        })

        return a
            //console.log(sig)
    } catch (err) {
        console.log(err)
    }
}