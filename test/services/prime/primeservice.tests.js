'use strict';

describe('PrimeService Tests', function() {
  var primeService;

  beforeEach(function() {
    var PrimeService = require('../../../lib/services/prime/primeservice');
    primeService = new PrimeService();
  });

  describe('getIsPrime()', function() {
    it('is a function', function() {
      expect(primeService.getIsPrime).to.be.a('function');
    });

    it('valid prime number', function(done) {
      var error = function() {
        throw 'error callback should NOT be called';
      };

      var success = function(numberData) {
        expect(numberData).to.not.equal(null);
        expect(numberData.number).to.equal('2');
        expect(numberData.isPrime).to.equal(true);
        done();
      };

      primeService.getIsPrime('2', success, error);
    });

    it('valid not prime number', function(done) {
      var error = function() {
        throw 'error callback should NOT be called';
      };

      var success = function(numberData) {
        expect(numberData).to.not.equal(null);
        expect(numberData.number).to.equal('6');
        expect(numberData.isPrime).to.equal(false);
        done();
      };

      primeService.getIsPrime('6', success, error);
    });

    it('undefined number', function(done) {
      var error = function(numberData) {
        expect(numberData).to.not.equal(null);
        expect(numberData.number).to.equal('0');
        expect(numberData.isPrime).to.equal(false);
        done();
      };

      var success = function() {
        throw 'success callback should NOT be called';
      };

      primeService.getIsPrime(null, success, error);
    });

    it('undefined success callback', function() {
      var error = function() {};
      expect(function() { primeService.getIsPrime('2', undefined, error); }).to.throw('Argument exception, "success" callback is required');
    });

    it('undefined error callback', function() {
      var success = function() {};
      expect(function() { primeService.getIsPrime('2', success, undefined); }).to.throw('Argument exception, "error" callback is required');
    });
  });
});