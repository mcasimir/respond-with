/* jshint node: true */

'use strict';

module.exports = function(gulp) {

  gulp.task('test:ci', require('gulp-sequence')('depcheck', 'lint', 'test:unit'));

};
