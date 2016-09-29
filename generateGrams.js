module.exports = function generateGrams (word, precision) {
  var wordLength = word.length
  var smallestGram = Math.ceil(wordLength * precision) || 1
  var grams = []
  var gramLength = wordLength
  while (gramLength >= smallestGram) {
    var end = wordLength - gramLength
    for (var start = 0; start <= end; start++) {
      var gram = word.substr(start, gramLength)
      if (grams.indexOf(gram) === -1) grams.push(gram)
    }
    gramLength--
  }
  return grams
}
