const renko = require('technicalindicators/dist/index').renko
const assert = require('assert')
const moment = require('moment-timezone')
async function addLastBar(){
    
}
async function renkobars(f){
    let pn = []
    let fff = await f
    let lastPriceArr = fff[fff.length - 1]
    let lastPrice = lastPriceArr[4]
    let lastopen = lastPriceArr[1]
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
   
    const period = 14
const result = renko(Object.assign({}, np(), {period: period, useATR:true}))
let forchart = []
for(let i = 0; i<result.close.length; i++){
    //console.log(close[2][i +1])
    forchart.push({date:moment.tz((result.timestamp[i]), 'Africa/Lagos').format(), open:result.open[i], high:result.high[i], low:result.low[i],
        close:result.close[i], volume:result.volume[i]})
   result.close[i + 1] - result.close[i] >=0 ? pn.push('+') :pn.push('-')
}

pn.pop()
let renkoLastClose = forchart[forchart.length - 1] === undefined? lastPrice : Number(forchart[forchart.length - 1].close)
let renkoLastOpen = forchart[forchart.length - 1] === undefined? lastopen :  Number(forchart[forchart.length - 1].open)
let atr = Math.abs(renkoLastClose - renkoLastOpen)
let mx = Math.max(renkoLastOpen, renkoLastClose) - atr
let mn = Math.min(renkoLastOpen, renkoLastClose) + atr
let b = lastPrice > mn || lastPrice < mx ? result.close.push(lastPrice) : null

//console.log(renkoLastClose, renkoLastOpen)
//return result
return [forchart, pn.reverse(), result.close]
} 

module.exports.renko = renkobars
