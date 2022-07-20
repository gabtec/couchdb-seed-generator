# Couchdb Seed Generator

This is a cli tool to extract data from a couchdb instance and then seed it to another couchdb instance using npm couchdb-bootstrap.

<img src="https://github.com/gabtec/couchdb-seed-generator/blob/main/assets/title.png">

It is a perfect complement for couchdb-bootstrap npm package, that can be found at:
<https://github.com/jo/couchdb-bootstrap>

## Usage (out of date)

```js
$ npm i -D https://github.com/gabtec/couchdb-seed-generator

// option A - developer will write seed files, from this generated template
$ couchdb-seed static [-o ./couchdb]
or
// option B - the files to be seeded are read from another couchdb instance 
$ couchdb-seed "http://admin:admin@localhost:5984" [-o ./couchdb]
```

## Options

```js
$ couchdb-seed <mode> [options]

mode: (must be first argument)
- static - will generate the basic files needed for a basic config (e.g. add CORS to couchdb)
- http://user:passw@ip:5984 - the couchdb instance url

options:
-h - show help (will ignore any other arguments)
-v - show version (will ignore any other arguments)
-o /path/to/output dir (default is ./couchdb)
```

## Author

Gabriel

## Warning

If you get this error "You can't edit the security object of the user database.", it's because you are trying to edit _users/_security.json file.

Please read: <https://docs.couchdb.org/en/3.2.2/config/couchdb.html>

How to fix it:

- Add this line to "_config.json" file, in "[couchdb]" section:

  users_db_security_editable=true

From couchdb docs you can read:

```js
  When this configuration setting is set to false, 
  reject any attempts to modify the _users database security object. 
  Modification of this object is deprecated in 3.x 
  and will be completely disallowed in CouchDB 4.x.
````
