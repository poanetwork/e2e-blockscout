const Utils = require('../helper/utils.js').Utils
const Account = require('../helper/account.js').Account
console.log('codeTest.js')
run()

async function run () {
  const acc1 = new Account('56b2.json')
  const acc2 = new Account('f16a.json')
  let balance = await Utils.getBalance(acc1, 3)
  console.log(balance)

  const tx = {
    from: acc1,
    to: acc2,
    value: 13e15, // wei
    network: 3,
    gasLimit: 4900000,
    gasPrice: 2 * 1e9
  }
  await Utils.sendTransaction(tx)
}
