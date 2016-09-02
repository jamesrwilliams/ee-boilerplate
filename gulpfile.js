// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   `gulp`
//
//
// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              : The streaming build system
//
//

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var rename = require('gulp-rename');

var paths = {
	
	sass: ['./src/scss/**/*.scss'],
	js: ['./src/js/**/*.js']
	
};

// -------------------------------------
//   Task: default
// -------------------------------------

gulp.task('default', ['sass', 'js']);

// -------------------------------------
//   Task: sass
// -------------------------------------

gulp.task('sass', function(done) {
	
	gulp.src('./src/scss/site.scss')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/public_html/assets/css/'))
	.pipe(minifyCss({
		keepSpecialComments: 0
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('./dist/public_html/assets/css/'))
	.on('end', done);
	
});

// -------------------------------------
//   Task: init
// -------------------------------------

//*

gulp.task('init', function(done){
	
	// TODO: Move System to parent directory
	
	// Update config file from src version to new one
	
	// TODO: Grab verison number and replace in custom version
	
	gulp.src('./src/config.php')
	.pipe(gulp.dest('./dist/system/expressionengine/config/')),
	
	gulp.src('./src/config.php')
	.pipe(vinylPaths(del)),
	
	// Rename ExpressionEngine 'images' default folder to 'assets'
	
	gulp.src('./dist/public_html/images/*')
	.pipe(gulp.dest("./dist/public_html/assets/")),
	
	gulp.src('./dist/public_html/images/')
	.pipe(vinylPaths(del)),
	
	// Move the uploads folder move to its parent directory
	
	gulp.src('./dist/public_html/assets/uploads/')
	.pipe(gulp.dest('./dist/public_html/')),
	
	gulp.src('./dist/public_html/assets/uploads')
	.pipe(vinylPaths(del))
	.on('end', done);
	
	// TODO: Create /img/ folder within assets

});

// */

// -------------------------------------
//   Task: js
// -------------------------------------

gulp.task('js', function(done) {
	
	gulp.src('./src/js/*.js')
    .pipe(concat('site.js'))
    .pipe(uglify('site.min.js', {
    	
    	
    	outSourceMap: true
    
    }))
    .pipe(gulp.dest('./dist/public_html/assets/js/'))
    .on('end', done);
	
});

// -------------------------------------
//   Task: watch
// -------------------------------------

gulp.task('watch', function() {
	
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['js']);
	
});
