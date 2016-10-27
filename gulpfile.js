var gulp = require('gulp');
var fs = require('fs-extra');

/* =======================
 * tam
 * ======================= */

var tam = require('tam');
var tamHTML = require('tam-html');
var assetsPath = './assets.json';

gulp.task('clean', function () { fs.removeSync(tam.read(assetsPath).dist); });

gulp.task('build', ['clean'], function () {
  tam.run();
  tamHTML(tam, assetsPath, gulp);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*', ['build']);
});
