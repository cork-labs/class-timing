'use strict';

const defaults = {};

const response = function (config) {
  config = Object.assign({}, defaults, config);

  // -- middleware

  return function (req, res, next) {
    req.ts = {
      started: new Date()
    };
    next();
  };
};

module.exports = response;
