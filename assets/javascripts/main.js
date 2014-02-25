require({
  paths: {
    jquery: "vendor/jquery/jquery"
  }
}, ["app/example-view"], function(view) {
  "use strict";
  view("body");
});

