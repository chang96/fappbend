const ema26 = require('../ema/ema26')


module.exports.t26 = async(coindata26) => {
    try {
        let twentysix = await ema26.see(12, 12, coindata26)
        return twentysix
    } catch (err) {
        console.log(err)
    }
}