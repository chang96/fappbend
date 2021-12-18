 async function neg(a) {
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



module.exports.neg = async function(arr, n) {
    try {
        let negArr = []
        let ups = await neg(arr)
        let firstn = ups.slice(0, n)
        ups.splice(0, n)
            //console.log([ups], [firstn])
        let sum = firstn.reduce(function(a, b) {
            return a + b
        }, 0)
        let avg = (sum) / n
        negArr.push(avg)
        let alpha = 1 / n
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