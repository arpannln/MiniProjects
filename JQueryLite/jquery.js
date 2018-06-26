(function() {
  if (typeof $ === "undefined") {
    window.$ = {};
  }

  let eventQueue = [];

  document.addEventListener('DOMContentLoaded', function () {
    eventQueue.forEach(function (fn) {
      fn();
    });
  }, false);




  $ = function(arg) {
    let htmlEls;

    if (arg instanceof Function) {
      eventQueue.push(arg);
      return document;
    } else if (arg )
  }
