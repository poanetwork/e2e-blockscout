const test = require('selenium-webdriver/testing')
const assert = require('assert')
const Utils = require('../helper/utils.js').Utils
const Home = require('../pages/home.js').Home
const Address = require('../pages/address.js').Address
test.describe('', async function () {
    this.timeout(2400000)// 40 min
    this.slow(1800000)
    let driver
    let home
    let address
    const startUrl = "https://blockscout.com/poa/sokol"

    test.before(async function () {
        driver = await Utils.buildChromeWebDriver()
        home = new Home(driver)
        address = new Address (driver)
    })
    test.after(async function () {
        // await driver.quit()
    })

    test.describe("Check account's balance", async () => {
        const account = '0x56B2e3C3cFf7f3921Dc2e0F8B8e20d1eEc29216b'

        test.it("Open url, Sokol", async () => {
            await driver.get(startUrl)
        })

        test.it("Fill out search field", async () => {
            const result = await home.fillSearch(account)
                && await home.clickSearch()
            assert.strictEqual(result,true,"Search field isn't displayed")
        })

        test.it("Get balance", async () => {
            const result = await address.getBalance()
            console.log(result)
            assert.notStrictEqual(result,'',"Balance incorrect")
        })
    })
})
