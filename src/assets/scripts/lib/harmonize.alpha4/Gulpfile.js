/*!
 * gulp tasks for UI Harmonize Stylesheet - alpha4
 */
var cssSource = 'dev/';
var cssDest = 'dist/css/';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');

// Generate CSS
gulp.task('harmonize-styles', function() {
  return sass(cssSource +'**/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(cssDest))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(cssnano())
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch', function() {
  gulp.watch(cssSource + '**/*.scss', ['harmonize-styles']);
});

gulp.task('default', ['watch'], function() {});