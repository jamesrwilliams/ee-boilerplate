// *************************************
//
//   Gulpfile
//
// *************************************
//
// Available tasks:
//   'gulp'
//	 'gulp sass'
//   'gulp js'
//   'gulp watch'
//
// -------------------------------------
//   Modules
// -------------------------------------
//
// gulp              	: The streaming build system
// gulp-util			: 
// gulp-concat			: 
// gulp-uglifyjs		: 
// gulp-sass			: 
// gulp-minify-css		: 
// gulp-rename			: 
// gulp-rename			: 
// del					: 
// vinyl-paths			: 
//
// *************************************

var gulp = 			require('gulp');
var gutil = 		require('gulp-util');
var concat = 		require('gulp-concat');
var uglify = 		require('gulp-uglifyjs');
var sass = 			require('gulp-sass');
var minifyCss = 	require('gulp-minify-css');
var rename = 		require('gulp-rename');
var del = 			require('del');
var vinylPaths = 	require('vinyl-paths');
var rename = 		require('gulp-rename');
var replace = 		require('gulp-replace');
var find = 			require('gulp-find');
var contains = 		require('gulp-contains');

var paths = {
	
	sass: ['./src/scss/**/*.scss'],
	js: ['./src/js/**/*.js']
	
};

var version_number = "Not Found";

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
//   Task: debug
// -------------------------------------

gulp.task('debug', function(done){
	
	gulp.src('./dist/system/expressionengine/config/config.php')
	.pipe(contains({
            search: "/app_version/**",
            onFound: function (string, file, cb) {
                // string is the string that was found 
                // file is the vinyl file object 
                // cb is the through2 callback 
                
                console.log(string);
 
                // return false to continue the stream
                
            }
    }))
	gulp.on('end', done);
	
});

// -------------------------------------
//   Task: init
// -------------------------------------

//*

gulp.task('init', function(done){
	
	// TODO: Grab verison number and replace in custom version in config.php files
	
	// Move /system/ to parent directory
	
	gulp.src('./dist/public_html/system/')
	.pipe(gulp.dest("./dist/")),
	
	gulp.src('./dist/public_html/system/')
	.pipe(vinylPaths(del)),
	
	// Move the boilerplate config.php into position
	
	gulp.src('./src/config.php')
	.pipe(gulp.dest('./dist/system/expressionengine/config/')),
	
	gulp.src('./src/config.php')
	.pipe(vinylPaths(del)),
	
	// Rename ExpressionEngine 'images' folder to 'assets'
	
	gulp.src('./dist/public_html/images/*')
	.pipe(gulp.dest("./dist/public_html/assets/")),
	
	gulp.src('./dist/public_html/images/')
	.pipe(vinylPaths(del)),
	
	// Move the uploads folder to its parent directory
	
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
