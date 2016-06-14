Gulp boilerplate
======
A front-end boilerplate using [Gulp](http://gulpjs.com/ "Gulp.js") as build tool. Based on Yeoman's [webapp generator](https://github.com/yeoman/generator-webapp "Yeoman Webapp Generator"), various other blogs/tutorials and my own experience.  

What this boilerplate does for you:
* Live reloading and synchronization with [BrowserSync](https://www.browsersync.io/ "BrowserSync")
* Lints and minifies JavaScript.
* Compiles Sass with [`libSass`](https://github.com/sass/libsass "libsass"). Writes sourcemaps in development.
* Autoprefixes, minifies and removes unused CSS.
* Media query optimization: merges matching media queries into one definition. 
* Optimizes images - PNG, JPG, GIF and SVG.
* Handles file concatentation with [`gulp-useref`](https://github.com/jonkemp/gulp-useref "gulp-useref").
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
  * [Modernizr](#modernizr)
  * [Bower components](#bowerc)  
  * [Changing the folder structure](#changestructure)
4. [Dependencies](#dependencies)  

<a name="installation"></a> Installation
------
### <a name="requirements"></a>Requirements  

* [Node.js](https://nodejs.org/en/ "Node.js") 

OS X users can install Node with [Homebrew](http://brew.sh/ "Homebrew").

```shell
$ brew install node
```

* [Gulp](https://github.com/gulpjs/gulp/blob[`libSass`](https://github.com/sass/libsass "libsass")/master/docs/getting-started.md "Getting Started with Gulp")  

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
gulp-sass-boilerplate/
│
├── .tmp/                     # Temporary compiled files; used in development only
├── bower_components/         # 3rd party front-end packages
├── dist/                     # Compiled, production-ready output
├── node_modules/             # 3rd party libraries and utilities
├── src/                      # Source code; these are the only files you need to touch 
│   ├── fonts/                # Project fonts; Overpass font is included by default
│   ├── images/               # Images folder; can have subdirectories
│   ├── scripts/              # Scripts folder; can have subdirectories
│   ├── scss/                 # Sass folder; more information below
│   └── index.html            # Homepage of our project; HTML can be in subdirectories of `src/`
├── bower.json                # List of 3rd party front-end packages
├── modernizr-config.json     # List of modernizr feature detects we want
└── package.json              # List of 3rd party libraries and utilities
```  
**What about static files?**  
Static files can be placed in the root of the `src` folder and they will be copied into the `dist` folder without changing anything (e.g. favicon.ico, robots.txt, ...).

> **Note**: Make sure you are working in the `src/` folder. The `gulp` and `gulp dev` commands will delete the `dist/` and `.tmp/` folder before compiling again, so changes made in these folders will be lost.  

<a name="config"></a> Configuration
------
### <a name="sass"></a> Sass

This boilerplate uses Sass as its CSS preprocessor. To keep our code clean and DRY (Don't Repeat Yourself), we split our Sass code into multiple files and folders. This boilerplate is based on the [Sass Guidelines architecture](https://sass-guidelin.es/#architecture "Sass Guidelines"), but it only uses 4 different folders and 1 main file (main.scss) where we import all of our seperate files.  

Our Sass folder structure looks like this:

```
scss/
│
├── base/
│   ├── _animations.scss      # Animations (keyframes)
│   ├── _base.scsss           # Commonly used standard styles
│   └── _fonts.scss           # Fonts
├── pages/
│   ├── _index.scss           # Homepage specific styles
│   └── _styleguide.scss      # Styleguide specific styles
├── partials/   
│   ├── _buttons.scss         # Buttons
│   ├── _footer.scss          # Footer
│   ├── _forms.scss           # Forms
│   ├── _grid.scss            # Grid system
│   └── _navbar.scss          # Navigation bar
├── utils/                   
│   ├── _functions.scss       # Sass funtions
│   ├── _mixins.scss          # Sass mixins
│   ├── _placeholders.scss    # Sass placeholders
│   └── _variables.scss       # Sass variables
└── main.scss                 # Main Sass file

```
> **Note**: You can modify this structure to your liking or your project needs. I highly suggest reading the [Sass Guidelines 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern "Sass Guidelines") if you want a more in-depth explanation.  

### <a name="modernizr"></a> Modernizr
[Modernizr]( "Modernizr") is a JavaScript library to detect what HTML, CSS and JS features are supported by your visitor's browser. As you may have noticed, there is a `modernizr-config.json` included in the root of our project. In this file we specify which feature detections we need for our project.

Basically it adds several classes to the `<html>` tag. If a feature isn't supported by the current browser these classes will be prefixed by `no-`. 

For example: We have a CSS animation and we want to detect if the user's browser supports this feature. When Modernizr runs in a browser that does support this feature, the `<html>` element will look like this:

`<html class="js cssanimations>"`

If the user's browser doesn't support it:

`<html class="js no-cssanimations>"`

so now we can write custom css for browsers that don't support animations:

```css
.no-cssanimations .myElement {
  /* write our fallback CSS */
}
```

> **Note**: Which feature detections you need are different for every project. You can generate your own [Modernirz config file](https://modernizr.com/download "Generate Modernizr config") or change the one included in this boilerplate.

**Generate the `modernizr.js` file**  
Now that our config file is in order, we still need to generate the actual JS file.

* Install the Modernizr command line tool  

```shell
$ npm install -g modernizr
```

* Generate our `modernizr.js` file to the desired folder

```shell
$ modernizr -c modernizr-config.json -d src/scripts 
```

> **-c** stands for config, while **-d** stands for the destination folder 

* Include the generated file in our HTML

```html
<!-- build:js js/main.js -->
<script src="scripts/modernizr.js"></script>
<script src="scripts/main.js"></script>
<!-- endbuild -->
```
[Read this comment by Paul Irish](https://github.com/Modernizr/Modernizr/issues/878#issuecomment-41448059 "Modernizr Performance") whether or not you should include the `modernizr.js` file in the `<head>` or at the bottom of your HTML.


### <a name="bowerc"></a> Bower components
Bower is used to include 3rd party front-end packages in our project. This boilerplate includes jQuery, Normalize.css and Font Awesome out-of-the-box. But how can you add other packages? Well it's fairly simple:

While `gulp dev` is running, you can install Bower packages like you normally would:

```shell
$ bower install --save <package>
```
Because `gulp dev` is running, it watches the `bower.json` file and runs the `wiredep` task on change. This task will automatically inject assets from `bower_components` into our HTML/SCSS files (between the `bower:{css,scss,js}` blocks). 

> **Note**: If you don't use the `--save` flag, our `bower.json` file won't be updated. The same goes for installing a package with the `--save-dev` flag. So make sure to use the `--save` flag when installing a Bower package.

For example: We want to install the [animate.css]("https://github.com/daneden/animate.css "Animate.css") package with Bower:

* Install the package while `gulp dev` is running

```shell
$ bower install --save animate.css
``` 
now our HTML files will look like this:

```html
<!-- bower:css -->
<link rel="stylesheet" href="/bower_components/animate.css/animate.css" />
<!-- endbower -->
```
> Notice how the asset gets injected automatically? Pretty neat, right? This just proves how powerful this feature is! You can install and use Bower packages with just one command without the need of updating your files manually.

**HTML/SCSS files not updating automatically?**  
If there are any problems, it's probally due to an incorrect `main` field in the package's `bower.json` file. This field value determines which asset the `wiredep` task is going to inject in our HTML/SCSS. Luckily for us we can [override](https://github.com/taptapship/wiredep#bower-overrides "Override bower.json") this value in our own `bower.json`.

**You installed a package while `gulp dev` wasn't running?**  
No problem! Simply run the `gulp wirdep` task manually and you are good to go :).

### <a name="changestructure"></a> Changing the folder structure
The current structure is just a representation of what I like to use. Ofcourse you can change the project structure or rename folders to your liking, but you will need to adjust a few things in the `gulpfile.js`, namely the `config` object.

So if you rename a folder, don't forget to change the corresponding key in the object!

<a name="dependencies"></a> Dependencies
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
* [`jquery`](https://github.com/jquery/jquery "jquery"): JavaScript library.
* [`normalize-css`](https://github.com/necolas/normalize.css "normalize-css"): Preserves useful default, unlike most CSS resets.
* [`font-awesome`](https://github.com/FortAwesome/Font-Awesome "font-awesome"): Icon font.

<a name="license"></a> License
------
[The MIT License (MIT)](../master/LICENSE "License")