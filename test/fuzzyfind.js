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

test('readme precision example', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('djmi', collection, { precision: 0.5 }), ['django_migrations.py', 'django_admin_log.py', 'migrations.py'])
})

test('Fuzzy Match Ranking', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('mi', collection), ['migrations.py', 'django_migrations.py', 'django_admin_log.py'])
})

test('Fuzzy Case-insensitive Match Ranking', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('MI', collection), ['migrations.py', 'django_migrations.py', 'django_admin_log.py'])
})

test('Uses Accessor', function (t) {
  t.plan(1)
  var objCollection = collection.map(function(name) {
    return { name: name }
  })
  t.deepEqual(fuzzy('mi', objCollection, { accessor: function(item) {
    return item.name
  }}), [{name: 'migrations.py'}, {name: 'django_migrations.py'}, {name: 'django_admin_log.py'}])
})

test('Fuzzy Match non-greedy', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('user', collection), ['user_group.doc', 'users.txt', 'api_user.doc'])
})

// Matching doc
test('Default precision searches', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('doc', collection), ['api_user.doc', 'user_group.doc'])
})

// Matching doc
test('Full precision searches', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('doc', collection, { precision: 1 }), ['api_user.doc', 'user_group.doc'])
})

// Matching doc, do, oc
test('Half precision searches', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('doc', collection, { precision: 0.5 }), ['api_user.doc', 'user_group.doc', 'django_admin_log.py', 'django_migrations.py'])
})

// Matching any letter in your query
test('No precision searches', function (t) {
  t.plan(1)
  t.deepEqual(fuzzy('doc', collection, { precision: 0 }), [
    'api_user.doc',
    'user_group.doc',
    'django_admin_log.py',
    'django_migrations.py',
    'accounts.txt',
    'migrations.py'
  ])
})
