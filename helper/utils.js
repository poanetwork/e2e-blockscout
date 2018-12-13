const logger = require('../helper/logger.js').logger
const Web3 = require('web3')
const fs = require('fs')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

class Utils {
  static async delay (ms) {
    try {
      await new Promise(resolve => setTimeout(resolve, ms))
      return true
    } catch (err) {
      return false
    }
  }

  static async buildChromeWebDriver () {
    const options = new chrome.Options()
    await options.addArguments('disable-popup-blocking')
    const driver = await new webdriver.Builder().withCapabilities(options.toCapabilities()).build()
    await this.delay(5000)
    return driver
  }

  static getWeb3Instance (network) {
    logger.info('Utils: getWeb3Instance')
    let url
    switch (network) {
      case 3: {
        url = 'https://ropsten.infura.io'
        break
      }
      case 4: {
        url = 'https://rinkeby.infura.io/'
        break
      }
      case 77: {
        url = 'https://sokol.poa.network'
        break
      }
      case 8545: {
        url = 'http://localhost:8545'
        break
      }
      default: {
        url = 'https://sokol.poa.network'
        break
      }
    }
    return new Web3(new Web3.providers.HttpProvider(url))
  }

  static async getBalance (account, network) {
    logger.info('Utils: getBalance')
    const web3 = Utils.getWeb3Instance(network)
    return await web3.eth.getBalance(account.address.toString())
  }

  static async sendTransaction (tx) {
    logger.info('Utils: sendTransaction')
    const web3 = await this.getWeb3Instance(tx.network)
    const account = await web3.eth.accounts.privateKeyToAccount('0x' + tx.from.privateKey)
    const nonce = await web3.eth.getTransactionCount(tx.from.address)
    const rawTransaction = {
      nonce: web3.utils.toHex(nonce),
      from: account.address,
      to: tx.to.address,
      value: web3.utils.toHex(tx.value),
      // gas: web3.utils.toHex("210000"),
      gasLimit: web3.utils.toHex(tx.gasLimit),
      gasPrice: web3.utils.toHex(tx.gasPrice)
    }
    try {
      const signedTx = await account.signTransaction(rawTransaction)
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      logger.info(receipt.transactionHash)
      return receipt
    } catch (err) {
      logger.info(err)
      return null
    }

    /// ///////////////////
  }
}

module.exports = {
  Utils: Utils
}
