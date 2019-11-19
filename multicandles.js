module.exports.mutlti = function(obj, r) { // collect the coins
        let arr = [] // 
        let aaa = []
        let b
        obj.forEach(function(o) { //open up the arrays here
            for (const k in o) {
                arr = arr.concat(o[k])
            }
        })
        arr.forEach(function(v, i, n) { // find those pairs that appear more than once
            b = 0
            n.forEach(function(a) {
                if (v == a) {
                    b++
                }
            })
            aaa.indexOf(v) === -1 && b >= r ? aaa.push(v) : null
        })
        return aaa
    }
    // module.exports.mutlti = function(obj, r, ct) { // collect the coins
    //     let arr = [] // 
    //     let newarr = []
    //     let aaa = []
    //     let z
    //     let b
    //     obj.forEach(function(o) { //open up the arrays here
    //         for (const k in o) {
    //             if (k == ct) {
    //                 arr = arr.concat(o[k])
    //                 newarr = [...arr]
    //                 z = arr.length
    //                 console.log(arr)
    //             } else {
    //                 arr = arr.concat(o[k])
    //             }
    //         }
    //     })
    //     arr.forEach(function(v, i, n) { // find those pairs that appear more than once
    //         b = 0
    //         n.forEach(function(a) {
    //             if (v == a && newarr.indexOf(v) != -1) {
    //                 b++
    //             }
    //         })
    //         aaa.indexOf(v) === -1 && b >= r ? aaa.push(v) : null
    //     })
    //     return aaa
    // }

module.exports.changing = function(old, newarr) {
    return newarr.every(function(n, i) {
        return n == old[i]
    })
}