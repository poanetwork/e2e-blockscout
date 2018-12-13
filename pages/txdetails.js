const logger = require('../helper/logger.js').logger
const Utils = require('../helper/utils.js').Utils
const Page = require('./page.js').Page
const By = require('selenium-webdriver/lib/by').By
const txHash = By.xpath('/html/body/div[1]/main/section/section/div/div[1]/div/div/h3')
const blockNumber = By.className('transaction__link')

class Txdetails extends Page {
    constructor(driver) {
        super(driver)
    }

    async getTxHash () {
        logger.info('getTxHash: ')
        return await super.getElement(txHash)
    }

    async getTxBlockNumber () {
        logger.info('getBlockNumber: ')
        return await super.getElement(blockNumber)
    }



}

module.exports.Txdetails = Txdetails