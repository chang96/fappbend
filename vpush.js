module.exports.v = async function(ar, n) {
    let arr = await ar
    let arr20 = []
    let m = n - 1
    for (let i = 0; i < arr.length - m; i++) {
        arr20.push(arr.slice(i, (n + i)))
    }
    //sma calculation
    return arr20.map(function(t) {
            return t.reduce(function(a, b) {
                return Number(a) + Number(b)
            }) / t.length
        })
        // WMA calcultaion
        // let a = arr20.map(function(t, i) {
        //     return t.map(function(r, i) {
        //         return Number(r) * (i + 1)
        //     })
        // })
        // return a.map(function(t) {
        //     return t.reduce(function(a, b) {
        //         return Number(a) + Number(b)
        //     }) / 210
        // })
}

// let a = (async() => {
//     let b = await f(volumepush, 20)
//     b.splice(0, 2)
//     console.log(b)
// })()