process.env.BABEL_ENV = 'test'
const webpackConfig = require('./webpack.test.config')
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['qunit'],
    files: [
      './test/app.js',
      './test/main.js',
      'src/img/*.jpg'
    ],
    proxies: {
      '/src/img/': '/base/src/img/'
    },
    exclude: ['./test/fa.js', './src/js/modules/**/*.js'],
    preprocessors: {
      './test/main.js': ['webpack'],
    },
    webpack: webpackConfig,
    reporters: ['progress', 'coverage', 'html'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' },
      ],
      fixWebpackSourcePaths: true,
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    htmlReporter: {
      outputFile: 'coverage/summary.html',
      pageTitle: 'Froala Editor Plugin Test Suite',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false,
      showOnlyFailed: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--remote-debugging-port=9222',
          '--disable-gpu',
          '--disable-plugins',
          '--window-size=0,0',
          '--window-position=-9999,0'
        ],
      },
    },
    captureTimeout: 60000,
    browserDisconnectTimeout : 60000,
    browserNoActivityTimeout : 60000,
    singleRun: true,
    concurrency: Infinity,
  })
}

