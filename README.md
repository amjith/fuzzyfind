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

The algorithm used is a direct translation from Python to JS from this blog: http://blog.amjith.com/fuzzyfinder-in-10-lines-of-python.
