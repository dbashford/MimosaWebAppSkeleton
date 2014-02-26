MimosaWebAppSkeleton
======

## Overview

This web app skeleton for the [Mimosa](http://mimosa.io) build tool is a great starting point both for a web application and for Mimosa.

## Getting Started

1. You need to have [node.js](http://nodejs.org/) installed.
2. `npm install -g mimosa`
3. `git clone https://github.com/dbashford/MimosaWebAppSkeleton example`, where `example` is the name of your app.
4. `cd example`
5. `npm install`, this installs some server resources like Express. While this skeleton comes with a server, you don't need your own server, see the [Server](#server) section below.
6. `mimosa watch --server`
7. [localhost:3000](http://localhost:3000)

Make some code changes and see live-reload in action.

## Optimize

1. `mimosa watch -oms`
2. [localhost:3000](http://localhost:3000)

`-oms` is shorthand for `--optimize --minify --server`. This runs all the minifiers, runs the r.js optimization, and then starts a server.  The JavaScript for the app will be both minified and concatenated.

## Packaging for Deployment

1. `mimosa build -omp`
2. `cd dist`
3. `node app.js`
4. [localhost:3000](http://localhost:3000)

`-omp` is shorthand for `--optimize --minify --package`. This command will run optimization, run all the minifiers and then package the result for deployment. The packaged result doesn't need Mimosa to run.

## Server

This skeleton comes equipped with its own Express server.  You can plug in your own node.js server if you have one.  Mimosa can execute it if that server matches the same interface (exports a `startServer`).  You can also re-route the output to be dumped into the `public` directory of your server.

You can also use an Express server embedded within Mimosa.  Routing for that server is limited, but it is typically enough for small applications.  See [Mimosa's server docs](http://mimosa.io/server.html) for more information.

## Module Syntax

There are many options for module syntax.

This skeleton is opinionated towards the use of [require.js](http://requirejs.org/) and AMD.  Optimization, testing and static analysis modules are included that understand require.js and know how to work with it.

If you prefer CommonJS syntax, but you have no problem with require.js, there [is a module](https://github.com/dbashford/mimosa-require-commonjs) that will wrap your CommonJS code in the [simplified wrapper](http://requirejs.org/docs/commonjs.html) during builds.  Just toss that in and keep going.

If you prefer ES6 module syntax, there's a [module for that too](https://github.com/dbashford/mimosa-es6-module-transpiler). By default it outputs AMD compliant code.

If you prefer to use CommonJS and rather not use require.js, Mimosa has [browserify](https://github.com/JonET/mimosa-browserify) support. Check out the [starter skeleton using browserify](https://github.com/JonET/mimosa-browserify-example).

## Mimosa Commands

Mimosa has help docs for all of its commands.  Here is the output of `mimosa --help`.

```
Usage: mimosa [options] [command]

  Commands:

    new [options] [name]   create a skeleton matching Mimosa's defaults, which includes a basic Express setup
    watch [options]        watch the filesystem and compile assets
    config [options]       copy the default Mimosa config into the current folder
    build [options]        make a single pass through assets, compile them, and optionally package them
    clean [options]        clean out all of the compiled assets from the compiled directory
    skel:new [options] <skeletonName> [directory] Create a Mimosa project using a skeleton
    skel:list              List all skeletons
    skel:search <keyword>  Search for skeletons using keywords
    bower [options]        Run bower install
    bower:install [options] <names> Install a library and update the bower.json accordingly
    bower:clean [options]  Removes all discoverable installed bower modules from source code and removes temp directory.
    minimage [options]     minify images from the watch.sourceDir to the watch.compiledDir
    testscript [options]   Create a script in the root directory that will launch testem tests
    mod:install [options] [name] install a Mimosa module into your Mimosa
    mod:uninstall [options] [name] uninstall a Mimosa module from your installed Mimosa
    mod:list [options]     get list of all mimosa modules in NPM
    mod:config [options] [name] Print out the configuration snippet for a module to the console
```

For the most part, the commands you'll use are `mimosa watch` and `mimosa build`.  All of the commands that come with the core modules are [documented on the website](http://mimosa.io/commands.html).

## Configuration

The `mimosa-config.js` is the configuration file for Mimosa.  Because of Mimosa's focus on defaults and some (configurable) conventions, the configuration is very small.

That doesn't mean the modules aren't configurable. The `mimosa-config-documented.coffee` is a file which documents all of the configuration available for each of the configured modules.  It is a slightly modified version of the `mimosa-config-documented.coffee` that is written when you run the `mimosa config` command.

## Functionality

The best way to cover what this skeleton can do is to review the `modules` array -- which makes up almost all of this skeletons's configuration -- located in the `mimosa-config.js` file.

```javascript
modules: [
  "copy",
  "stream-copy",
  "server",
  "live-reload",
  "require",
  "minify-js",
  "minify-css",
  "bower",
  "csslint",
  "jslint",
  "require-lint",
  "minify-svg",
  "minify-html",
  "minify-img",
  "testem-require",
  "web-package"
]
```

* `copy`, [GitHub](https://github.com/dbashford/mimosa-copy), [docs](http://mimosa.io/compilers.html#copy), [config details](http://mimosa.io/configuration.html#copy). This module is a "compiler" responsible for transforming input text to output text by copying the contents. This module handles files like pure `.js` or `.css`. Other compilers, like the [one for CoffeeScript](https://github.com/dbashford/mimosa-coffeescript), for `.coffee` files, transform input to output through transpiling.

* `streamCopy`, [GitHub](https://github.com/dbashford/mimosa-stream-copy). This module copies files that need no other form of processing. `.js` files, for instance, may need linting or minifying, but `.mp3` or `.xml` files need no other processing other than to be copied over from source directories to output directories.  This performs a fast copy based on file extension using node.js streams.

* `server`, [GitHub](https://github.com/dbashford/mimosa-server), [docs](http://mimosa.io/server.html), [config details](http://mimosa.io/configuration.html#server). This module manages hosting your application. By default it expects to find a server in your project, but it can be configured to be server-less or to provide embedded hosting of assets.

* `live-reload`, [GitHub](https://github.com/dbashford/mimosa-live-reload), [docs](http://mimosa.io/utilities.html#reload), [config details](http://mimosa.io/configuration.html#lint). This module will reload assets or your browser when assets as saved.  No plugins needed.  The skeleton comes equipped with the necessary client scripts to include in your app to enable live reload.

* `require`, [GitHub](https://github.com/dbashford/mimosa-require), [docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#require). This module manages optimization using [r.js](https://github.com/jrburke/r.js/). It is responsible for, among other things, validating AMD paths and determining how to build an r.js configuration.

* `minify-js`,[GitHub](https://github.com/dbashford/mimosa-minify-js), [docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#minify). This module uses [Uglify](https://github.com/mishoo/UglifyJS2) to minify your JavaScript assets when the `--minify` flag is used.

* `minify-css`, [GitHub](https://github.com/dbashford/mimosa-minify-css), [docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#minify). This module minifies CSS when the `--minify` flag is used.

* `bower`, [GitHub](https://github.com/dbashford/mimosa-bower), [docs](http://mimosa.io/utilities.html), [config details](http://mimosa.io/configuration.html#bower). This module provides integration with [Bower](http://bower.io/).

* `autoprefixer`, [GitHub](https://github.com/dbashford/mimosa-autoprefixer), [config](https://github.com/dbashford/mimosa-autoprefixer#default-config). This module will run the [autoprefixer](https://github.com/ai/autoprefixer) over your CSS and add vendor prefixes to CSS rules.

* `csslint`, [GitHub](https://github.com/dbashford/mimosa-csslint), [docs](http://mimosa.io/utilities.html#lint), [config details](http://mimosa.io/configuration.html#lint). This module lints your CSS using [csslint](http://csslint.net/).

* `jshint`, [GitHub](https://github.com/dbashford/mimosa-jshint), [docs](http://mimosa.io/utilities.html#lint), [config details](http://mimosa.io/configuration.html#lint). This module lints your JavaScript using [jshint](http://www.jshint.com/). Alternatively, an [ESLint module](http://www.eslint.org) is available.

* `require-lint`, [GitHub](https://github.com/dbashford/mimosa-require-lint). This module will detect when you have brought in AMD dependencies that are not then subsequently used.

* `minify-svg`, [GitHub](https://github.com/dbashford/mimosa-minify-svg). This module minifies `.svg` files when the `--minify` flag is used.

* `minify-html`, [GitHub](https://github.com/dbashford/mimosa-minify-html). This module minifies `.html` files when the `--minify` flag is used.

* `minify-img`, [GitHub](https://github.com/dbashford/mimosa-minify-img). This module minifies images using the `minimage` command.  `mimosa minimage`.  It will overwrite the images in the source code folder when the `--overwrite` flag is added.

* `testem-require`, [GitHub](https://github.com/dbashford/mimosa-testem-require), [config details](https://github.com/dbashford/mimosa-testem-require#default-config). This module incorporates [Sinon](http://sinonjs.org/), [Chai](http://chaijs.com/), [Mocha](http://visionmedia.github.io/mocha/), [Testem](https://github.com/airportyh/testem) and [PhantomJS](http://phantomjs.org/) and understands require.js to build out a full test suite so that all you need to do is write tests.

* `web-package`, [GitHub](https://github.com/dbashford/mimosa-web-package), [config details](https://github.com/dbashford/mimosa-web-package#default-config). When `mimosa build` is run with the `-p/--package` flag, this module builds out a `dist` folder with all of the compiled assets and a stubbed out config so that you can run `node app.js` to start up your app without Mimosa being involved.

## What about JS Transpilers, CSS Pre-Processors and Micro-Templaters?

Mimosa has [lots of those](http://mimosa.io/compilers.html). Mimosa will build source maps when it can.  It'll try real hard with your CSS pre-processors to only compile the files that matter.  And Mimosa will concatenate all your templates into a single file without being asked.

To play with these, run a `mimosa new <projectName>` from the command line. `cd` into the project, run `mimosa watch -s` and check what Mimosa does for you.