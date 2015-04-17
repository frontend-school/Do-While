# Do-While
To-Do application.

# Requirements
This project required preinstalled _node_ with _npm_.
Allso need global install of _gulp_, _bower_ and _nodemon_
```
npm i bower gulp nodemon -g
```

# Installation
This command installs all required npm an bower modules and compiles all in dist folder :

+ __Windows__:
```
npm install & bower install & gulp
```

+ __Unix__:
```
npm install && bower install && gulp
```

# Gulp basic tasks
+ __server__ - runs _build_ task, then starts __express__ server on __http://localhost:3000__
and reloads page while changes handled in _client/*_ (running before target _build:*_ task).
Also restarts server while changes happens in server sources.

+ __default__ (__build__) task compiles all sources into _./server/public_ folder
