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
    "csslint",
    "eslint",
    "require-lint",
    "minify-svg",
    "minify-html",
    "minify-img",
    "testem-require",
    "web-package"
  ],
  eslint: {
    options: {
      env: {
        browser: true,
        amd: true
      }
    }
  },
  testemRequire: {
    mochaSetup: {
      globals:["jQuery*"]
    }
  }
}