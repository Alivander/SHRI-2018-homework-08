var gulp = require('gulp');
var run = require('run-sequence');
var del = require('del');

var concat = require('gulp-concat');

var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');

var server = require("browser-sync").create();

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('build'));
});

gulp.task('style', function() {
  return gulp.src('source/css/index.css')
    .pipe(plumber())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('script', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch('source/*.html', ['html']);
  gulp.watch('source/css/**/*.css', ['style']);
  gulp.watch('source/js/**/*.js', ['script']);
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task('build', function(done) {
  run(
    'clean',
    'html',
    'style',
    'script',
    done,
  );
});
