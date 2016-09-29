var search = require('./search')
var generateGrams = require('./generateGrams')

module.exports = function fuzzyfind (input, collection, options) {
  if (typeof input !== 'string' || input === '') {
    return collection
  }
  options = options || {}
  var accessor = options.accessor || function(item) { return item }
  var precision = options.precision === undefined ? 1 : options.precision
  var suggestions = []

  var grams = generateGrams(input, precision)
  collection.forEach(function (item) {
    var searchableItem = accessor(item)
    grams.find(function (gram) {
      var match = search(searchableItem).for(gram)
      if (match.found) {
        suggestions.push({
          gram: gram,
          length: match.end - match.start,
          start: match.start,
          searchableItem: searchableItem,
          item: item
        })
      }
      return match.found
    })
  })

  return suggestions.sort(function (a, b) {
    if (a.gram.length !== b.gram.length) {
      return b.gram.length - a.gram.length
    }
    if (a.length !== b.length) {
      return a.length - b.length
    }
    if (a.start !== b.start) {
      return a.start - b.start
    }
    if (a.searchableItem > b.searchableItem) {
      return 1
    }
    if (a.searchableItem < b.searchableItem) {
      return -1
    }
    return 0
  }).map(function (item) {
    return item.item
  })
}
