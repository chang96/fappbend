let neg = async function(a) {
    try {
        let c = await a
        let neg = []
        for (let i = 1; i < c.length; i++) {
            let ch = c[i] - c[i - 1]
            if (ch < 0) neg.push(Math.abs(ch))
            else {
                neg.push(0)
            }
        }
        return neg
    } catch (err) {
        console.log(err)
    }
}



module.exports.neg = async function(arr) {
    try {
        let negArr = []
        let ups = await neg(arr)
        let first14 = ups.slice(0, 14)
        ups.splice(0, 14)
            //console.log([ups], [first14])
        let sum = first14.reduce(function(a, b) {
            return a + b
        }, 0)
        let avg = (sum) / 14
        negArr.push(avg)
        let alpha = 1 / 14
        let beta = 1 - alpha
        let avgt = ups.reduce(function(b, a) {
                let avgnow = (alpha * a) + (beta * b)
                negArr.push(avgnow)
                return avgnow
            }, avg)
            //console.log({ negArr: negArr, negnow: avgt })
        return { negArr: negArr, negnow: avgt }
    } catch (err) {
        console.log(err)
    }
}