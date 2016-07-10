FuzzySearch
===========

FuzzySearch is a matching algorithm for filtering and ranking a list based on partial user input. 

eg: 

```js
var fuzzy = require('fuzzysearch')
var collection = [
    'migrations.py',
    'django_migrations.py',
    'django_admin_log.py',
    'api_user.doc',
    'user_group.doc',
    'users.txt',
    'accounts.txt'
]

console.log(fuzzy('djmi', collection))
[ 'django_migrations.py', 'django_admin_log.py' ]
```

If you want to pass in an array of anything other than a string you can als
provide an accessor function as the third argument. This must return a string.

```js
var fuzzy = require('fuzzysearch')
var collection = [
    { name: 'migrations.py', size: '12kb'},
    { name: 'django_migrations.py', size: '11kb'},
    { name: 'django_admin_log.py', size: '10kb'},
    { name: 'api_user.doc', size: '9kb'},
    { name: 'user_group.doc', size: '13kb'},
    { name: 'users.txt', size: '12kb'},
    { name: 'accounts.txt', size: '10kb'},
]

console.log(fuzzy('djmi', collection, function(obj) {
    return obj.name
}))
[ 'django_migrations.py', 'django_admin_log.py' ]
```

The algorithm used is a direct translation from Python to JS from this blog: http://blog.amjith.com/fuzzyfinder-in-10-lines-of-python.
