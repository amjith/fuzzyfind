var fuzzy = require('../')
var test = require('tape')

function genItem (length) {
    var text = '', i
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function genItems (collectionLen, itemLen) {
  var collection = [], i
  for (i = 0; i < collectionLen; i++) {
    collection.push(genItem(itemLen))
  }
  return collection
}

test('large set', function(t) {
  t.plan(4)

  var collection = genItems(500, 800)
  var query = genItem(20)

  var startTime = new Date()
  fuzzy(query, collection)
  var endTime = new Date()

  var actualDuration = endTime - startTime
  var expectedTime = 25

  t.ok(actualDuration < expectedTime, 'wanted ' + actualDuration + 'ms to be less than ' + expectedTime + 'ms')
  t.equal(collection.length, 500, 'The collection should contain 500 items')
  t.equal(collection[0].length, 800, 'The items in the collection should be 800 chars long')
  t.equal(query.length, 20, 'The search query should be 20 characters long')
})
