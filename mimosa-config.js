exports.config = {
  modules: [
    "copy",
    "stream-copy",
    "server",
    "live-reload",
    "require",
    "minify-js",
    "minify-css",
    "bower",
    "autoprefixer",
    "csslint",
    "jshint",
    "require-lint",
    "minify-svg",
    "minify-html",
    "minify-img",
    "testem-require",
    "web-package"
  ],
  testemRequire: {
    mochaSetup: {
      globals:["jQuery*"]
    }
  }
}