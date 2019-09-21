const ema12 = require('../ema/ema')
const ema26 = require('../ema/ema26')
module.exports.diff = async(coindata12, coindata26) => {

    try {
        // let twentysix = await ema26.see(26, 26, coindata26)

        // let twelve = await ema12.see(12, 12, coindata12)
        let [twelve, twentysix] = await Promise.all([ema12.see(12, 12, coindata12), ema26.see(26, 26, coindata26)])
        console.log(twentysix.emaarr.length)
        twelve.emaarr.splice(0, 14)
        let a = twentysix.emaarr
        let b = twelve.emaarr
        console.log(a.length, b.length)
        return b.map(function(bee, i) {

                return bee - a[i]

            })
            //console.log(c)
            //return c
            // console.log(em.minus1226(9, 9, c).emaarr.length)
            // return em.minus1226(9, 9, c)
    } catch (err) {
        console.log(err)
    }
}