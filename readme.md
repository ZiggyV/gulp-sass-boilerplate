Gulp boilerplate
======
A front-end boilerplate using [Gulp](http://gulpjs.com/ "Gulp.js") as build tool. Based on Yeoman's [webapp generator](https://github.com/yeoman/generator-webapp "Yeoman Webapp Generator"), various other blogs/tutorials and my own experience.  

What this boilerplate does for you:
* Live reloading and synchronization with [BrowserSync](https://www.browsersync.io/ "BrowserSync")
* Lints and minifies JavaScript.
* Compiles Sass with [`libSass`](https://github.com/sass/libsass "libsass"). Writes sourcemaps in development.
* Autoprefixes, minifies and removes unused css.
* Media query optimization: merges matching media queries into one definition. 
* Optimizes images - PNG, JPG, GIF and SVG.
* Handles file concatentation with [gulp-useref](https://github.com/jonkemp/gulp-useref "gulp-useref").
* Automatically injects assets from your `bower_components` to your HTML/SCSS files.  

A few basic styles and mixins are included, as well as a JavaScript file with best practices based on [a podcast from DevTips](https://www.youtube.com/watch?v=RMiTxHba5fo "Refactoring Javascript with Fred Lawler"). These are completely optional and can be removed or altered according to your liking.  

Getting started
------  

1. [Installation](#installation)
  * [Requirements](#requirements)
  * [Quick start](#start) 
2. [Project structure](#structure)  
3. [Configuration](#config)  
  * [Sass](#sass)
  * [Images](#images)
  * [Fonts](#fonts)
  * [Modernizr](#modernizr)
  * [Bower components](#bowerc)  
  * [Changing the folder structure](#changestructure)
4. [Dependencies](#dependencies)  
5. [Tasks](#tasks)  
6. [License](#license)

<a name="installation"></a> Installation
------
### <a name="requirements"></a>Requirements  

* [Node.js](https://nodejs.org/en/ "Node.js") 

OS X users can install Node with [Homebrew](http://brew.sh/ "Homebrew").

```shell
$ brew install node
```

* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md "Getting Started with Gulp")  

Install Gulp globally on your machine.

```shell
$ npm install -g gulp-cli
```

* [Bower](https://bower.io/#install-bower "Getting Started with Bower")

Install bower globally. We use bower to manage our front-end packages (like jQuery, Normalize.css, ...).

```shell
$ npm install -g bower
``` 

### <a name="start"></a>Quick start  
#### 1. Get the latest version  
[Download](https://github.com/ZiggyV/gulp-sass-boilerplate/archive/master.zip "Download .zip") or clone the latest version of this boilerplate on your local machine by running:

```shell
$ git clone https://github.com/ZiggyV/gulp-sass-boilerplate.git MyProject  
$ cd MyProject
```

#### 2. Install dependencies
Install our project dependencies and developer tools listed in `package.json` and `bower.json` by running:

```shell
$ npm install  
$ bower install  

// or run them both at the same time:
$ npm install && bower install
```  

#### 3. Start developing
When it's done installing, you can start developing by running:  

```shell
$ gulp dev
```
This command will build our project from the source files (`src/`) into a temporary folder (`.tmp/`). Also starts a local web server that watches our files for changes.

> [http://localhost:3000](http://localhost:3000) - BrowserSync server  
> [http://localhost:3001](http://localhost:3001) - BrowserSync control panel  

Whenever you modify any of the files in the `src/` folder, our project will be recompiled and the browser refreshes automatically. Note that the `gulp dev` command will **not** optimize or minifiy any of the compiled output files. This command is for development only.

> Don't know how to cancel a command in your terminal? Simply hit `CTRL+C`  

**What are these style guidelines?**  
This is to help me keep consistent throughout my project :). You can easily remove these by deleting `styleguide.html` and `scss/partials/_styleguide.scss` in the `src/` folder.    

#### 4. Build  
If your project is ready to go online, create a production-ready build by running:

```shell
$ gulp
```  
After running this command, the `dist/` folder will contain our production-ready build. You can now copy its contents to your site's `/public_html/` via a FTP client like [FileZilla](https://filezilla-project.org/ "FileZilla").  

<a name="structure"></a> Project structure
------  
This is how the project structure looks like:

```
gulp-sass-boilerplate
.
├── .tmp/                       // Temporary compiled files; used in development only
├── /bower_components/          // 3rd party front-end packages
├── /dist/                      // Compiled, production-ready output
├── /node_modules/              // 3rd party libraries and utilities
├── /src/                       // Source code; these are the only files you need to touch 
│   ├── /fonts/                 // Project fonts; Overpass font is included by default
│   ├── /images/                // Images folder; can have subdirectories
│   ├── /scripts/               // Scripts folder; can have subdirectories
│   ├── /scss/                  // Sass folder structure; can be modified to your liking
│   │   ├── /partials/          // Split your scss code in partials
│   │   ├── /utils/             // Mixins and other utilities 
│   │   ├── _base.scss          // Base styles used throughout project (typography, links, ...)
│   │   └── main.scss           // All of our Sass @imports
│   └── index.html              // Index of our project; HTML can be in subdirectories of src
├── bower.json                  // List of 3rd party front-end packages
├── modernizr-config.json       // List of modernizr feature detects we want
└── package.json                // List of 3rd party libraries and utilities
```  
**What about static files?**  
Static files can be placed in the root of the `src` folder and they will be copied into the `dist` folder without changing anything (e.g. favicon.ico, robots.txt, ...).

> **Note**: Make sure you are working in the `src/` folder. The `gulp` and `gulp dev` commands will delete the `dist/` and `.tmp/` folder before compiling again, so changes made in these folders will be lost.  

<a name="config"></a> Configuration
------
### <a name="sass"></a> Sass

### <a name="images"></a> Images

### <a name="fonts"></a> Fonts

### <a name="modernizr"></a> Modernizr

### <a name="bowerc"></a> Bower

### <a name="changestructure"></a> Changing the folder structure

<a name="Dependencies"></a> Dependencies
------  
A list of all the dependencies used in this project and a brief explanation for what it is used.  

### NPM
* [`autoprefixer`](https://github.com/postcss/autoprefixer "autoprefixer"): Automatically adds vendor prefixes to CSS rules.
* [`browser-sync`](https://github.com/BrowserSync/browser-sync "browser-sync"): Creates a small server. Used in this project for live reloading and synchronization between browsers.  
* [`del`](https://github.com/sindresorhus/del "del"): Deletes files and folders. In this case the `dist/` and `.tmp/` folder whenever you run the `gulp` or `gulp dev` command.   
* [`gulp`](http://gulpjs.com/ "gulp"): Build system that automates common tasks during development.
* [`gulp-cache`](https://github.com/jgable/gulp-cache "gulp-cache"): Caches result of a task. 
* [`gulp-concat`](https://github.com/contra/gulp-concat "gulp-concat"): Concatenates multiple files into one.
* [`gulp-cssnano`](http://cssnano.co/ "gulp-cssnano"): Minifies and optimizes CSS.
* [`gulp-htmlmin`](https://github.com/jonschlinkert/gulp-htmlmin "gulp-htmlmin"): Minifies HTML.
* [`gulp-if`](https://github.com/robrich/gulp-if "gulp-if"): Conditionally run tasks.
* [`gulp-imagemin`](https://github.com/sindresorhus/gulp-imagemin "gulp-imagemin"): Optimizes images - PNG, JPG, GIF and SVG.  
* [`gulp-jshint`](https://github.com/spalger/gulp-jshint "gulp-jshint"): Gulp plugin for JSHint. Lints JavaScript errors. 
* [`gulp-merge-media-queries`](https://github.com/roaiven/gulp-merge-media-queries "gulp-merge-media-queries"): Merges matching media queries into one definition. Very useful since I use a breakpoint mixin which outputs to multiple @media rules when compiled. Mmq will merge matching media queries into one rule.
* [`gulp-plumber`](https://github.com/floatdrop/gulp-plumber "gulp-plumber"): Prevents pipe breaking caused by errors from gulp plugins.
* [`gulp-postcss`]( "gulp-postcss"): Pipe CSS through several preprocessors (`autoprefixer`, `cssnano`), but only parse it once.  
* [`gulp-sass`](https://github.com/dlmanning/gulp-sass "gulp-sass"): Compiles Sass to CSS with [`libSass`](https://github.com/sass/libsass "libsass").
* [`gulp-sequence`](https://github.com/teambition/gulp-sequence "gulp-sequence"): Perform `gulp` tasks in a specific sequence. Used in this project to clean our `.tmp/` and `dist/` folders before other tasks run.
* [`gulp-size`](https://github.com/sindresorhus/gulp-size "gulp-size"): Display the size of the compiled output in your command line/terminal. 
* [`gulp-sourcemaps`](https://github.com/floridoo/gulp-sourcemaps "gulp-sourcemaps"): Adds inline or external source maps. Useful when debugging compressed code. 
* [`gulp-uglify`](https://github.com/terinjokes/gulp-uglify "gulp-uglify"): Minifies JavaScript. 
* [`gulp-uncss`](https://github.com/ben-eb/gulp-uncss "gulp-uncss"): Removes unused CSS. Great for cleaning up external resources (e.g. Bootstrap, Font Awesome).
* [`gulp-useref`](https://github.com/jonkemp/gulp-useref "gulp-useref"): Concatenates files between `build` blocks in your HTML.
* [`jshint`](https://github.com/jshint/jshint "jshint"): Detects errors in your JavaScript code.
* [`lazypipe`](https://github.com/OverZealous/lazypipe "lazypipe"): Allows you to create a lazily-initialized pipeline.
* [`main-bower-files`](https://github.com/ck86/main-bower-files "main-bower-files"): Returns all main bower files specified in `bower.json`. This can be overwritten in our own `bower.json` and you can also filter on a certain file type.     
* [`wiredep`](https://github.com/taptapship/wiredep "wiredep"): Automatically includes your Bower components between the `bower` blocks in your HTML/SCSS. Based on your dependencies in the `bower.json` file. devDependencies will not be injected automatically. 

### Bower  
* [`jquery`](https://github.com/jquery/jquery "jQuery"): JavaScript library.
* [`normalize-css`](https://github.com/necolas/normalize.css "normalize-css"): Preserves useful default, unlike most CSS resets.
* [`font-awesome`](https://github.com/FortAwesome/Font-Awesome "font-awesome"): Icon font.
* [`reset-css`](https://github.com/shannonmoeller/reset-css "reset-css"): Removes all built-in browser styling.

<a name="tasks"></a> Tasks
------  

<a name="license"></a> License
------
[MIT](../master/LICENSE "License")