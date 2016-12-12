"use-strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var colors = require('colors');
//var browserSync = require('browser-sync').create();

var PATHS = {
  javascript: [
      './js/vendor/jquery.js',
      './js/vendor/foundation.min.js',
      './js/vendor/what-input.js',
      './js/barba.min.js',
      './js/custom.js'
  ], 
  css: [
      './css/foundation.min.css',
      './css/custom.css',
      //'./css/simple-line-icons.css',
      './css/animate.min.css'
  ]
};

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css/'))
});

gulp.task('css', function() {
    gulp.src(PATHS.css)
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./css/'))
});

gulp.task('pug', function(done) {  
  gulp.src('./pug/**/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./'))
    .on('end', done);
});

gulp.task('scripts', function() {
  return gulp.src(PATHS.javascript)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('pug/**/*.pug',['pug']);
    gulp.watch(['js/**/*.js', '!js/scripts.min.js'], ['scripts']);
});

gulp.task('build', ['css'], function() {
    console.log('Building files'.green);
});