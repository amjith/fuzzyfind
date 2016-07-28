// fuzzysearch
module.exports = function (input, collection, accessor) {
  var suggestions = []
  var escInput = escapeRegExp(input)
  var pattern = escInput.split('').join('.*?')
  var regex = new RegExp(pattern, 'i')
  if (!accessor) {
    accessor = function(item) {
      return item
    }
  }
  collection.forEach(function (item) {
    var match = regex.exec(accessor(item))
    if (match) {
      suggestions.push({length: match[0].length, start: match.index, item: item})
    }
  })

  suggestions.sort(function (a, b) {
    if (a.length > b.length) {
      return 1
    }
    if (a.length < b.length) {
      return -1
    }
    if (a.start > b.start) {
      return 1
    }
    if (a.start < b.start) {
      return -1
    }
    if (a.item > b.item) {
      return 1
    }
    if (a.item < b.item) {
      return -1
    }
    return 0
  })

  return suggestions.map(function (item) {
    return item.item
  })
}

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
