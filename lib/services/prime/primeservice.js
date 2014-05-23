'use strict';

var PrimeService = function() {
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

  var isPrime = function(sNumber) {
    var number = parseInt(sNumber);
    var i = Math.sqrt(number);
    var prime = true;

    while (i > 1) {
      if (i % number === 0) {
        prime = false;
        break;
      }
      i--;
    }
    return prime;
  };

  var primeServiceSuccess = function(number, success, error) {
    var numberData = require('../../models/primedata')();

    numberData.number = number;
    numberData.isPrime = isPrime(number);
    success(numberData);
  };

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
        primeServiceSuccess(number, success, error);
      }
    }
  };
})(PrimeService);

module.exports = PrimeService;