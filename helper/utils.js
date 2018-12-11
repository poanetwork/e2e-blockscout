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
}
module.exports = {
  Utils: Utils
}
