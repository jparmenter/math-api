'use strict';

module.exports = function() {
  return (function() {
    var di = require('di');
    var singletonScopeItems = [];

    // Repositories
    var JsonClientRepository = require('../repositories/http/jsonclientrepository');

    // Services
    var PrimeService = require('../services/prime/primeservice');

    // Controllers
    var ErrorControllerV1 = require('../controllers/v1/error/errorcontroller');
    var PrimeControllerV1 = require('../controllers/v1/prime/primecontroller');

    function handleConfigureDependencies(req) {
      bindSingletonScopeDependencies();
      bindRequestScopeDependencies(req);
    }

    function bindSingletonScopeDependencies() {
      if (!global.injector) {
        // Repositories
        bindSingletonScopeItem(JsonClientRepository, new di.Inject());

        // Services
        bindSingletonScopeItem(PrimeService, new di.Inject(JsonClientRepository));
        global.injector = new di.Injector(singletonScopeItems);
      }
    }

    function bindRequestScopeDependencies(req) {
      req.requestScopeItems = [];

      // Controllers
      bindRequestScopeItem(req, ErrorControllerV1, new di.Inject());
      bindRequestScopeItem(req, PrimeControllerV1, new di.Inject(PrimeService));

      req.injector = global.injector.createChild(req.requestScopeItems);
    }

    function bindSingletonScopeItem(item, inject) {
      di.annotate(item, inject);
      singletonScopeItems.push(item);
    }

    function bindRequestScopeItem(req, item, inject) {
      di.annotate(item, inject);
      req.requestScopeItems.push(item);
    }

    return {
      configureDependencies: handleConfigureDependencies
    };
  })();
};