//plugins
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
    mergequeries = require('gulp-merge-media-queries'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    wiredep = require('wiredep').stream;

//things we don't want to type every time
var reload = browserSync.reload,
    autoprefixList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//project paths
var config = {
    global: {
        input: 'src',
        output: 'dist',
        tmp: '.tmp'
    },
    bower: {
        input: 'bower.json'
    },
    clean: {
        tmp: '.tmp/*',
        dist: 'dist/*'
    },
    fonts: {
        input: 'src/fonts/**/*',
        output: 'dist/fonts',
        bower: '**/*.{eot,svg,ttf,woff,woff2}',
        tmp: '.tmp/fonts'
    },
    html: {
        input: 'src/**/*.html',
    },
    images: {
        input: 'src/images/**/*',
        output: 'dist/images'
    },
    scripts: {
        input: 'src/scripts/**/*.js',
        output: 'dist/js',
        tmp: '.tmp/js'
    },
    size: {
        output: 'dist/**/*'
    },
    static: {
        input: ['src/*.*', '!src/*.html']
    },
    styles: {
        all: 'src/scss/**/*.{scss,sass}',
        input: 'src/scss/main.{scss,sass}',
        output: 'dist/css',
        bower: 'src/css',
        tmp: '.tmp/css'
    }
}

//set up local server with browsersync - http://localhost:3000
gulp.task('serve', ['styles', 'scripts', 'fonts'], function() {
    browserSync({
        server: {
            baseDir:[config.global.tmp, config.global.input], //.tmp and src as base directories
            routes: {
                '/bower_components': 'bower_components' //serve bower_components as if it's located in 'src'
            }
        },
        notify: false,
        port: 3000 //configure port to your liking
    });

    //watch html, js and images and reload browser when something changes
    gulp.watch([ 
        config.html.input,
        config.scripts.input,
        config.images.input
    ]).on('change', reload);

    //watch scss, js, fonts and bower.js and execute task accordingly
    gulp.watch(config.styles.all, ['styles']);
    gulp.watch(config.scripts.input, ['scripts']); 
    gulp.watch(config.fonts.input, ['fonts']);
    gulp.watch(config.bower.input, ['wiredep', 'fonts']); //execute wiredep when bower.json changes; this will automatically inject assets from bower_components in our HTML or SCSS
});

//compile scss, autoprefix with postcss and make sourcemap
gulp.task('styles', function() {
    return gulp.src(config.styles.input)
        //plumber prevents pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ 
            outputStyle: 'nested', //output values: nested, expanded, compact and compressed
            includePaths: ['.'] //resolves Sass @imports for external libraries
        }).on('error', sass.logError)) 
        .pipe(postcss([autoprefixer({ browsers: autoprefixList })])) //autoprefix css with earlier specified list
        .pipe(mergequeries({ log: false })) //merge media queries - put true if you wanna see which media queries were processed
        .pipe(sourcemaps.write()) //write sourcemap
        .pipe(gulp.dest(config.styles.tmp)) //output to tmp/css folder (dev only)
        .pipe(reload({ stream: true }));
});

//lints js files
gulp.task('scripts', function() {
    return gulp.src([config.scripts.input])
        .pipe(plumber())
        .pipe(jshint()) 
        .pipe(jshint.reporter('default')) //lint js
        .pipe(gulp.dest(config.scripts.tmp)) //output to tmp/js folder (dev only)
        .pipe(reload({ stream:true, once: true }));
});

//move fonts to dist and tmp
//also moves used fonts from bower_components (like fontawesome) --> override main option in bower.json
gulp.task('fonts', function() {
    return gulp.src(require('main-bower-files')(config.fonts.bower, function(err){})
        .concat(config.fonts.input))
        .pipe(gulp.dest(config.fonts.tmp))
        .pipe(gulp.dest(config.fonts.output))
});

//compress images - PNG, JPG, GIF, SVG
gulp.task('images', function() {
    return gulp.src([config.images.input])
        .pipe(plumber())
        .pipe(cache(imagemin({
                optimizationLevel: 6,
                progressive: true, 
                interlaced: true,
                svgoPlugins: [{ cleanupIDs: false }], //don't remove IDs from SVG files
            }))) 
        .pipe(gulp.dest(config.images.output));
});

//make our files ready for deployment: 
//js files between <--build:js --> will be concatenated and uglified
//css files between <--build:css --> will be concatenated and minified (no autoprefixer because our styles task took care of that)
//html files will be minified
gulp.task('build', ['styles'], function() {
    return gulp.src(config.html.input)
        .pipe(plumber())
        .pipe(useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssnano({ 
            safe: true, 
            autoprefixer: false,  
            discardComments: {
                removeAll: true //remove all comments
            }
        })))
        .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(config.global.output))
});

//inject bower components
gulp.task('wiredep', function() {
    gulp.src(config.styles.all)
        .pipe(plumber())
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)+/
        }))
        .pipe(gulp.dest(config.styles.bower));

    gulp.src(config.html.input)
        .pipe(plumber())
        .pipe(wiredep({
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(config.global.input));
});

//move all static files to dist folder (robots.txt, humans.txt, favicon,...)
//hidden (.git for example) folders will be ignored
gulp.task('static', function() {
    return gulp.src(config.static.input, {
        dot: true
    }).pipe(gulp.dest(config.global.output));
});

//clean dist and .tmp folder (you can also use rm -rf <folder_name> if you don't want to use a plugin)
gulp.task('clean:dist', function() {
    return del(config.clean.dist);
});
gulp.task('clean:tmp', function() {
    return del(config.clean.tmp);
});

//clear cache if needed
gulp.task('clear', function(done) {
    return cache.clearAll(done);
});

//display the size of dist files
gulp.task('size', function() {
    return gulp.src(config.size.output)
        .pipe(size({title: 'Deployment build:', gzip: true}));
});

//development task; tasks in [] run parallel, the rest will follow the order specified in the sequence
gulp.task('dev', gulpSequence('clean:tmp', ['serve']));

//task for building production ready files
gulp.task('default', gulpSequence('clean:dist', ['build', 'images', 'fonts', 'static'], 'size'));

