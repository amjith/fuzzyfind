module.exports = function generateGrams (word, precision) {
  var wordLength = word.length
  var smallestGram = Math.ceil(wordLength * precision) || 1
  var grams = []
  var gramLength = wordLength
  while (gramLength >= smallestGram) {
    var start = 0
    var end = wordLength - gramLength
    for (start; start <= end;start++) {
      var gram = word.substr(start, gramLength)
      if (grams.indexOf(gram) === -1) grams.push(gram)
    }
    gramLength--
  }
  return grams
}
