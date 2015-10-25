'use strict';

// Gulp plugins
var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
// others
var browserify = require('browserify');
var babelify   = require('babelify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var glob       = require('glob');

gulp.task('script', () => {
  let scripts = glob.sync('./assets/javascripts/*.js');
  browserify({
    entries: scripts,
    transform: [reactify],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/javascripts/**/*.js', ['script']);
});

gulp.task('default', ['script']);
