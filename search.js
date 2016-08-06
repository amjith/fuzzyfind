module.exports = function search (haystack) {
  haystack = haystack.toLowerCase()
  var self = {
    for: (needle) => {
      var foundIndex = 0
      var result = {found: true}
      for (var i = 0; i< needle.length; i++){
        foundIndex = haystack.indexOf(needle[i].toLowerCase(), foundIndex)
        if (foundIndex === -1) { return { found: false } }
        if (i == 0) result.start = foundIndex
        result.end = foundIndex + 1
      }
      return result
    }
  }
  return self
}
