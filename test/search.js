var search = require('../search')
var test = require('tape')

test('matching small string', function (t) {
  t.plan(3)
  var result = search('hello world').for('llw')

  t.ok(result.found, 'Expected to find substring')
  t.equal(result.start, 2, 'Expected to start at index 2')
  t.equal(result.end, 7, 'Expected to end at index 7')
})

test('not matching small string', function (t) {
  t.plan(1)
  var result = search('hello world').for('hellox')

  t.notOk(result.found)
})

test('matching case-insensntive', function (t) {
  t.plan(3)
  var result = search('helLo world').for('LLW')

  t.ok(result.found, 'Expected to find substring')
  t.equal(result.start, 2, 'Expected to start at index 2')
  t.equal(result.end, 7, 'Expected to end at index 7')
})

test('test small search query', function (t) {
  t.plan(3)
  var result = search('hello world').for('w')

  t.ok(result.found, 'Expected to find substring')
  t.equal(result.start, 6, 'Expected to start at index 6')
  t.equal(result.end, 7, 'Expected to end at index 7')
})
