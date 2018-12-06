const test = require('selenium-webdriver/testing')
const assert = require('assert')
const Utils = require('../utils/utils.js').Utils
test.describe('', async function () {
  this.timeout(2400000)// 40 min
  this.slow(1800000)
  let driver

  test.before(async function () {
    driver = await Utils.buildChromeWebDriver()
  })
  test.after(async function () {
    // await driver.quit()
  })

  test.describe('Account Creation', async () => {
    test.it('Open url', async () => {
      await driver.get('https://blockscout.com/poa/core')
    })
    test.it('Title is correct', async () => {
      const title = await driver.getTitle()
      assert.strict.equal(title, 'POA Core (POA) Explorer', 'title is incorrect')
    })
  })
})
