/* jshint node: true */

'use strict';

var gulp          = require('gulp-help')(require('gulp'));

require('require-all')({
  dirname:  __dirname + '/tasks',
  resolve:  function(task) { task(gulp); }
});
