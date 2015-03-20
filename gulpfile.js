var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	clean = require('gulp-clean'),
	embedlr = require('gulp-embedlr'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	inject = require('gulp-inject'),
	express = require('express'),
	serverport = 5000; 


gulp.task('lint', function() {
	gulp.src('./app/scripts/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
	gulp.src(['app/scripts/main.js'])
	.pipe(browserify({
		insertGlobals:true,
		debug: true
	}))
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest('dist/js'));

});


// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('app/views/**/*.html')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));

  gulp.src('app/styles/**/*.css')
  .pipe(gulp.dest('dist/styles/'))
  .pipe(livereload());
});


//process sass
gulp.task('sass', function() {
    return sass('./app/scss/', {compass:true, style:'compressed'}) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('./app/styles/'))
    .pipe(livereload());
});


gulp.task('serve', function() {
	server.listen(serverport);
	livereload.listen();
	gulp.watch(['./app/index.html', 'app/views/**/*.html'], ['views']);
   	// Watch .scss files
  	gulp.watch('./app/scss/**/*.scss', ['sass'], ['views']);
   	// Watch image files
  	gulp.watch(['./app/scripts/*.js', 'app.scripts/**/*.js'], ['lint','browserify']);
});






var server = express();
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
	res.sendFile('index.html', {root:'dist'});	
});

gulp.task('dev', ['sass', 'views', 'browserify', 'serve']);


