const ema12 = require('../ema/ema')

module.exports.t12 = async(coindata12) => {
    try {
        let twelve = await ema12.see(12, 12, coindata12)
        return twelve
    } catch (err) {
        console.log(err)
    }
}