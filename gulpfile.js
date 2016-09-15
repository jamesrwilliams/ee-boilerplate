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
var sourcemaps = 	require('gulp-sourcemaps');
var contains = 		require('gulp-contains');
var gulpSequence = 	require('gulp-sequence');
var uglify = 		require('gulp-uglifyjs');
var cleanCSS = 		require('gulp-clean-css');
var bulkSass = 		require('gulp-sass-bulk-import');

var del = 			require('del');
var vinylPaths = 	require('vinyl-paths');

var devConfig = 	require('./developer.json');
var packageConfig = require('./package.json');

var today = new Date;
var dd = today.getDate(); 
var mm = today.getMonth()+1;
if(mm < 10){ mm = "0" + mm; }
var yyyy = today.getFullYear();

var date = dd + "/" + mm + "/" + yyyy + " @ " + today.getHours() + ":" + today.getMinutes();
var date_com = yyyy + mm + dd + today.getHours() + today.getMinutes();

var dateString 		= /@date( )?.*/g;
var projectString 	= /@project( )?.*/g;
var authorString 	= /@author( )?.*/g;
var versionString 	= /@version( )?.*/g;
var descString 		= /@desc( )?.*/g;

var configVersion	= /\$config\['app_version'\]?.*/ig;
var configAdmin		= /\$admin_email = ''?.*/ig;
var configPath		= /\$path = ''?.*/ig;
var configSysPath	= /\$system_path = ''?.*/ig;

var jsCacheBuster 	= /\<script src="\/assets\/js\/site.min.js?.*/ig;
var cssCacheBuster  = /\<link href="\/assets\/css\/site.min.css?.*/ig;


/* Set paths to be watched for gulp watch */

var paths = {
	
	sass: ['./src/scss/**/*.scss'],
	js: ['./src/js/**/*.js'],
	templates: ['./src/templates/**/*']
	
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
	.pipe(sourcemaps.init())
	.pipe(sass({
		
		outputStyle: 'compressed',
		includePaths: ['src/scss']
		
	}))
	.on('error', sass.logError)
	.pipe(rename({ extname: '.min.css' }))
	.pipe(sourcemaps.write('./', {
		
		includeContent: false
		
	}))
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
  
	gulpSequence(
	
		'init:move:system', 
		'init:move:assets', 
		'init:move:uploads', 
		'init:move:config', 
		'util:templates', 
		['init:clear:images', 'init:clear:system'],
		
	done);
  
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
    .pipe(uglify('site.min.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.', {
		
		includeContent: false,
		sourceRoot:'.'
		
	}))
    .pipe(gulp.dest('./dist/public_html/assets/js/'))
    .on('end', done);
	
});

gulp.task('js:vendor', function(done){
	
	gulp.src('./src/js/vendor/*.js')
	.pipe(uglify())
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

gulp.task('debug', function(done){
	
	gulp.src('./src/config.php')
	.pipe(replace(configVersion, "$config['app_version'] = '" + devConfig.eeVersion + "';"))
	.pipe(replace(configAdmin, "$admin_email = '" + devConfig.adminEmail + "';"))
	.pipe(replace(configPath, "$path = 'home/username/" + devConfig.accountName + "';"))
	.pipe(gulp.dest('./src/')),
	
	gulp.src('./dist/public_html/index.php')
	.pipe(replace(configSysPath, "$system_path = '../system';"))
	.pipe(gulp.dest('./dist/public_html/'))
	.on('end', done);
	
});

gulp.task('util:bust', function(done){
	
	gulp.src('./src/templates/global.group/_layout.html')
	.pipe(replace(jsCacheBuster, '<script src="/assets/js/site.min.js?v=' + date_com + '"></script>'))
	.pipe(replace(cssCacheBuster, '<link href="/assets/css/site.min.css?v=' + date_com + '" rel="stylesheet">'))
	.pipe(gulp.dest('./src/templates/global.group'))
	.on('end', done);
	
});

gulp.task('util:update', function(done){
	
	gulp.src('./src/scss/site.scss')
	.pipe(replace(dateString, "@date		" + date))
	.pipe(replace(projectString, "@project	" + packageConfig.name))
	.pipe(replace(authorString, "@author		" + devConfig.developer))
	.pipe(replace(versionString, "@version	" + packageConfig.version))
	.pipe(replace(descString, "@desc		" + packageConfig.description))
	.pipe(gulp.dest('./src/scss/'))
	.on('end', done);
	
});

gulp.task('util:templates', function(done){
	
	gulp.src('./src/templates/**/*')
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
	gulp.watch(paths.templates, ['util:templates']);
	
});
