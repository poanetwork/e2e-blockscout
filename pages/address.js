const logger = require('../helper/logger.js').logger
const Utils = require('../helper/utils.js').Utils
const Page = require('./page.js').Page
const By = require('selenium-webdriver/lib/by').By
const textWhite = By.className('text-white')

class Address extends Page {
    constructor(driver) {
        super(driver)
    }

    async getBalance() {
        logger.info("getBalance: ")
        const elements = await super.getElements(textWhite)
        console.log(elements.length)
        return await elements[1].getText()
    }
}

module.exports.Address = Address