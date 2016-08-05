module.exports = function search (haystack) {
  haystack = haystack.toLowerCase()
  var self = {
    for: (needle, fromIndex) => {
      var foundStart = haystack.indexOf(needle[0].toLowerCase(), fromIndex || 0)
      var notFound = foundStart === -1
      var lastIteration = needle.length === 1
      if (notFound) { return { found: false } }
      if (lastIteration) {
        return { found: true, start: foundStart, end: foundStart + 1 }
      }

      var next = self.for(needle.slice(1), foundStart+1)
      next.start = foundStart
      return next
    }
  }
  return self
}
