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
var concat = 		require('gulp-concat');
var cache = 		require('gulp-cached');
var rename = 		require('gulp-rename');
var randomstring =  require("randomstring");
var changed = 		require('gulp-changed');
var replace = 		require('gulp-replace');
var gulpSequence = 	require('gulp-sequence');
var uglify = 		require('gulp-uglifyjs');
var cleanCSS = 		require('gulp-clean-css');
var sourcemaps = 	require('gulp-sourcemaps');
var bulkSass = 		require('gulp-sass-bulk-import');

var del = 			require('del');
var vinylPaths = 	require('vinyl-paths');

var devConfig = 	require('./developer.json');
var packageConfig = require('./package.json');

var dateString 		= /@date( )?.*/g;
var projectString 	= /@project( )?.*/g;
var authorString 	= /@author( )?.*/g;
var versionString 	= /@version( )?.*/g;
var descString 		= /@desc( )?.*/g;

var configVersion	= /\$config\['app_version'\]?.*/ig;
var configEncrypt 	= /\$config\['encryption_key'\]?.*/ig;
var configAdmin		= /\$admin_email = ''?.*/ig;
var configPath		= /\$path = ''?.*/ig;
var configSysPath	= /\$system_path = ''?.*/ig;

var jsCacheBuster 	= /\<script src="\/assets\/js\/site.min.js?.*/ig;
var cssCacheBuster  = /\<link href="\/assets\/css\/site.min.css?.*/ig;

function get_date(format){
	
	var today = new Date;
	var dd = today.getDate(); 
	var mm = today.getMonth()+1; if(mm < 10){ mm = "0" + mm; }
	var hours = today.getHours(); if(hours < 10){hours = "0" + hours; }
	var mins = today.getMinutes(); if(mins < 10){ mins = "0" + mins; }
	var yyyy = today.getFullYear();
	
	if(format === 'human'){
		
		return dd + "/" + mm + "/" + yyyy + " @ " + hours + ":" + mins;
		
	}else{
		
		return yyyy + mm + dd + hours + mins;
	
	}
	
}

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
// Task: config
// ==========================
//
// Subtasks are required to run in series.
//
// -------------------------------------


gulp.task('setup', function(done){
	
	gulpSequence(
	
		'setup:move:system', 
		'setup:move:assets', 
		'setup:move:uploads',
		'setup:clear',
		
	done);
	
});

gulp.task('setup:move:system', function(done){
		
	gulp.src('./dist/public_html/system/**/*')
	.pipe(gulp.dest("./dist/system/"))
	.on('end', done);
	
});

gulp.task('setup:move:assets', function(done){
	
	gulp.src('./dist/public_html/images/**/*')
	.pipe(gulp.dest("./dist/public_html/assets/"))
	.on('end', done);
	
});

gulp.task('setup:move:uploads', function(done){
	
	gulp.src('./dist/public_html/assets/uploads/')
	.pipe(gulp.dest('./dist/public_html/'))
	.on('end', done);
	
});

gulp.task('setup:clear', function(){
	
	return del([
		
		'./dist/public_html/images/',
   		'./dist/public_html/system/'
	
	]);
	
});

// -------------------------------------
// Task: setup
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

gulp.task('config', function(done){
	
	gulpSequence(
	
		'config:move:config',
		'util:update',
		'util:templates',
		'config:rm',
		
	done);
	
});

gulp.task('config:move:config', function(done){
	
	gulp.src('./src/config.php')
	.pipe(gulp.dest('./dist/system/expressionengine/config/'))
	.on('end', done);
	
});

gulp.task('config:rm', function(){
	
	return del([
		
		'./src/config.php'
	
	]);
	
});

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
	.pipe(replace(dateString, "@date		" + get_date('human')))
	.pipe(replace(projectString, "@project	" + packageConfig.name))
	.pipe(replace(authorString, "@author		" + devConfig.developer))
	.pipe(replace(versionString, "@version	" + packageConfig.version))
	.pipe(replace(descString, "@desc		" + packageConfig.description))
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
	.pipe(replace(dateString, "@date		" + get_date('human')))
	.pipe(replace(projectString, "@project	" + packageConfig.name))
	.pipe(replace(authorString, "@author		" + devConfig.developer))
	.pipe(replace(versionString, "@version	" + packageConfig.version))
	.pipe(replace(descString, "@desc		" + packageConfig.description))
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
	
	gulp.src('./src/js/vendor/**/*.js')
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
	console.log("\n  Honk! Goose egg. 'util' isn't a task on its own. Try:\n\n  util:bust 	- Add cache busting strings to the site.min.css and site.min.js files.\n  util:update 	- Updates the system settings with those in developer.json\n\n  For a full list of tasks run: gulp --tasks\n");

});

gulp.task('util:bust', function(done){
	
	 gulpSequence('util:bust:js', 'util:bust:css', done);
	
});

gulp.task('util:bust:js', function(done){
	
	if(devConfig.cacheBustIsOn){
	
		gulp.src('./src/templates/layouts.group/_global.html')
		.pipe(replace(jsCacheBuster, '<script src="/assets/js/site.min.js?v=' + get_date() + '"></script>'))
		.pipe(gulp.dest('./src/templates/layouts.group'))
		.on('end', done);
		
	}
	
});

gulp.task('util:bust:css', function(done){
		
	if(devConfig.cacheBustIsOn){
	
		gulp.src('./src/templates/layouts.group/_global.html')
		.pipe(replace(cssCacheBuster, '<link href="/assets/css/site.min.css?v=' + get_date() + '" rel="stylesheet">'))
		.pipe(gulp.dest('./src/templates/layouts.group'))
		.on('end', done);
	
	}
	
});

gulp.task('util:update', function(done){
	
	gulp.src('./dist/system/expressionengine/config/config.php')
	.pipe(replace(configVersion, "$config['app_version'] = '" + devConfig.eeVersion + "';"))
	.pipe(replace(configEncrypt, "$config['encryption_key'] = '" + randomstring.generate({ length: 64, charset: 'alphanumeric', capitalization: 'uppercase' }) + "';"))
	.pipe(replace(configAdmin, "$admin_email = '" + devConfig.adminEmail + "';"))
	.pipe(replace(configPath, "$path = 'home/username/" + devConfig.accountName + "';"))
	.pipe(gulp.dest('./dist/system/expressionengine/config/')),
	
	gulp.src('./dist/public_html/index.php')
	.pipe(replace(configSysPath, "$system_path = '../system';"))
	.pipe(gulp.dest('./dist/public_html/'))
	.on('end', done);
	
});

gulp.task('util:templates', function(done){
	
	gulp.src('./src/templates/**/*')
	.pipe(changed('./dist/app/templates/default_site/'))
	.pipe(replace(dateString, "@date		" + get_date('human')))
	.pipe(replace(projectString, "@project	" + packageConfig.name))
	.pipe(replace(authorString, "@author		" + devConfig.developer))
	.pipe(replace(versionString, "@version	" + packageConfig.version))
	.pipe(replace(descString, "@desc		" + packageConfig.description))
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
	
	gulp.watch(paths.sass, ['util:bust:css','sass']);
	gulp.watch(paths.js, ['util:bust:js','js']);
	gulp.watch(paths.templates, ['util:templates']);
	
});
