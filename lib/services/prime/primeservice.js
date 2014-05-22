'use strict';

var PrimeService = function(jsonClientRepository) {
  if (!jsonClientRepository) {
    throw 'PrimeService: jsonClientRepository is a required dependency';
  }

  this.jsonClientRepository = jsonClientRepository;
};

(function(PrimeService) {

  var isInputValid = function(number, success, error) {
    var valid = false;

    if (!success) {
      throw 'Argument exception, "success" callback is required';
    }

    if (!error) {
      throw 'Argument exception, "error" callback is required';
    }

    if (number && number.length > 0 && parseInt(number)) {
      valid = true;
    }

    return valid;
  };

  var primeServiceSuccess = function(number, success, error) {
    var numberData;

    if (rawNumber)
  }

  var primeServiceError = function(error) {
    var numberData = require('../../models/primedata')();
    numberData.number = '0';
    numberData.isPrime = false;
    error(numberData);
  };

  PrimeService.prototype = {
    getIsPrime: function(number, success, error) {
      if (!isInputValid(number, success, error)) {
        primeServiceError(error);
      }
      else {
        var path = pathFormat.replace('{0}', number);
        this.jsonClientRepository.get(serviceBaseUrl, path, null,
          function(res, obj) { primeServiceSuccess(number, success, error); },
          function(res, err) { primeServiceError(error); });
      }
    }
  }
})(PrimeService);

module.exports = PrimeService;