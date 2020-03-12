const renko = require('technicalindicators/dist/index').renko
const assert = require('assert')
const moment = require('moment-timezone')
async function renkobars(f){
    let pn = []
    let fff = await f
    function np(){
        let n = {open:[],low:[], high:[], close:[], timestamp:[], volume:[]}
        fff.forEach(c=>{
            n.timestamp.push(Number(c[0]))
            n.open.push(Number(c[1]))
            n.high.push(Number(c[2]))
            n.low.push(Number(c[3]))
            n.close.push(Number(c[4]))
            n.volume.push(Number(c[5]))
        })
        return n
    }
    function usenp(){
        
    }
    const period = 14
const result = renko(Object.assign({}, np(), {period: period, useATR:true}))
let forchart = []
for(let i = 0; i<result.close.length; i++){
    //console.log(close[2][i +1])
    forchart.push({date:moment.tz(moment.unix(result.timestamp[i]), 'Africa/Lagos').toString().split('').splice(0, 24).join(''), open:result.open[i], high:result.high[i], low:result.low[i],
        close:result.close[i], volume:result.volume[i]})
   result.close[i + 1] - result.close[i] >=0 ? pn.push('+') :pn.push('-')
}

pn.pop()
//console.log(pn.reverse())
//return result
return [forchart, pn.reverse()]
} 

//module.exports.renko = renkobars
