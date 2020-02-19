// const axios = require('axios')
// async function n(){ 
// let d = await axios.get(`https://api.binance.com/api/v3/klines?symbol=MATICUSDT&interval=1h&limit=500`).
// then(data => data.data);
// //const d = [[9,9,4,5],[8,9,4,5],[8,9,4,3] ]
// return (d)
// }
// n()

const HA = async (par)=>{
   try{ 
    let HAcandles = []
    let init = []
    let parr =await par
    let initvalue = await initHAcalc(parr[0])
    HAcandles.push(initvalue)
    init = [...initvalue]
    parr.splice(0,1)
    //console.log(initvalue, parr[0])
    // await parr.forEach(async function(m, i){
    //     let j = await m
    //     let hh = await continueHA(j, init)
    //     HAcandles.push(hh)
    // })
    for(let i = 0; i<parr.length; i++){
        let j = await parr[i]
        let hh = await continueHA(j, init)
        init = [...hh]
        HAcandles.push(hh)
    }
    return HAcandles
   }catch(e){

   }
}

const initHAcalc = async (h)=>{
    let p = await h
    const open = Number(p[1])
    const high =Number(p[2])
    const low =Number(p[3])
    const close =Number(p[4])
    const rHAclose = open + high + low + close
    const rHAopen =  open + close
    const HAclose = rHAclose/4
    const HAopen =  rHAopen/2
    const HAhigh = Math.max(high, HAopen, HAclose)
    const HAlow = Math.min(low, HAopen , HAclose)
    return ([HAopen, HAhigh, HAlow, HAclose])
}

const continueHA = async(h, has)=>{
    let p = await h
    let ha = await has
   // console.log(p)
    const haopen = ha[0]
    const haclose = ha[3]
    const open = Number(p[1])
    const high =Number(p[2])
    const low =Number(p[3])
    const close =Number(p[4])
    const rHAclose = open + high + low + close
    const rHAopen =  haopen + haclose
    const HAclose = rHAclose/4
    const HAopen =  rHAopen/2
    const HAhigh = Math.max(high, HAopen, HAclose)
    const HAlow = Math.min (low, HAopen , HAclose)
    return ([HAopen, HAhigh, HAlow, HAclose])
}


// (async function m(){ 
//     console.log(await HA(n()).then(data => data.map(datum => (datum[3])).reverse()))
//     })()

    module.exports.HeikinAshi = HA