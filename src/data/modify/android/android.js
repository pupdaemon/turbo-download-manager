'use strict';

var listeners = [];

window.addEventListener('message', function (e) {
  if (e.source === e.target) {
    return;
  }
  listeners.forEach(function (c) {
    c(e.data, {url: 'background.html'});
  });
});

var background = { // jshint ignore:line
  send: (id, data) => window.top.postMessage({
    method: id + '@md',
    data
  }, '*'),
  receive: (id, callback) => listeners.push(function (request, sender) {
    if (request.method === id + '@md' && (!sender.url || sender.url.indexOf('background') !== -1)) {
      callback(request.data);
    }
  })
};