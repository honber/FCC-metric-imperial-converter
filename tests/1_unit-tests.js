/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '3/2L';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '5/2.5L';
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '10/5/2L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      const expected = ['gal','l','mi','km','lbs','kg','gal','l','mi','km','lbs','kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const input = 'abc'
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
        input.forEach(function(ele, i) {
          assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
        })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.32;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1); 
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [10, 'mi'];
      const expected = 16.09;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1); 
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [10, 'km'];
      const expected = 6.21;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1); 
      done();
 
    });
    
    test('Lbs to Kg', function(done) {
      const input = [10, 'lbs'];
      const expected = 4.53;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1); 
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [10, 'kg'];
      const expected = 22.04;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected, 0.1);
      done();
    });

  });

});