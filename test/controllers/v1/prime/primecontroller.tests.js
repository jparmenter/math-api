'use strict';

describe('PrimeController Tests', function() {
  var mockPrimeService;
  var PrimeController;
  var primeController;
  var req, res, next;

  beforeEach(function() {
    var PrimeService = require('../../../../lib/services/prime/primeservice');
    mockPrimeService = new PrimeService();
    mockPrimeService.getIsPrime = sinon.stub();

    PrimeController = require('../../../../lib/controllers/v1/prime/primecontroller');
    primeController = new PrimeController(mockPrimeService);

    res = { send: function() {}, end: function() {} };
    sinon.stub(res, 'send');
    sinon.stub(res, 'end');
    next = sinon.stub();
  });

  describe('resgisterRoutes()', function() {
    it('is a function', function() {
      expect(PrimeController.registerRoutes).to.be.a('function');
    });

    it('calls server get() with route', function() {
      var server = { get: function() {} };
      sinon.stub(server, 'get');

      PrimeController.registerRoutes(server);
      expect(server.get.calledWith('v1/prime/:number'));
    });
  });

  describe('getIsPrime()', function() {
    it('is a function', function() {
      expect(primeController.getIsPrime).to.be.a('function');
    });

    it('calls primeService getIsPrime() with valid request', function() {
      req = { params: { number: '2'} };
      primeController.getIsPrime(req, res, next);
      expect(mockPrimeService.getIsPrime.calledWith('2'));
    });

    it('calls primeService getIsPrime() empty request', function() {
      req = {};
      primeController.getIsPrime(req, res, next);
      expect(mockPrimeService.getIsPrime.called).to.equal(false);
    });

    it('calls primeService getIsPrime() reqest missing number', function() {
      req = { params: {}};
      primeController.getIsPrime(req, res, next);
      expect(mockPrimeService.getIsPrime.called).to.equal(false);
    });
  });
});