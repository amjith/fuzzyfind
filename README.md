## FuzzyFind

FuzzyFind is a matching algorithm for filtering and ranking a list based on
partial user input.

### API

`array fuzzyfind ( string $query , array $collection [, object $options ])`

#### All Options

* `accessor` *function*: Function that transforms your items into strings.
* `precision` *number*: How precise you want your search to be, between 0 and 1.

### Usage

```js
var fuzzyfind = require('fuzzyfind')
var collection = [
    'migrations.py',
    'django_migrations.py',
    'django_admin_log.py',
    'api_user.doc',
    'user_group.doc',
    'users.txt',
    'accounts.txt'
]

console.log(fuzzyfind('djmi', collection))
[ 'django_migrations.py', 'django_admin_log.py' ]
```

If you want to pass in an array of anything other than a string you can also
provide an accessor function as the third argument. This must return a string.

```js
var fuzzyfind = require('fuzzyfind')
var collection = [
    { name: 'migrations.py', size: '12kb'},
    { name: 'django_migrations.py', size: '11kb'},
    { name: 'django_admin_log.py', size: '10kb'},
    { name: 'api_user.doc', size: '9kb'},
    { name: 'user_group.doc', size: '13kb'},
    { name: 'users.txt', size: '12kb'},
    { name: 'accounts.txt', size: '10kb'},
]

function accessorFn (obj) {
    return obj.name
}
console.log(fuzzyfind('djmi', collection, { accessor: accessorFn }))
[ 'django_migrations.py', 'django_admin_log.py' ]
```

Precision can also be defined in your search, if you want to be more inclusive
in your results. The lower your precision the more matches you get, with a
precision of 1 you want to match the full word, while a precision of 0 would be
matching any letter in your query.

The size of the match is taking into account, so having less precision would
just be adding more results to the `end` of your results.

To define precision:

```js
var fuzzyfind = require('fuzzyfind')
var collection = [
    'migrations.py',
    'django_migrations.py',
    'django_admin_log.py',
    'api_user.doc',
    'user_group.doc',
    'users.txt',
    'accounts.txt'
]

console.log(fuzzyfind('djmi', collection, { precision: 0.5 }))
[ 'django_migrations.py', 'django_admin_log.py', 'migrations.py' ]
```

The algorithm was influenced by a blog post about [fuzzy finding][blog].

[blog]: http://blog.amjith.com/fuzzyfinder-in-10-lines-of-python
