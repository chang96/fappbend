const ema12 = require('../ema/ema')

module.exports.t12 = async(coindata12) => {
    try {
        let a = await coindata12
            //a.splice(488, 12)
            //console.log('12:', a.length)
        let twelve = await ema12.see(12, 12, a)
        return twelve
    } catch (err) {
        console.log(err)
    }
}