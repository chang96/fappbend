let Coin = require('./model/coin')

const findCoinToTrade = async() => {
    await Coin.findOne({ mymyid: 'string' }, async function(err, coin) {
        if (err) return err
        else if (coin) {
            console.log('y')
            let tradeableCoins = await findSendme(coin)
            return tradeableCoins.map(function(c, i) {
                let n = c.split('').length
                if (c.split('')[n - 1] == ':' && c.split('')[n - 2] == ':')
                    return c.split('').splice(0, n - 3).join('')
                else return c
            })
        } else {
            console.log('e no dey')
        }
    })
}
let j = (async function() {
    let k = await findCoinToTrade()
    console.log(k)
})()