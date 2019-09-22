const ema26 = require('../ema/ema26')


module.exports.t26 = async(coindata26) => {
    try {
        let a = await coindata26
            // console.log(a.length)
        let twentysix = await ema26.see(26, 26, a)
        return twentysix
    } catch (err) {
        console.log(err)
    }
}