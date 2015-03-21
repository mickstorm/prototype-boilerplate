var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	browserify = require('browserify'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	embedlr = require('gulp-embedlr'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	inject = require('gulp-inject'),
	source = require('vinyl-source-stream'),
	rename = require("gulp-rename"),
	connect = require('gulp-connect-multi')();


gulp.task('lint', function() {
	gulp.src('./app/scripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
	console.log('Running browserify');
	var bundleStream = browserify('./app/scripts/main.js').bundle()
  	bundleStream
    .pipe(source('index.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});


// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());

  // Any other view files from app/views
  gulp.src('app/views/**/*.html')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  .pipe(connect.reload());;

  gulp.src('app/styles/**/*.css')
  .pipe(gulp.dest('dist/styles/'))
  .pipe(connect.reload());
});


//process sass
gulp.task('sass', function() {
    return sass('./app/scss/', {compass:true, style:'compressed'}) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('./app/styles/'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
	//server.listen(serverport);
	//livereload.listen();
	gulp.watch(['./app/index.html', 'app/views/*.html'], ['views']);
   	// Watch .scss files
  	gulp.watch('./app/scss/**/*.scss', ['sass'], ['views']);
   	// Watch image files
  	gulp.watch(['./app/scripts/**/*.js', 'app.scripts/**/*.js'], ['lint','browserify']);
});


gulp.task('connect', connect.server({
  root: ['dist'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome' 
  }
}));



gulp.task('dev', ['connect','sass', 'views', 'browserify', 'watch']);


