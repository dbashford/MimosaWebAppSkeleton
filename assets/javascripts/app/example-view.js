define(["jquery"], function($) {
  "use strict";

  var render = function(element) {
    $(element).append("<div class='name'>This is a sample Mimosa web app</div>");
  };

  return render;
});