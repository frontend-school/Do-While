# Do-While
To-Do application.

# Requirements
This project required preinstalled _node_ with _npm_.
Allso need global install of _gulp_, _bower_ and [nodemon](http://nodemon.io/)
```
npm i bower gulp nodemon -g
```

# Installation
This command installs all required npm an bower modules and runs gulp build task:

```
npm run setup
```

# Gulp basic tasks
+ __server__ - runs _watch_ task (_build_ is in _watch_ dependency), starts __mongod__ with _db_ task, then starts __express__ server on [localhost:8000](http://localhost:8000)
using [nodemon](http://nodemon.io/) and watch for server changes. (for take effect need to manual reload page *F5*).

+ __server:static__ - light-weight version with __BrowserSync__ **static**(!!) server [localhost:8001](http://localhost:8001).

+ __default__ (__build__) task compiles all sources into _./server/public_ folder.

+ quality:js - check all js code via JsHint (server and client side).
+ quality:js:client - check client js code via JsHint.
+ quality:js:server - check server js code via JsHint.

# Test

We using [karma](http://karma-runner.github.io/0.12/index.html) as test runner. 
And [jasmine](http://jasmine.github.io/2.3/introduction.html) as testing framework.

## Requirements
Need global install karma and karma-cli (command line script to run karma).
```
    npm i karma karma-cli -g
```

## Scripts

**Run tests**:

```
    npm test
```

**Run tests in tdd mode**: source and test files will be watching for changes and tests will be automatically rerun.

```
    npm run tdd
```


#JSHint
## Coding rules:
+ "__curly__" - This option requires you to always put curly braces around blocks in loops and conditionals.
+ "__eqeqeq__" - This options prohibits the use of == and != in favor of === and !==.
+ "__eqnull__" - This option suppresses warnings about == null comparisons. Such comparisons are often useful when you want to check if a variable is null or undefined.
+ "__latedef__" - This option prohibits the use of a variable before it was defined.
+ "__onevar__" - This option defines using only one var.
+ "__noarg__" - This option prohibits the use of arguments.caller and arguments.callee.
+ "__node__" - This option defines globals available when your code is running inside of the Node runtime environment.
+ "__undef__" - This option prohibits the use of explicitly undeclared variables.
+ "__unused__" - This option warns when you define and never use your variables.

For more info see: __http://jshint.com/docs/options/__

#Route to old html markup
Old html markup now placed on the next route: __http://localhost:3000/markup/__

#MongoDB
##Install
+ Here is link for those who have Ubuntu(eng): __http://www.liquidweb.com/kb/how-to-install-mongodb-on-ubuntu-14-04/__
+ Here is link for those who have Ubuntu(rus) __http://poleshuk.ru/ustanovka-mongodb-na-ubuntu/__
+ Here is link for those who have Windows: __https://www.youtube.com/watch?v=6aWbOrZqvec__
                                      or __https://www.youtube.com/watch?v=QljgMnFFfiM__
                                      or __https://www.youtube.com/watch?v=qIu9qq2UIys__
                                       __"for your choise"__
                                       
##Run
To run database server just type:
```
    npm run db
```