'use strict'

exports.config = {
  directConnect: true,

  allScriptsTimeout: 80000,

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [ "--headless" ]
    }
  },

  baseUrl: 'http://localhost:3000',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 80000
  },

  onPrepare: function () {
    var jasmineReporters = require('jasmine-reporters')
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'build/reports/e2e_results'
    }))

    // Get cookie consent popup out of the way
    browser.get('/#')
    browser.manage().addCookie({ name: 'cookieconsent_status', value: 'dismiss' })
  }
}
