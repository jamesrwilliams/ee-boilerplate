var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var paths = {
	
	sass: ['./src/scss/**/*.scss'],
	js: ['./src/js/**/*.js']
	
};

gulp.task('default', ['sass', 'js']);

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

gulp.task('init', function(done){
	
	gulp.src('./src/config.php')
	.pipe(gulp.dest('./dist/system/expressionengine/config/'))
	.on('end', done),
	
	gulp.src('./src/config.php')
	.pipe(vinylPaths(del))
	.on('end', done);
	
});

gulp.task('js', function(done) {
	
	gulp.src('./src/js/*.js')
    .pipe(concat('site.js'))
    .pipe(uglify('site.min.js', {
    	
    	
    	outSourceMap: true
    
    }))
    .pipe(gulp.dest('./dist/public_html/assets/js/'))
    .on('end', done);
	
});

gulp.task('watch', function() {
	
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['js']);
	
});
