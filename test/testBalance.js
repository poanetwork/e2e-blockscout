const test = require('selenium-webdriver/testing')
const logger = require('../helper/logger.js').logger
const assert = require('assert')
const Utils = require('../helper/utils.js').Utils
const Home = require('../pages/home.js').Home
const Address = require('../pages/address.js').Address
const Account = require('../helper/account.js').Account
const Txdetails = require('../pages/txdetails.js').Txdetails
test.describe('', async function () {
    this.timeout(2400000)// 40 min
    this.slow(1800000)
    let driver
    let home
    let address
    let txdetails

    let receipt
    let account1
    let account2
    let tx1
    let tx2
    const startUrl = 'https://blockscout.com/poa/sokol'

    // const startUrl = "localhost:4000"

    test.before(async function () {
        driver = await Utils.buildChromeWebDriver()
        home = new Home(driver)
        address = new Address(driver)
        txdetails = new Txdetails(driver)
        account1 = new Account('56b2.json')
        account2 = new Account('f16a.json')
        tx1 = {
            from: account1,
            to: account2,
            value: 100 * 1e15, // wei
            network: 77, // Sokol
            gasLimit: 4900000,
            gasPrice: 2 * 1e9
        }

        tx2 = {
            from: account2,
            to: account1,
            value: 100 * 1e15, // wei
            network: 77, // Sokol
            gasLimit: 4900000,
            gasPrice: 2 * 1e9
        }
    })
    test.after(async function () {
        // await driver.quit()
    })

    test.describe('Transfer ether', async () => {
        test.describe("Check account's balance", async () => {
            test.it('Open url, Sokol', async () => {
                await driver.get(startUrl)
            })

            test.it('Fill out search field', async () => {
                const result = await home.fillSearch(account1.address) &&
                    await home.clickSearch()
                assert.strictEqual(result, true, "Search field isn't displayed")
            })

            test.it('Get balance', async () => {
                const result = await address.getBalance()
                console.log(result)
                assert.notStrictEqual(result, '', 'Balance incorrect')
            })

            test.it('Make transaction', async () => {
                receipt = await Utils.sendTransaction(tx1)
                console.log(receipt)
                console.log(receipt.transactionHash)
            })
        })

        test.describe("Address page: check transaction's parameters", async () => {
            test.it('Wait until transaction appears', async () => {
                const before = await address.getTxBlockNumbers()
                console.log('before' + before)
                let counter = 0
                do {
                    await Utils.delay(1000)
                    logger.info(counter)
                } while ( (await address.getTxBlockNumbers() === before) && (counter++) < 120 )

                console.log('Time of waiting for transaction = ' + counter + ' sec')
                assert.strictEqual(counter < 120, true, 'waiting for txblock more than 120 sec')
            })

            test.it('Check tx hash', async () => {
                const result = await address.getText(await address.getTxHash(0))
                assert.strictEqual(result, receipt.transactionHash, 'hash incorrect')
            })

            test.it('Check balance ', async () => {
                const result = await address.getText(await address.getTxBalance(0))
                const balance = (result.split(' '))[0]
                const ticker = (result.split(' '))[1]
                assert.strictEqual(balance.toString(), (tx1.value / 1e18).toString(), 'balance incorrect')
                assert.strictEqual(ticker, 'POA', 'balance incorrect')
            })

            test.it('Check block number', async () => {
                const result = await address.getText(await address.getTxBlockNumber(0))
                assert.strictEqual(result, 'Block #' + receipt.blockNumber, 'block number incorrect')
            })

            test.it('Check time of creation', async () => {
                const result = await address.getText(await address.getTxTimeAgo(0))
                assert.strictEqual(result.includes('ago'), true, 'creation time incorrect')
            })

            test.it('Check sender', async () => {
                const result = await address.getText(await address.getTxSender(0))
                assert.strictEqual(result, receipt.from, "sender's address incorrect")
            })

            test.it('Check receiver', async () => {
                const result = await address.getText(await address.getTxReceiver(0))
                assert.strictEqual(result, receipt.to, "receiver's address incorrect")
            })
        })
    })

    test.describe('Transaction page', async () => {

        test.it('Open transaction page', async () => {
            await address.clickElement(await address.getTxHash(0))
            const result = await txdetails.getPageName()
            assert.strictEqual(result, 'Transaction Details', 'page name incorrect')
        })

        test.it('Check tx hash', async () => {
            const result = await txdetails.getText(await txdetails.getTxHash())
            assert.strictEqual(result, receipt.transactionHash, 'tx hash incorrect')
        })

        test.it('Check block number', async () => {
            const result = await txdetails.getText(await txdetails.getTxBlockNumber())
            console.log(result)
            console.log(receipt.blockNumber)
            assert.strictEqual(result.toString(), receipt.blockNumber.toString(), 'block number incorrect')
        })

    })

    test.describe('Make transaction back', async () => {

        test.it('Make transaction', async () => {
            receipt = await Utils.sendTransaction(tx1)
            console.log(receipt)
            console.log(receipt.transactionHash)
        })
    })



})
