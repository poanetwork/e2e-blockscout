const fs = require('fs')
class Account {
  constructor (file) {
    const path = './accounts/' + file
    const obj = JSON.parse(fs.readFileSync(path, 'utf8'))
    this.address = obj.address
    this.privateKey = obj.privateKey
  }
}

module.exports = {
  Account: Account
}
