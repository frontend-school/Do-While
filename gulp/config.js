var glob = require('./lib/glob'),
    Layout = require('./lib/layout');

var paths = new Layout({
    server: {
        app: 'bin/www',
        public: 'public'
    },
    src: {
        _root: 'client',
        scss: {
            main: 'styles.scss',
            core: 'core'
        },
        js: {
            main: 'app.js'
        },
        img: 'img',
        fonts: 'fonts',
        html: {
            _root: '/',
            pages: '',
            components: 'html'
        }
    },
    dist: {
        _root: 'server/public',
        html: {
            _root: '/',
            pages: '',
            views: 'views'
        },
        js: 'js',
        css: 'css',
        img: {
            icons: 'icons.png',
            retinaIcons: 'icons@2x.png'
        },
        fonts: 'fonts',
        vendor: {
            js: 'js',
            css: 'css'
        }
    },
    bower: 'bower_components'
});

var patterns = new Layout({
    src: {
        _root: paths.src._root,
        html: {
            _root: '/',
            pages: glob.allOfType('html'),
            pageComponents: glob.deepAllOfType('html').build('html'),
            views: glob.deepAllOfType('html').build('js')
        },
        js: glob.deepAllOfType('js').build('js'),
        scss: glob.deepAllOfType('scss').build('scss'),
        img: {
            icons: {
                all: glob.allOfType('png'),
                retina: glob('/*@2x', 'png')
            },
            all: glob.allOfType()
        },
        fonts: glob.deepAllOfType().build('fonts')
    },
    dist: {
        _root: paths.server.public,
        all: glob.deepAllOfType(),
        html: {
            _root: '/',
            pages: glob.allOfType(),
            views: glob.deepAllOfType().build('views')
        },
        js: glob.deepAllOfType().build('js'),
        css: glob.deepAllOfType().build('css'),
        img: {
            icons: glob('/icons*', 'png'),
            pictures: [glob.deepAllOfType(), glob('/icons*', 'png').exclude()],
            all: glob.deepAllOfType()
        },
        fonts: glob.deepAllOfType().build('fonts'),
        vendor: glob.deepAllOfType().build('vendor')
    }
});

module.exports = {
    paths: paths,
    patterns: patterns
};