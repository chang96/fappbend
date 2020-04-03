
// const neg = require('./RSI/avg')
// const pos = require('./RSI/avg')
// const coin = 'FETUSDT'
const RSI = require('./RSI/avg')


// let a = (async(close) => {
//     try {
//         let b = await close
//             // let c = b.slice(0, 15)
//             // let d = await neg.neg(c)
//             // const e = await pos.pos(c)
//             // console.log(e)
//             // console.log(c)
//         let c = await RSI.AVG(b)
//         console.log(c)
//     } catch (err) {
//         console.log(err)
//     }
// })(close)


module.exports.rsi = RSI.AVG