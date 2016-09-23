"use-strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
//var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
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

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('pug/**/*.pug',['pug']);
});