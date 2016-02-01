//require will look the dependencies in the node_module folder
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var concats = require('gulp-concat');
var less = require('gulp-less');
var clean = require('gulp-clean');


// Basic Gulp task syntax
gulp.task('hello', function () {
  console.log('Hello Mantu!');
});

// JS hint task finds error in JS files
gulp.task('jshint', function() {
  gulp.src('app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new or changed HTML pages
gulp.task('minify', function() {
  return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./build'))
});

//concat the library files
gulp.task('concat', function() {
  return gulp.src(['./bower_components/angular/angular.min.js','./bower_components/jquery/dist/jquery.min.js','./bower_components/br-fullpage/dist/br-fullpage.min.js','./bower_components/animateCSS/dist/jquery.animatecss.min.js','./bower_components/jquery/dist/jquery.min.js','./bower_components/bootstrap/dist/js/bootstrap.min.js','./bower_components/jquery.easing/js/jquery.easing.min.js','index.js'])
    .pipe(concats('libs.js'))
    .pipe(gulp.dest('./build'));
});

//concat the library files
gulp.task('concatapp', function() {
  return gulp.src(['app.js'])
    .pipe(concats('application.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy', function () {
  return gulp.src('./bower_components/**/*.min.css')
    .pipe(gulp.dest('./build/public/css'));
});

gulp.task('copyImg', function () {
  return gulp.src('./img/*.{png,jpg,gif}')
    .pipe(gulp.dest('./build/img'));
});

gulp.task('styles', function() {
    gulp.src(['style.less'])
        .pipe(less())
        .pipe(gulp.dest('./build'))
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('index.html', ['minify']);
  gulp.watch('app.js', ['jshint']);
  gulp.watch('style.less', ['styles']);
});

gulp.task('clean', function () {
	return gulp.src('./build', {read: false})
		.pipe(clean());
});

gulp.task('default', ['watch', 'hello', 'jshint', 'minify', 'concat','concatapp','copy','styles','copyImg']);