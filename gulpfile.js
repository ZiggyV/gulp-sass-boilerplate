/* GULPFILE SETUP
 * ==================================================
 *  Live reloading and sync with browsersync, linting
 *  and minifies JS, compiles Sass, autoprefixes and
 *  minifies css, media query optimization, image
 *  optimization and file concatenation.
 * ==================================================
 */

/* PLUGINS
 * --------------------------------------------------
 *  Load Gulp plugins
 * -------------------------------------------------- */
var autoprefixer = require('autoprefixer'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    gulpSequence = require('gulp-sequence'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    lazypipe = require('lazypipe'),
    mainBowerFiles = require('main-bower-files'),
    mergequeries = require('gulp-merge-media-queries'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    purgecss = require('gulp-purgecss'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream;

/* VARS
 * --------------------------------------------------
 *  Variables and project paths
 * -------------------------------------------------- */
var reload = browserSync.reload,
    autoprefixList = ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var config = {
    global: { // main folders
        input: 'src',
        output: 'dist',
        tmp: '.tmp'
    },
    bower: { // bower.json file
        input: 'bower.json'
    },
    clean: { // generated directories
        tmp: '.tmp/*',
        dist: 'dist/*'
    },
    fonts: { // font paths
        input: 'src/fonts/**/*', 
        output: 'dist/fonts',
        bower: '**/*.{eot,svg,ttf,woff,woff2}', // we only need these file types for the 'fonts' task
        tmp: '.tmp/fonts'
    }, 
    html: { // html paths
        input: 'src/**/*.html',
    },
    images: { // image paths
        input: 'src/images/**/*',
        output: 'dist/images'
    },
    scripts: { // script paths
        input: 'src/scripts/**/*.js',
        output: 'dist/js',
        tmp: '.tmp/js'
    },
    size: { // dislays size of the folder below it's build
        output: 'dist/**/*'
    },
    static: { // static files --> everything except html files
        input: ['src/*.*', '!src/*.html']
    },
    styles: { // style paths
        all: 'src/scss/**/*.{scss,sass}',
        input: 'src/scss/main.{scss,sass}',
        output: 'dist/css',
        bower: 'src/scss',
        tmp: '.tmp/css'
    }
}

/* SERVE TASK
 * --------------------------------------------------
 *  Livereload with browserSync, watch files on 
 *  change and execute tasks accordingly
 * 
 *  http://localhost:3000
 * -------------------------------------------------- */
gulp.task('serve', ['styles', 'scripts', 'fonts'], function() {
    browserSync({
        server: {
            baseDir:[config.global.tmp, config.global.input], // .tmp and src as base directories
            routes: {
                '/bower_components': 'bower_components' // serve bower_components as if it's located in 'src'
            }
        },
        notify: false,
        port: 3000 // configure port to your liking
    });

    // watch html, js and images and reload browser when something changes
    gulp.watch([ 
        config.html.input,
        config.scripts.input,
        config.images.input
    ]).on('change', reload);

    // watch scss, js, fonts and bower.js and execute task accordingly
    gulp.watch(config.styles.all, ['styles']);
    gulp.watch(config.scripts.input, ['scripts']); 
    gulp.watch(config.fonts.input, ['fonts']);
    gulp.watch(config.bower.input, ['wiredep', 'fonts']); // execute wiredep when bower.json changes; this will automatically inject assets from bower_components in our HTML or SCSS
});

/* STYLES TASK
 * --------------------------------------------------
 *  Compile SCSS, autoprefix and make sourcemap
 * -------------------------------------------------- */
gulp.task('styles', function() {
    return gulp.src(config.styles.all)
        .pipe(plumber()) // plumber prevents pipe breaking caused by errors from gulp plugins
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            outputStyle: 'nested', // output values: nested, expanded, compact and compressed
            includePaths: ['.'] // resolves Sass @imports for external libraries
        }).on('error', sass.logError)) 
        .pipe(postcss([autoprefixer({ browsers: autoprefixList })])) // autoprefix css with earlier specified list
        .pipe(sourcemaps.write()) // write sourcemap
        .pipe(gulp.dest(config.styles.tmp)) // output to tmp/css folder (dev only)
        .pipe(reload({ stream: true }));
});

/* SCRIPTS TASK
 * --------------------------------------------------
 *  Lint JS file(s) and report errors in console
 * -------------------------------------------------- */
gulp.task('scripts', function() {
    return gulp.src([config.scripts.input])
        .pipe(plumber())
        .pipe(jshint()) 
        .pipe(jshint.reporter('default')) // lint js
        .pipe(gulp.dest(config.scripts.tmp)) // output to tmp/js folder (dev only)
        .pipe(reload({ stream:true, once: true }));
});

/* FONTS TASK
 * --------------------------------------------------
 *  Get fonts for bower dependencies that need them
 *  and move them to dist and .tmp folder. Concat 
 *  own fonts to mainBowerFiles array if needed
 * -------------------------------------------------- */
gulp.task('fonts', function() {
    return gulp.src(mainBowerFiles(config.fonts.bower, function(err){}) // get the main bower files, filter by ext: eot,svg,ttf,woff or woff2 for this task
        .concat(config.fonts.input)) // concatenate our own fonts to the array
        .pipe(gulp.dest(config.fonts.tmp))
        .pipe(gulp.dest(config.fonts.output))
        .pipe(reload({ stream: true }));
});

/* IMAGES TASK
 * --------------------------------------------------
 *  Compress images - PNG, JPG, GIF and SVG
 *  Doesn't remove IDs from SVG files
 * -------------------------------------------------- */
gulp.task('images', function() {
    return gulp.src([config.images.input])
        .pipe(plumber())
        .pipe(cache(imagemin([
            imagemin.optipng({ optimizationLevel: 6 }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.gifsicle({ interlaced: true }),
            imagemin.svgo({
                plugins: [{ cleanupIDs: false }]
            }) 
        ])))
        .pipe(gulp.dest(config.images.output))
        .pipe(reload({ stream: true }));
});

/* BUILD TASK
 * --------------------------------------------------
 *  Make all of our src/ files ready for deployment:
 *   - Concatenate same type of files with useref
 *     between build blocks; 'build:{js,css}'
 *   - Uglify JS
 *   - Optimize CSS
 *   - Minify HTML
 * -------------------------------------------------- */
gulp.task('build', function() {
    return gulp.src(config.html.input)
        .pipe(plumber())
        .pipe(useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', optimizeCss())) // optimize css by calling a lazily-initialized pipeline 
        .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true, removeComments: true })))
        .pipe(gulp.dest(config.global.output))
});

// optimizeCss function - with lazypipe we can create a chain of events in our gulpif condition
var optimizeCss = lazypipe()
    .pipe(purgecss, {
        content: [config.html.input], // which html files should be purged
        whitelist: ['is--active'], // leave certain selectors untouched in our css (selectors that are added via JS)
        whitelistPatterns: [/pp-/], // example of whitelisting patterns of selectors ('.pp-section', etc will be left untouched) 
        whitelistPatternsChildren: [/pp-/] // example of whitelisting children of patterns ('.pp-section li', etc will be left untouched)
    })
    .pipe(mergequeries, { 
        log: false // merge media queries - put true if you wanna see which media queries were processed
    }) 
    .pipe(cssnano, { 
        safe: true, // http://cssnano.co/options/#optionssafe-bool
        autoprefixer: false, // don't autoprefix - our styles task already took care of that
        discardComments: { 
            removeAll: true // remove all comments 
        }
    }); 

/* WIREDEP TASK
 * --------------------------------------------------
 *  Inject bower dependencies in SCSS and NJK files
 * -------------------------------------------------- */
gulp.task('wiredep', function() {
    gulp.src(config.styles.input) // inject between 'bower' blocks in main.scss file
        .pipe(plumber())
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest(config.styles.bower)); // injects them in src/scss folder

    gulp.src(config.html.input) // inject between 'bower' blocks in .html files
        .pipe(plumber())
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(config.global.input)); // injects them in src/ folder
});

/* STATIC TASK
 * --------------------------------------------------
 *  Move static files to dist/ folder (robots.txt,
 *  humans.txt, favicon). Hidden files will be
 *  ignored (.git for example)
 * -------------------------------------------------- */
gulp.task('static', function() {
    return gulp.src(config.static.input, {
        dot: true
    }).pipe(gulp.dest(config.global.output));
});

/* CLEAN TASK
 * --------------------------------------------------
 *  Deletes dist/ and .tmp/ folder
 * -------------------------------------------------- */
gulp.task('clean:dist', del.bind(null, config.clean.dist));
gulp.task('clean:tmp', del.bind(null, config.clean.tmp));

/* CLEAR TASK
 * --------------------------------------------------
 *  Clear cache if needed
 * -------------------------------------------------- */
gulp.task('clear', function(done) {
    return cache.clearAll(done);
});

/* SIZE TASK
 * --------------------------------------------------
 *  Display size of dist folder
 * -------------------------------------------------- */
gulp.task('size', function() {
    return gulp.src(config.size.output)
        .pipe(size({title: 'Deployment build:', gzip: true}));
});

/* DEV TASK
 * --------------------------------------------------
 *  Start developing by running this task. Builds 
 *  our project from the source files (src/) into a 
 *  temporary folder (.tmp/) while watching files 
 *  for changes
 * -------------------------------------------------- */
gulp.task('dev', gulpSequence('clean:tmp', ['serve']));

/* DEFAULT TASK
 * --------------------------------------------------
 *  Creates a production-ready build 
 *  located in the dist/ folder
 * -------------------------------------------------- */
gulp.task('default', gulpSequence('clean:dist', ['build', 'images', 'fonts', 'static'], 'size'));

