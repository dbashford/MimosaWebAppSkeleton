Work in Progress
=====

MimosaWebAppSkeleton
======

## Overview

This web app skeleton for the [Mimosa](http://mimosa.io) build tool is a great starting point both for a web application and for Mimosa.

## Getting Started

* You need to have [node.js](http://nodejs.org/) installed.
* `npm install -g mimosa`
* `git clone https://github.com/dbashford/MimosaWebAppSkeleton example`, where `example` is the name of your app.
* `cd example`
* `npm install`, this installs some server resources like Express. While this skeleton comes with a server, you don't need your own server, see the Server section below.
* `mimosa watch --server`
* [localhost:3000](http://localhost:3000)

## Before you go any further...

Just look around the file structure.  Check out the virtual lack of config in the `mimosa-config.js`.  Play with `mimosa --help` and the `--help` for the various commands.  Hopefully the next few sections will cover some answers to questions that arise while you check stuff out.

## Server

This skeleton comes equipped with its own Express server.  You can plug in your own node.js server if you have one.  Mimosa can execute it if that server matches the same interface (exports a `startServer`).

You can also use an Express server embedded within Mimosa.  Routing for that server is limited, but it is typically enough for small applications.  See [Mimosa's server docs](http://mimosa.io/server.html) for more information.

## Module Syntax

There are options here.

This skeleton is opinionated towards the use of [require.js](http://requirejs.org/).  Optimization, testing and static analysis modules are included that understand require.js and know how to work with it.

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

For the most part, the commands you'll use are `mimosa watch` and `mimosa build`.  Each of those commands have their own flags for performing for packaging (`mimosa build -p`) or building optimized apps (`mimosa build -o`) and so on.  All of the commands that come with the core modules are [documented on the website](http://mimosa.io/commands.html).

## Functionality

The best way to cover what this skeleton can do is to review the `modules` array, which makes up almost all of this skeletons's configuration, located in the `mimosa-config.js` file

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

* `copy`, [on GitHub](https://github.com/dbashford/mimosa-copy), [in docs](http://mimosa.io/compilers.html#copy), [config details](http://mimosa.io/configuration.html#copy). This module is a "compiler" responsible for transforming input text to output text by simply copying the contents. This module handles things like pure `.js` or `.css`.  Other compilers, like the [one for CoffeeScript](https://github.com/dbashford/mimosa-coffeescript), for `.coffee` files, transform input to output by transpiling the code.

* `streamCopy`, [on GitHub](https://github.com/dbashford/mimosa-stream-copy). This module performs copies on files that need no other form of processing. `.js` files, for instance, may need linting or minifying, but `.mp3` or `.xml` files need no other processing other than to be copied over from source directories to output directories.  This performs a fast copy based on file extension using streams.

* `server`, [on GitHub](https://github.com/dbashford/mimosa-server), [in docs](http://mimosa.io/server.html), [config details](http://mimosa.io/configuration.html#server). This module manages hosting your application. By default is expects to find a server in your project, but it can be configured to be server-less or to provided embedded hosting of assets.

* `live-reload`, [on GitHub](https://github.com/dbashford/mimosa-live-reload), [in docs](http://mimosa.io/utilities.html#reload), [config details](http://mimosa.io/configuration.html#lint). This module will reload your browser when assets change on the server.  No plugins needed.  The skeleton comes equipped with the necessary client scripts to have included in your app to enable live reload.

* `require`, [on GitHub](https://github.com/dbashford/mimosa-require), [in docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#require). This module manages optimization using [r.js](https://github.com/jrburke/r.js/). It is responsible for, among other things, validating AMD paths and determining how to build an r.js configuration.

* `minify-js`,[on GitHub](https://github.com/dbashford/mimosa-minify-js), [in docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#minify). This module uses [Uglify](https://github.com/mishoo/UglifyJS2) to minify your JavaScript assets when the `--minify` flag is ticked.

* `minify-css`, [on GitHub](https://github.com/dbashford/mimosa-minify-css), [in docs](http://mimosa.io/optimization.html#min), [config details](http://mimosa.io/configuration.html#minify). This module minifies CSS when the `--minify` flag is ticked.

* `bower`, [on GitHub](https://github.com/dbashford/mimosa-bower), [in docs](http://mimosa.io/utilities.html), [config details](http://mimosa.io/configuration.html#bower). This module provides integration with [Bower](http://bower.io/).

* `csslint`, [on GitHub](https://github.com/dbashford/mimosa-csslint), [in docs](http://mimosa.io/utilities.html#lint), [config details](http://mimosa.io/configuration.html#lint). This module lints your CSS using [csslint](http://csslint.net/).

* `jshint`, [on GitHub](https://github.com/dbashford/mimosa-jshint), [in docs](http://mimosa.io/utilities.html#lint), [config details](http://mimosa.io/configuration.html#lint). This module lints your JavaScript using [jshint](http://www.jshint.com/). Alternatively, an [ESLint module](http://www.eslint.org) is available.

* `require-lint`, [on GitHub](https://github.com/dbashford/mimosa-require-lint). This module will detect when you have brought in AMD dependencies that are not then subsequently used.

* `minify-svg`, [on GitHub](https://github.com/dbashford/mimosa-minify-svg). This module minifies `.svg` files when the `--minify` flag is ticked.

* `minify-html`, [on GitHub](https://github.com/dbashford/mimosa-minify-html). This module minifies `.html` files when the `--minify` flag is ticked.

* `minify-img`, [on GitHub](https://github.com/dbashford/mimosa-minify-img). This module minifies images using the `minimage` command.  `mimosa minimage`.  It will overwrite the images in the source code folder when the `--overwrite` flag is added.

* `testem-require`, [on GitHub](https://github.com/dbashford/mimosa-testem-require), [config details](https://github.com/dbashford/mimosa-testem-require#default-config). This module incorporates [Sinon](http://sinonjs.org/), [Chai](http://chaijs.com/), [Mocha](http://visionmedia.github.io/mocha/), [Testem](https://github.com/airportyh/testem) and [PhantomJS](http://phantomjs.org/) and understands require.js to build out a full test suite so that all you need to do is write tests.

* `web-package`, [on GitHub](https://github.com/dbashford/mimosa-web-package), [config details](https://github.com/dbashford/mimosa-web-package#default-config). When `mimosa build` is run with the `-p/--package` flag, this module builds out a `dist` folder with all of the compiled assets and a stubbed out config so that you can run `node app.js` to start up your app without Mimosa being involved.

## What about JS Transpilers, CSS Pre-Processors and Micro-Templaters?

Mimosa has [lots of those](http://mimosa.io/compilers.html). Mimosa will build source maps when it can.  It'll try real hard with your CSS pre-processors to only compile the files that matter.  And Mimosa will concatenate all your templates into a single file without being asked.

To play with these, run a `mimosa new <projectName>` from the command line. `cd` into the project, run `mimosa watch -s` and check what Mimosa does for you.





