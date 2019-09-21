const axios = require('axios')


module.exports.see = async(weight, period, coindata) => {
    try {
        const data = await coindata
        const emaarr = []
        const den = weight + 1
        const k = 2 / den
        let smadata = data.slice(0, period)
        let emadata = data.splice(0, period)
        let sm = smadata.reduce(function(a, b) {
                return Number(a) + Number(b)
            }, 0)
            //console.log(data)
        let sma = sm / period
        emaarr.push(sma)
            //console.log(data.slice(0, 26))
        let ema = data.reduce(function(prev, price) {
            let a = Number(price) * k + Number(prev) * (1 - k)
                //console.log(a)
            emaarr.push(a)
            return a
        }, sma)
        console.log(emaarr)
        return { ema: ema, emaarr: emaarr }
    } catch (err) {
        console.log(err)
    }
}

module.exports.minus1226 = (weight, period, c) => {
    const data = c
    const emaarr = []
    const den = weight + 1
    const k = 2 / den
    let smadata = data.slice(0, period)
    let emadata = data.splice(0, period)
    let sm = smadata.reduce(function(a, b) {
            return Number(a) + Number(b)
        })
        //console.log(data)
    let sma = sm / period
    emaarr.push(sma)
        //console.log(data.slice(0, 26))
    let ema = data.reduce(function(prev, price) {
        let a = Number(price) * k + Number(prev) * (1 - k)
            //console.log(a)
        emaarr.push(a)
        return a
    }, sma)

    return { ema: ema, emaarr: emaarr }
}