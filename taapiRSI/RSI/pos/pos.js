async function pos(a) {
    try {
        let c = await a
        let pos = []
        for (let i = 1; i < c.length; i++) {
            let ch = c[i] - c[i - 1]
            if (ch > 0) pos.push(ch)
            else {
                pos.push(0)
            }
        }
        return pos
    } catch (err) {
        console.log(err)
    }
}



module.exports.pos = async function(arr) {
    try {
        let posArr = []
        let ups = await pos(arr)
            //console.log(ups.length)
        let first14 = ups.slice(0, 14)
        ups.splice(0, 14)
        let sum = first14.reduce(function(a, b) {
                return a + b
            }, 0)
            //console.log(ups.length)
        let avg = (sum) / 14
        posArr.push(avg)
        let alpha = 1 / 14
        let beta = 1 - alpha
        let avgt = ups.reduce(function(b, a) {
            let avgnow = (alpha * a) + (beta * b)
            posArr.push(avgnow)
            return avgnow
        }, avg)
        return { posArr: posArr, posnow: avgt }
    } catch (err) {
        console.log(err)
    }
}