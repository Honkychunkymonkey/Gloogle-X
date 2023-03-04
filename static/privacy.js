function inFrame() {
  return window.self !== window.top;
}
function usingFirefox() {
  return navigator.userAgent.indexOf("Firefox") !== -1;
}
var redirectSite = "https://classroom.google.com/";
if (!inFrame() && !usingFirefox()) {
  var tab = window.open('about:blank', '_blank');
  if (!tab || tab.closed || typeof tab.closed === 'undefined') {
    console.log("Popup blocked");
    if (window.location.pathname !== "/") {
      window.location.replace(window.location.origin + '?url=' + window.location.pathname);
    }
  } else {
    var page = window.location.pathname !== "/" ? window.location.origin + '?url=' + window.location.pathname : window.location.origin;
    tab.document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>Google</title><link rel="icon" type="image/png" href="https://google.com/favicon.ico"><style>body {margin:0;overflow:hidden}</style></head><body><iframe width="100%" height="100%" src="' + page + '" frameborder="0"></iframe></body></html>';
    tab.document.close();
    window.location.replace(redirectSite);
  }
}


const blockedKeyCodes = ['U', 'P', 'KeyP', 'KeyI', 'KeyC', 'KeyJ'];
document.addEventListener('keydown', event => {
  if (event.ctrlKey && blockedKeyCodes.includes(event.code)) {
    event.preventDefault();
  }
});
document.addEventListener('contextmenu', event => {
  event.preventDefault();
});


function detectPopup() {
  var popupWindow = window.open("about:blank", "directories=no,height=100,width=100");
  if (!popupWindow) {
    alert("Please enable popups on this site to protect your privacy!");
  } else {
    console.log("User has popups enabled, their privacy was successfully protected");
    popupWindow.close();}}
window.onload = detectPopup;


function userAGcheck() {
  var userAgent = navigator.userAgent;
  var browserVersion = parseInt(userAgent.substring(userAgent.indexOf("Chrome") + 7, userAgent.indexOf("Chrome") + 11));
  if (browserVersion > 105) {
    alert("You unfortunately cannot disable your school's blocking filter.");
  } else {
    var userConfirmation = confirm("You're eligible to disable your school's blocking extension, would you like to?");
    if (userConfirmation) {
      alert("First, if you don't see your bookmark bar, you need it. So start by holding CTRL and SHIFT, while doing that, click B. When you see your bookmark bar, 2 finger click your bookmark bar then hit add page, name it anything but put down below as the url. After making the bookmark, click it twice to open it, disable everything except your adblocker. \n \n javascript:(function(){document.head.appendChild(document.createElement('script')).src='https://cdn.jsdelivr.net/gh/thegreatestgiant/ingot-2.0@main/ingot2.0.js'})()");
}}}


function copySiteFunction() {
  const body = document.querySelector('body');
  const area = document.createElement('textarea');
  body.appendChild(area);
  area.value = "https://gloogle-v7.o-lawd-he-comin.repl.co";  
  area.select();
  document.execCommand('copy');
  body.removeChild(area);
  alert("Google's website has been copied to your clipboard!");
}

if (navigator.userAgent.includes("LightspeedSystemsCrawler")) {
  window.top.location.replace("https://google.com/");
}


const express = require('express');
const app = express();

app.use((req, res, next) => {
  const requestIp = req.connection.remoteAddress;
  const allowedIps = ['208.108.212.246', '10.46.80.22', '65.25.67.43', '192.168.1.237'];

  if (!allowedIps.includes(requestIp)) {
    res.set('Cache-Control', 'no-cache');
    res.set('Pragma', 'no-cache');
    res.redirect('https://google.com');
  } else {
    next();
  }
});


document.addEventListener('keydown', function(event) {
  if (event.key === '=') {
    var win = window.open("about:blank", "_self");
    win.close();
  }
});
document.addEventListener('keydown', function(event) {
  if (event.key === '-') {
    var html = document.querySelector('html');
    if (html.style.display === 'none') {
      html.style.display = '';
    } else {
      html.style.display = 'none';
    }
  }
});


(function() {
  const originalReplace = window.location.replace;
  const originalHref = window.location.href;
  const originalOpen = window.open;
  const originalClose = window.close;
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if ((details.type === "sub_frame" || details.type === "xmlhttprequest")  && details.url.startsWith("chrome-extension://")) {
        return { cancel: true };
      }
    },
    {
      urls: ["<all_urls>"],
      types: ["sub_frame", "xmlhttprequest"]
    },
    ["blocking"]
  );
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (sender.id) {
      return;
    }
    if (request.method === "open") {
      originalOpen.apply(this, request.args);
    } else if (request.method === "close") {
      originalClose.apply(this);
    }else if (request.method === "href"|| request.method === "replace") {
      if(request.method === "href") originalHref.apply(this, request.args);
      else originalReplace.apply(this, request.args);
    }
  });
  window.location.replace = function(url) {
    chrome.extension.sendRequest({ method: "replace", args: arguments });
  };

  window.location.href = function(url) {
    chrome.extension.sendRequest({ method: "href", args: arguments });
  };
  window.open = function (url, name, specs, replace) {
    chrome.extension.sendRequest({ method: "open", args: arguments });
  };

  window.close = function () {
    chrome.extension.sendRequest({ method: "close"});
  };
  Object.defineProperties(window.location, {
    href: {
      writable: false,
      configurable: false
    },
    replace: {
      writable: false,
      configurable: false
    }
  });
  Object.defineProperties(window, {
    open: {
      writable: false,
      configurable: false
    },
    close: {
      writable: false,
      configurable: false
    },
    print: {
      value: null,
      writable: false,
      configurable: false
    }
  });
})();