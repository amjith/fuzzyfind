var test = require('tape')
var generateGrams = require('../generateGrams')

test('odd character word', function (t) {
  t.plan(1)
  var result = generateGrams('hello', 0.5)
  var expected = ['hello', 'hell', 'ello', 'hel', 'ell', 'llo']
  t.deepEqual(result, expected)
})

test('even character word', function (t) {
  t.plan(1)
  var result = generateGrams('food', 0.5)
  var expected = ['food', 'foo', 'ood', 'fo', 'oo', 'od']
  t.deepEqual(result, expected)
})

test('full precision', function (t) {
  t.plan(1)
  var result = generateGrams('food', 1)
  var expected = ['food']
  t.deepEqual(result, expected)
})

test('duplicates', function (t) {
  t.plan(1)
  var result = generateGrams('ooo', 0)
  var expected = ['ooo', 'oo', 'o']
  t.deepEqual(result, expected)
})

test('no precision', function (t) {
  t.plan(1)
  var result = generateGrams('food', 0)
  var expected = ['food', 'foo', 'ood', 'fo', 'oo', 'od', 'f', 'o', 'd']
  t.deepEqual(result, expected)
})
