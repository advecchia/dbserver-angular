module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    reporters: ['kjhtml', 'progress', 'coverage'],

    preprocessors: {
        'public/components/**/*.html': ['ng-html2js'],
        'public/components/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    files: [
	  'node_modules/angular/angular.js',
	  'node_modules/angular-animate/angular-animate.js',
	  'node_modules/angular-aria/angular-aria.js',
	  'node_modules/angular-material/angular-material.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/components/site/site.module.js',
      'public/components/**/*.js',
      'public/components/**/*.html',
      'public/components/**/*.spec.js'
    ],
    
    // web server port8
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}