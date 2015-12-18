'use strict';

var _ = require('lodash');

if (!global.__respond__with__singleton) {

  var config = {
    formatError: function(error){
      return {
        error: error.message ? error.message : error
      };
    },
    responders: [
      {
        status: 'resolved',
        when: function(req, object){
          return req.method === 'GET' && (object === null || object === undefined);
        },
        respondWith: function(req, res){
          return res.status(404).json();
        }
      },
      {
        status: 'resolved',
        name: 'Json',
        respondWith: function(req, res, object){
          return res.status(200).json(object);
        }
      },
      {
        status: 'rejected',
        respondWith: function(req, res, err){
          return res.status(500).json({
            error: err.message
          });
        }
      }
    ]
  };

  var respondWith = function(req, res, promise) {
    if (typeof promise === 'function') {
      try {
        promise = promise();
      } catch (e) {
        promise = Promise.reject(e);
      }
    }

    if (!(promise instanceof Promise)) {
      promise = Promise.resolve(promise);
    }

    promise
    .then(function(object) {
      var responder = _.find(config.responders, function(responder){
        return (responder.status === 'resolved' && (responder.when === undefined || responder.when(req, res, object)));
      });

      responder.respond(req, res, object);

      return object;

    })
    .catch(function(error){
      if (typeof error === 'string') {
        error = new Error(error);
      }

      error = config.formatError(error);

      var responder = _.find(config.responders, function(responder){
        return (responder.status === 'rejected' && (responder.when === undefined || responder.when(req, res, error)));
      });

      responder.respond(req, res, error);

      return Promise.reject(error);
    });
  };

  respondWith.configure = function(cb){
    cb(config);
  };

  global.__respond__with__singleton = respondWith;
}

module.exports = global.__respond__with__singleton;
