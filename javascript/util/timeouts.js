'use strict';

function Faye_Timeouts(context) {
  this._context = context;
  this._timeouts = {};
}

Faye_Timeouts.prototype = {
  add: function(name, delay, callback) {
    if (this._timeouts.hasOwnProperty(name)) return;
    var self = this;
    this._timeouts[name] = setTimeout(function() {
      delete self._timeouts[name];
      callback.call(self._context);
    }, 1000 * delay);
  },

  remove: function(name) {
    if (!this._timeouts.hasOwnProperty(name)) return;

    var timeout = this._timeouts[name];
    if (!timeout) return;
    clearTimeout(timeout);
    delete this._timeouts[name];
  },

  removeAll: function() {
    Object.keys(this._timeouts).forEach(function(name) {
      var timeout = this._timeouts[name];
      clearTimeout(timeout);
      delete this._timeouts[name];
    });
  }
};

module.exports = Faye_Timeouts;
