'use strict';

const Timing = require('./timing');

const defaults = {
  keys: {}
};

const defaultKeys = {
  start: 'start'
};

const response = function (config) {
  config = Object.assign({}, defaults, config);
  config.keys = Object.assign({}, defaultKeys, config.keys);

  // -- middleware

  return function (req, res, next) {
    req.timing = new Timing(req, config.keys.start);
    next();
  };
};

module.exports = response;
