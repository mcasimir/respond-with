/* jshint node: true */

'use strict';

var jasmine       = require('gulp-jasmine');
var SpecReporter  = require('jasmine-spec-reporter');

module.exports = function(gulp) {

  gulp.task('test:unit', function () {
    return gulp.src(['test/unit/**/*.spec.js'])
          .pipe(jasmine({
            reporter: new SpecReporter()
          }));
  });

};
