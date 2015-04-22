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

+ __default__ (__build__) task compiles all sources into _./server/public_ folder.
