var gulp = require('gulp');
var fs = require('fs-extra');
var rename = require('gulp-rename');

/* =======================
 * tam
 * ======================= */

var tam = require('tam');
var tamI18n = require('tam-i18n');
var tamHTML = require('tam-html');
var assetsPath = './assets.json';

gulp.task('clean', function () { fs.removeSync(tam.read(assetsPath).dist); });

gulp.task('tam', function () {
  tam.run();
});

gulp.task('i18n', ['tam'], function () {
  return tamI18n(tam, assetsPath, gulp);
});

gulp.task('rename', ['i18n'], function () {
  return gulp.src("./lang/index-zh-CN.html")
    .pipe(rename("./lang/index.html"))
    .pipe(gulp.dest("./"));
});

gulp.task('build', ['tam', 'i18n', 'rename'], function () {
  tamHTML(tam, assetsPath, gulp);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*', ['build']);
});
