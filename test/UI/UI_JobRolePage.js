var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert');
const { threadId } = require('worker_threads');
const { delay } = require('lodash');
const { resolve } = require('path');
const { WebDriver } = require('selenium-webdriver');

describe('JobRolesCheck', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.close();
    await driver.quit();
  })
  it('Asserting that heading List of Job Roles exists', async function() {

    // Go to main Job Roles page
    await driver.get("http://localhost:3000/jobroles");

    // Wait for 2s for screen record to capture test
    await driver.sleep(2000);

    // Confirm that it is main page by asserting heading
    assert.equal(await driver.findElement(By.xpath("/html[1]/body[1]/h2[1]")).getText(), "List of Job Roles");
    console.log("LOG asserting Header of the page: OK");

    // Confirm that main page table exist by asserting heading
    assert.equal(await driver.findElement(By.id("Name")).getText(), "Name");
    console.log("LOG asserting Name column header: OK");
  })
})
