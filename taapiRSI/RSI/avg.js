// let posArr = []
// let negArr = []
// let pos = async function(a) {
//     let c = await a
//     let pos = []
//     for (let i = 1; i < c.length; i++) {
//         let ch = c[i] - c[i - 1]
//         if (ch > 0) pos.push(ch)
//         else {
//             pos.push(0)
//         }
//     }
//     return pos
// }
// neg = async function(a) {
//     let c = await a
//     let neg = []
//     for (let i = 1; i < c.length; i++) {
//         let ch = c[i] - c[i - 1]
//         if (ch < 0) neg.push(ch)
//         else {
//             neg.push(0)
//         }
//     }
//     return neg
// }
// let avg14 = async function(a) {
//         let candles = await a
//         let ups = await pos(candles)
//         let arr14 = ups.splice(0,14)
//         let up14 =  arr14.reduce(function(a, b) {
//             return a + b
//         }, 0)
//         ups.map(function(up, i){
//             return 
//         })
//     }
//     // let one =async function(a){
//     //     return a/15
//     // }

let neg = require('./pos/neg')
let pos = require('./pos/pos')

module.exports.AVG = async function(candles) {
    try {
        let data = await candles
        let ne = await neg.neg(data)
        let po = await pos.pos(data)
            //console.log([ne], [po])
        return Promise.all(ne.negArr.map(async function(n, i) {

            let r = await (100 - (100 / (1 + (po.posArr[i] / n))))
                //console.log(r)
            return r
        }))
    } catch (err) {
        console.log(err)
    }
}