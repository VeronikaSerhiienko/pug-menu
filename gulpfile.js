///npm i gulp --save-dev
//npm i gulp-pretty-html
var prettyHtml = require('gulp-pretty-html');
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

//npm install  gulp-sass --save-dev
gulp.task('sass', function () {
  return gulp.src('src/style/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'last 2 Chrome versions', 'Firefox ESR'],
    cascade: false
  }))
  .pipe(gulp.dest('./build/style/'));
});

gulp.task('pug', function() {
  return gulp.src('src/*.pug')
  .pipe(plumber())
  .pipe(pug({}))
  .pipe(prettyHtml({ indent_char: " ", indent_size: 2, extra_liners: [] }))
  .pipe(gulp.dest('./build/'));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });    
});

gulp.task('watch', function () {
  gulp.watch("src/style/*.scss", ['sass']);
  gulp.watch("build/index.html");
  gulp.watch("src/*.pug", ['pug']);
});
//npm install browser-sync gulp --save-dev

gulp.task('default', ['sass']);

gulp.task('w', ['watch', 'sass','browser-sync','pug']);