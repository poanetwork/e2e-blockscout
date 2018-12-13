const logger = require('../helper/logger.js').logger
const Utils = require('../helper/utils.js').Utils
const Page = require('./page.js').Page
const By = require('selenium-webdriver/lib/by').By
const textWhite = By.className('text-white')
const txBlock = By.className('row tile-body')
const txHash = By.className('text-truncate')
const txBalance = By.className('tile-title')
const txBlockNumber = By.className('mr-2 mr-md-0 order-1')
const txAddress = By.className('d-none d-md-none d-lg-inline')
const txTimeAgo = By.className('mr-2 mr-md-0 order-2')

class Address extends Page {
  constructor (driver) {
    super(driver)
  }

  async getBalance () {
    logger.info('getBalance: ')
    const elements = await super.getElements(textWhite)
    return await elements[1].getText()
  }

  async getTxBlockNumbers () {
    logger.info('getTxBlockNumbers: ')
    const elements = await super.getElements(txBlock)
    return await elements.length
  }

  async getTxBlock (number) {
    logger.info('getTxBlock: ')
    const elements = await super.getElements(txBlock)
    return await elements[number]
  }

  async getTxHash (number) {
    logger.info('getTxHash: ')
    const txBlock = await this.getTxBlock(number)
    return await super.getElementFrom(txHash, txBlock)
  }

  async getTxBalance (number) {
    logger.info('getTxHash: ')
    const txBlock = await this.getTxBlock(number)
      return await super.getElementFrom(txBalance, txBlock)
  }

  async getTxBlockNumber (number) {
    logger.info('getTxBlokNumber: ')
    const txBlock = await this.getTxBlock(number)
    return await super.getElementFrom(txBlockNumber, txBlock)
  }

  async getTxTimeAgo (number) {
    logger.info('getTxTimeAgo: ')
    const txBlock = await this.getTxBlock(number)
    return await super.getElementFrom(txTimeAgo, txBlock)
  }

  async getTxSender (number) {
    logger.info('getTxSender: ')
    const txBlock = await this.getTxBlock(number)
    const elements = await super.getElementsFrom(txAddress, txBlock)
    return elements[0]
  }

  async getTxReceiver (number) {
    logger.info('getTxReceiver: ')
    const txBlock = await this.getTxBlock(number)
    const elements = await super.getElementsFrom(txAddress, txBlock)
    return elements[1]
  }
}

module.exports.Address = Address
