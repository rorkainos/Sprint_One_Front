exports.config = {
    specs: ['./test/ui/**/*.js'],
    exclude: [],
    maxInstances: 1,
    baseUrl: 'http://localhost:3000',
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome'
    }],
    sync: false,
    logLevel: 'trace',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 500000
    }
  }