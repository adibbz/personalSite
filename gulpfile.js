var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('pug', function(done) {  
  gulp.src('./pug/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./'))
    .on('end', done);
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('pug/**/*.pug',['pug']);
});