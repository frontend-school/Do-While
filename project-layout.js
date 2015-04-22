var glob = require('./lib/glob'),
    Layout = require('./lib/layout');

var paths = new Layout({
    src: {
        scss: {
            main: 'styles.scss',
            core: 'core'
        },
        js: 'js',
        img: 'img',
        fonts: 'fonts',
        html: {
            _root: '/',
            pages: '',
            components: 'html'
        }
    },
    dist: {
        html: '',
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
        html: {
            _root: '/',
            all: glob(['/*', '/html/**/*'], 'html'),
            pages: glob.allOfType('html')
        },
        js: {
            all: glob.deepAllOfType('js')
        },
        scss: {
            all: glob.deepAllOfType('scss')
        },
        img: {
            icons: {
                all: glob.allOfType('png'),
                retina: glob('/*@2x', 'png')
            },
            all: glob.allOfType()
        },
        fonts: {
            all: glob.deepAllOfType()
        }
    },
    bower: {
        _root: paths.bower,
        js: glob(['/*/dist/*','/*/dest/*', '/*/dist/js/*'], 'js'),
        css: glob(['/*/*', '/*/css/*', '/*/dist/*','/*/dest/*', '/*/dist/css/*'], 'css')
    },
    dist: {
        html: {
            _root: '/',
            all: glob.allOfType()
        },
        js: {all: glob.deepAllOfType()},
        css: {all: glob.deepAllOfType()},
        img: {
            icons: glob('/icons*','png'),
            pictures: [glob.deepAllOfType(), glob('/icons*','png').exclude()],
            all: glob.deepAllOfType()
        },
        fonts: {all: glob.deepAllOfType()},
        vendor: {
            js: {
                all: glob.deepAllOfType('js')
            },
            css: {
                all: glob.deepAllOfType('css')
            },
            all: glob.deepAllOfType()
        }
    }
});

module.exports = {
    paths: paths,
    patterns: patterns
};