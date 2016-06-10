Gulp boilerplate
======
A front-end boilerplate using [Gulp](http://gulpjs.com/ "Gulp.js") as build tool. Based on Yeoman's [webapp generator](https://github.com/yeoman/generator-webapp "Yeoman Webapp Generator"), various other blogs/tutorials and my own experience through the years.  

What this boilerplate does for you:
* Live reloading and synchronization with [BrowserSync](https://www.browsersync.io/ "BrowserSync")
* Lints and minifies JavaScript.
* Compiles, minifies and autoprefixes Sass. Writes sourcemaps in development.
* Media query optimization: merges matching media queries into one definition. 
* Optimizes images - PNG, JPG, GIF and SVG.
* Handles file concatentation with [gulp-useref](https://github.com/jonkemp/gulp-useref "gulp-useref").
* Automatically injects assets from your bower_components to your HTML/SCSS files.  

A few basic styles and mixins are included, as well as a JavaScript file with best practices based on [a podcast from DevTips](https://www.youtube.com/watch?v=RMiTxHba5fo "Refactoring Javascript with Fred Lawler"). These are completely optional and can be removed or altered according to your liking.  

Getting started
------  

1. [Installation](#installation)
  * [Requirements](#requirements)
  * [Quick start](#start) 
2. [Project structure](#structure) 
3. [Dependencies](#dependencies)  
4. [Configuration](#config)  
  * [Sass](#sass)
  * [Images](#images)
  * [Fonts](#fonts)
  * [Modernizr](#modernizr)
  * [Changing the folder structure](#changestructure)
  * [Bower](#bower)  

### Installation
#### <a name="requirements"></a>Requirements  

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

#### <a name="start"></a>Quick start  
##### 1. Get the latest version  
[Download](https://github.com/ZiggyV/gulp-sass-boilerplate/archive/master.zip "Download .zip") or clone the latest version of this boilerplate on your local machine by running:

```shell
$ git clone https://github.com/ZiggyV/gulp-sass-boilerplate.git MyProject  
$ cd MyProject
```

##### 2. Install dependencies
Install our project dependencies and developer tools listed in `package.json` and `bower.json` by running:

```shell
$ npm install  
$ bower install  

// or run them both at the same time:
$ npm install && bower install
```  

##### 3. Start developing
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

### <a name="structure"></a>Project structure  
This is how the project structure looks like:

```
gulp-sass-boilerplate
├── .tmp/
├── /bower_components/
├── /dist/
├── /node_modules/
├── /src/
├── bower.json
├── modernizr-config.json 
└── package.json
```

<a name="license"></a> License
------
[MIT](../master/LICENSE "License")