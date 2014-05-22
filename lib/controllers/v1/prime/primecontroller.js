'use strict';

var PrimeController = function(primeService) {
  this.primeService = primeService;
};

PrimeController.registerRoutes = function(server) {
  var PrimeController = this;

  server.get('v1/prime/:number', function(req, res, next) {
    var primeController = req.injector.get(PrimeController);
    primeController.getIsPrime(req, res, next);
  });
};

(function(PrimeController) {
  var getPrimeSuccess = function(res, primeData) {
    res.send(primeData);
    res.end();
  };

  var getPrimeError = function(res, primeData) {
    res.send(404, primeData);
    res.end();
  };

  PrimeController.prototype = {
    getIsPrime: function(req, res, next) {
      var number = '';
      if (req && req.params && req.params.number) {
        number = req.params.number;
        this.primeService.getIsPrime(number,
          function(primeData) { getPrimeSuccess(res, primeData); },
          function(primeData) { getPrimeError(res, primeData); });
      }
      else {
        res.send(400, { error: 'Route parameter "number" is required' });
        res.end();
      }
    }
  };
})(PrimeController);

module.exports = WeatherController;