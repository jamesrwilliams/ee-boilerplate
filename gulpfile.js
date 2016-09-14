// *************************************
//
//   Gulpfile
//
// *************************************
//
// Run $ gulp --tasks to get full list of available tasks.
//
// -------------------------------------
//   Modules
// -------------------------------------

var gulp = 			require('gulp');
var gutil = 		require('gulp-util');
var sass = 			require('gulp-sass');
var find = 			require('gulp-find');
var concat = 		require('gulp-concat');
var rename = 		require('gulp-rename');
var replace = 		require('gulp-replace');

var contains = 		require('gulp-contains');
var gulpSequence = 	require('gulp-sequence');
var uglify = 		require('gulp-uglifyjs');
var cleanCSS = 		require('gulp-clean-css');
var bulkSass = 		require('gulp-sass-bulk-import');

var del = 			require('del');
var vinylPaths = 	require('vinyl-paths');

/* Set paths to be watched for gulp watch */

var paths = {
	
	sass: ['./src/scss/**/*.scss'],
	js: ['./src/js/**/*.js'],
	templates: ['./src/templates/*']
	
};

// -------------------------------------
// Task: default
// ==========================
//
// Fun starts here folks
//
// -------------------------------------

gulp.task('default', ['sass', 'js']);

// -------------------------------------
// Task: sass
// ==========================
//
// Subtasks are required to run in series.
//
// Sub Tasks:
//
// N/A
//
// -------------------------------------

gulp.task('sass', function(done) {
		
	gulp.src('./src/scss/site.scss')
	.pipe(bulkSass())
	.pipe(sass({
		
		outputStyle: 'compressed',
		includePaths: ['src/scss']
		
	}))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/public_html/assets/css/'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest('./dist/public_html/assets/css/'))
	.on('end', done);
	
});


// -------------------------------------
// Task: init
// ==========================
//
// Subtasks are required to run in series.
//
// Sub Tasks:
//
// init:move:* 	- Moves system folders
// init:clear:*	- Clears the duped folders
//
// -------------------------------------

gulp.task('init', function (done) {
  
  	// Run the main git init sequence
  
	gulpSequence('init:move:system', 'init:move:assets', 'init:move:uploads', 'init:move:config', 'util:templates', ['init:clear:images', 'init:clear:system'], done);
  
});

gulp.task('init:move:system', function(done){
		
	gulp.src('./dist/public_html/system/**/*')
	.pipe(gulp.dest("./dist/system/"))
	.on('end', done);
	
});

gulp.task('init:move:assets', function(done){
	
	gulp.src('./dist/public_html/images/**/*')
	.pipe(gulp.dest("./dist/public_html/assets/"))
	.on('end', done);
	
});

gulp.task('init:move:config', function(done){
	
	gulp.src('./src/config.php')
	.pipe(gulp.dest('./dist/system/expressionengine/config/'))
	.on('end', done);
	
});

gulp.task('init:move:uploads', function(done){
	
	gulp.src('./dist/public_html/assets/uploads/')
	.pipe(gulp.dest('./dist/public_html/'))
	.on('end', done);
	
});

gulp.task('init:clear:images', function(done){
	
	gulp.src('./dist/public_html/images/')
	.pipe(vinylPaths(del))
	.on('end', done);
	
});

gulp.task('init:clear:system', function(done){
	
	gulp.src('./dist/public_html/system/')
	.pipe(vinylPaths(del))
	.on('end', done);
	
});

// -------------------------------------
// Task: js
// ==========================
//
// Subtasks are required to run in series.
//
// Sub Tasks:
//
// init:compile - 
// init:vendor	- 
//
// -------------------------------------

gulp.task('js', function(done) {
	
    gulpSequence('js:compile', 'js:vendor', done);

});

gulp.task('js:compile', function(done){
	
	gulp.src('./src/js/*.js')
    .pipe(concat('site.js'))
    .pipe(uglify('site.min.js', {
    
    	outSourceMap: true
    
    }))
    .pipe(gulp.dest('./dist/public_html/assets/js/'))
    .on('end', done);
	
});

gulp.task('js:vendor', function(done){
	
	gulp.src('./src/js/vendor/*.js')
    .pipe(gulp.dest('./dist/public_html/assets/js/vendor/'))
    .on('end', done);
	
});

// -------------------------------------
// Task: util
// ==========================
//
// Subtasks are required to run in series.
//
// Sub Tasks:
//
// util:templates - Moves template files
//
// -------------------------------------

gulp.task('util', function(done){
	
	// No Primary Task
	console.log("\nHonk! Goose egg.\n");
	
});

gulp.task('util:templates', function(done){
	
	gulp.src('./src/templates/*')
	.pipe(gulp.dest('./dist/app/templates/default_site/'))
	.on('end', done);
	
});

// -------------------------------------
// Task: watch
// ==========================
//
// Subtasks are required to run in series.
//
// Sub Tasks:
//
// N/A
//
// -------------------------------------

gulp.task('watch', function() {
	
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.templates, ['init:move:templates']);
	
});
