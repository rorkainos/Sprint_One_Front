var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
const assert = require('assert');
const { threadId } = require('worker_threads');
const { delay } = require('lodash');
const { resolve } = require('path');
const { WebDriver } = require('selenium-webdriver');
const { default: isDisplayed } = require('webdriverio/build/commands/element/isDisplayed');
const e = require('express');

const jobRolesPageURL = "http://localhost:3000/jobroles";

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
  it('Asserting that heading List of Job Roles exists, asserting Job Roles table exist', async function() {

    // Go to main Job Roles page
    await driver.get(jobRolesPageURL);

    // Wait for 2s for screen record to capture test
    await driver.sleep(2000);

    // Confirm that it is main page by asserting heading
    assert.equal(await driver.findElement(By.xpath("/html[1]/body[1]/h2[1]")).getText(), "List of Job Roles");
    console.log("LOG asserting Header of the page: OK");

    // Checking if Job Roles table element exists on a page
    try {
      const table = await driver.findElement(By.id("job-role-table"));
      console.log("LOG Job Roles table is displayed on main page");

      if(table != null || table != undefined){
        console.log("LOG Job Roles table is not null/undefined");
      } else {
        assert.fail("LOG missing Job Roles table on a page");
      }

    }
    catch(NoSuchElementError) {
      assert.fail("LOG missing Job Roles table");
    }

  })
})
