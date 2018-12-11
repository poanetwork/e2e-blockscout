const Logger = require('../entity/Logger.js')
const logger = Logger.logger
const key = require('selenium-webdriver').Key
const webdriver = require('selenium-webdriver')
const By = require('selenium-webdriver/lib/by').By
const loader = By.className('loading-container')
const loaderNotDisplayed = By.className('loading-container notdisplayed')
const titles = By.className('st-SectionInfo_Title')
const buttonOk = By.className('swal2-confirm swal2-styled')
const popup = By.className('swal2-content')

class Page {
  constructor (driver) {
    this.driver = driver
    this.titleElement
  }
}
module.exports.Page = Page
