const ema12 = require('./ema12')
const ema26 = require('./ema26')
module.exports.diff = async(twelve, twentysix) => {

    try {
        // let twentysix = await ema26.t26
        let twe = await twelve

        let twent = await twentysix
            // let twelve = await ema12.t12
            //let [twelve, twentysix] = await Promise.all([ema12.see(12, 12, coindata12), ema26.see(26, 26, coindata26)])
            //console.log('26', twentysix.emaarr.length)
        twe.emaarr.splice(0, 14)
        let a = twent.emaarr
        let b = twe.emaarr
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