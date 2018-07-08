// const getInfoFromURL = path => {
//    const URL = require(“url”).URL;
//    const myUrl = new URL(path)
//    const pathname = myUrl.pathname
//
//    const getUsernameFromURL = pathname => {
//       const regex = new RegExp(‘/@’);
//       const username = pathname.split(regex).slice(1)[0]
//       if(!username) {
//         return “Error in parsing: URL needs to be in format://hostname:port/@username”
//       }
//       return username
//     }
//
//     const getPathnameFromURL = pathname => {
//        const regex = new RegExp(‘/’);
//        const name = pathname.split(regex).slice(1)[0]
//        if(!name) {
//           return “Error in parsing: URL needs to be in format://hostname:port/pathname”
//        }
//       return name
//      }
//
//     return (param) => {
//        if (param === “username”) return getUsernameFromURL(pathname)
//        else if (param === “pathname”) return getPathnameFromURL(pathname)
//        else return “error”
//     }
// }
//
// // You should get “xiaoyunyang”
// getInfoFromURL(“https://medium.com/@xiaoyunyang")("username")
//
// // You should get “@xiaoyunyang
// getInfoFromURL(path)(“pathname”)

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
