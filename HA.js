const HA = async (par)=>{
    const HAcandles = []
    let parr =await par
    parr.map(async(c, i, r)=>{
       i == 0? await initHAcalc(c) : await continueHA(c, r[i-1])
    })
    return HAcandles
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

const continueHA = async(h, ha)=>{
    let p = await h
    const haopen = ha[ha.length - 1][0]
    const haclose = ha[ha.length - 1][3]
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