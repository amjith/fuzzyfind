var fuzzy = require('../')
var test = require('tape')
var collection = [
  'migrations.py',
  'django_migrations.py',
  'django_admin_log.py',
  'api_user.doc',
  'user_group.doc',
  'users.txt',
  'accounts.txt'
]

test('Simple Substring match', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('txt', collection), ['users.txt', 'accounts.txt'])
})

test('Simple Substring match with a dot', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('.txt', collection), ['users.txt', 'accounts.txt'])
})

test('Simple fuzzy search', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('djmi', collection), ['django_migrations.py', 'django_admin_log.py'])
})

test('Fuzzy Match Ranking', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('mi', collection), ['migrations.py', 'django_migrations.py', 'django_admin_log.py'])
})

test('Uses Accessor', function (t) {
  t.plan(1)
  var objCollection = collection.map(function(name) {
    return { name: name }
  })
  t.deepEqual(fuzzy('mi', objCollection, function(item) {
    return item.name
  }), [{name: 'migrations.py'}, {name: 'django_migrations.py'}, {name: 'django_admin_log.py'}])
})

test('Fuzzy Match non-greedy', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('user', collection), ['user_group.doc', 'users.txt', 'api_user.doc'])
})
