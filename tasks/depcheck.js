/* jshint node: true */

'use strict';

module.exports = function(gulp) {

  gulp.task('depcheck', require('gulp-depcheck')());

};
