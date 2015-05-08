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
+ __server__ - runs _build_ task, then starts __express__ server on [localhost:8000](http://localhost:8000)
using [nodemon](http://nodemon.io/).
__BrowserSync__ proxy express server on [localhost:8001](http://localhost:8001),
and reloads page while changes handled in _client/*_ (running before target _build:*_ task).
__BrowserSync__ settings avaliable on [localhost:8002](http://localhost:8002).

+ __server:static__ - light-weight version with __BrowserSync__ **static**(!!) server [localhost:8001](http://localhost:8001).

+ __default__ (__build__) task compiles all sources into _./server/public_ folder.

#JSHint
### Coding rules:
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

##Route to old html markup
Old html markup now placed on the next route: __http://localhost:3000/markup/__
