const logger = require('../helper/logger.js').logger
const Utils = require('../helper/utils.js').Utils
// const By = require('selenium-webdriver/lib/by').By
const { By, Key, webdriver, until } = require('selenium-webdriver')
const search = By.id('q')
const searchIcon = By.id('search-icon')
const navbar = By.id('navbarDropdown')

class Page {
  constructor (driver) {
    this.driver = driver
  }

  async isElementDisplayed (by) {
    try {
      return await this.driver.findElement(by).isDisplayed()
    } catch (err) {
      return false
    }
  }

  async getElementFrom (by, fromElement) {
    logger.info('getElementFrom ')
    try {
      const element = await this.getElement(fromElement)
      return await element.findElement(by)
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async getElementsFrom (by, fromElement) {
    logger.info('getElementFrom ')
    try {
      const element = await this.getElement(fromElement)
      return await element.findElements(by)
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async getElement (element, wait) {
    logger.info('getElement: ' + element)
    try {
      let Twait
      if (wait === undefined) Twait = 100
      if (element.constructor.name !== 'WebElement') {
        do {
          await Utils.delay(100)
          if (await this.isElementDisplayed(element)) return await this.driver.findElement(element)
        } while (Twait-- > 0)
        return false
      } else return element
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async getElements (element, wait) {
    logger.info('getElements: ' + element)
    try {
      if (!await this.getElement(element, wait)) return false
      else return await this.driver.findElements(element)
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async clickElement (by, wait) {
    logger.info('clickElement: ' + by)
    try {
      const element = await this.getElement(by, wait)
      await element.click()
      return true
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async fillElement (by, value, wait) {
    logger.info('fillElement: ' + by)
    try {
      const element = await this.getElement(by, wait)
      await element.sendKeys(value)
      return true
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async open (url) {
    logger.info('open: ' + url)
    try {
      await this.driver.get(url)
      return true
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  async getText (element) {
    logger.info('getText: ')
    try {
      return await element.getText()
    } catch (err) {
      logger.info(err)
      return false
    }
  }

  /// ///////////////////////////////////////////////////////////

  async clickSearch (wait) {
    logger.info('clickSearch ')
    return await this.clickElement(searchIcon, wait)
  }

  async fillSearch (value, wait) {
    logger.info('fillSearch ')
    return await this.fillElement(search, value, wait)
  }

  async clickNavbar (wait) {
    logger.info('clickNavbar ')
    return await this.clickElement(navbar, wait)
  }
}

module.exports.Page = Page
