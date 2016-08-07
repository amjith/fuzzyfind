var fuzzy = require('../')
var test = require('tape')

test('Large item', function (t) {
  var totalDuration = 0, i
  var iterations = 500
  for (i = 0;i<iterations;i++) {
    var subset = [
      'Set Versionjavascript:(function()%7Bvar product%3Dwindow.prompt(%27What product%3F%27,%27filterable_errors%27)%3Bvar key %3D %27use_%27 %2B product %2B %27_version%27%3Bvar version%3Dwindow.prompt(%27What version%3F%27,%27hot%27)%3Bvar queries%3Dwindow.location.search.split(/%5B%5C%3F%7C%26%5D%2B/)%3Bqueries%3Dqueries.filter((query)%3D>%7Breturn query%7D)%3Bvar alreadyExists%3Dfalse%3Bqueries.forEach((query,index)%3D>%7Bif(query.includes(key))%7BalreadyExists%3Dtrue%3BqueryParts%3Dquery.split(%27%3D%27)%3BqueryParts%5B1%5D%3Dversion%3Bqueries%5Bindex%5D%3DqueryParts.join(%27%3D%27)%3B%7D%7D)%3Bif(!alreadyExists)%7Bqueries.push(key%2B%27%3D%27%2Bversion)%3B%7Dif(queries.length%3D%3D%3D1)%7Bwindow.location.search%3Dqueries%5B0%5D%3B%7Delse%7Bwindow.location.search%3Dqueries.join(%27%26%27)%3B%7D%7D)()%3B'
    ]
    t.plan(1)
    var start = new Date()
    fuzzy('browser-settings', subset)
    var end = new Date()
    totalDuration += end - start
  }
  var maxTime = iterations * 0.05 // 0.05ms per result
  t.ok(totalDuration < maxTime, 'wanted ' + totalDuration + 'ms to be less than ' + maxTime + 'ms')
})
