var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    include = require('gulp-file-include'),
    spritesmith = require('gulp.spritesmith'),
    connect = require('gulp-connect'),
    path = require('path'),
    layout = require('./project-layout'),
    paths = layout.paths,
    patterns = layout.patterns;

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['copy:bower', 'copy:js', 'build:scss', 'build:img', 'copy:fonts', 'build:html']);

//region observing

gulp.task('server', ['build'], function () {
    connect.server({
        port: 8000,
        root: paths.dist._root,
        livereload: true
    })
});

gulp.task('watch', function () {
    gulp.watch(patterns.src.html.all, ['build:html']);
    gulp.watch(patterns.src.scss.all, ['build:scss_light']);
    gulp.watch(patterns.src.js.all, ['copy:js']);
});

//endregion

//region html build

gulp.task('build:html', ['clean:html'], function () {
    return gulp.src(patterns.src.html.pages)
        .pipe(include())
        .pipe(gulp.dest(paths.dist.html))
        .pipe(connect.reload());
});

gulp.task('clean:html', function (onDone) {
    del(patterns.dist.html.all, onDone);
});

//endregion

//region scss build

function buildScss() {
    return gulp.src(paths.src.scss.main)
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(connect.reload());
}

gulp.task('build:scss', ['build:img:icons', 'clean:css'], function () {
    return buildScss();
});

gulp.task('build:scss_light', ['clean:css'], function () {
    return buildScss()
});

gulp.task('clean:css', function (onDone) {
    del(patterns.dist.css.all, onDone);
});

//endregion

//region js copy

gulp.task('copy:js', ['clean:js'], function () {
    return gulp.src(patterns.src.js.all)
        .pipe(gulp.dest(paths.dist.js))
        .pipe(connect.reload());
});

gulp.task('clean:js', function (onDone) {
    del(patterns.dist.js.all, onDone);
});

//endregion

//region img build

gulp.task('build:img', ['copy:img:pictures', 'build:img:icons']);

//region pictures
gulp.task('copy:img:pictures', ['clean:img:pictures'], function () {
    return gulp.src(patterns.src.img.all)
        .pipe(gulp.dest(paths.dist.img._root))
        .pipe(connect.reload());
});

gulp.task('clean:img:pictures', function (onDone) {
    del(patterns.dist.img.pictures, onDone);
});
//endregion

//region icon sprites

gulp.task('build:img:icons', ['clean:img:icons'], function () {
    var imgPath = path.relative(paths.dist.css, paths.dist.img.icons)
            .replace(/\\/g, '/'),
        retinaImgPath = path.relative(paths.dist.css, paths.dist.img.retinaIcons)
            .replace(/\\/g, '/');

    var spriteData = gulp.src(patterns.src.img.icons.all)
        .pipe(spritesmith({
            retinaSrcFilter: patterns.src.img.icons.retina,
            imgPath: imgPath,
            retinaImgPath: retinaImgPath,
            imgName: paths.dist.img.__layout.icons,
            retinaImgName: paths.dist.img.__layout.retinaIcons,
            cssName: '_icons.scss',
            cssVarMap: function (sprite) {
                sprite.name = 'icon_' + sprite.name.replace('@', '-')
            }
        }));

    spriteData.img.pipe(gulp.dest(paths.dist.img._root));
    spriteData.css.pipe(gulp.dest(paths.src.scss.core + '/icons'));
});

gulp.task('clean:img:icons', function (onDone) {
    del(patterns.dist.img.icons, onDone);
});

//endregion

//endregion

//region fonts copy

gulp.task('copy:fonts', ['clean:fonts'], function () {
    return gulp.src(patterns.src.fonts.all)
        .pipe(gulp.dest(paths.dist.fonts))
        .pipe(connect.reload());
});

gulp.task('clean:fonts', function (onDone) {
    del(patterns.dist.fonts.all, onDone);
});

//endregion

//region vendor copy

gulp.task('copy:bower', ['copy:bower:js', 'copy:bower:css']);

//region vendor js copy

gulp.task('copy:bower:js', ['clean:vendor:js'], function () {
    return gulp.src(patterns.bower.js)
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(paths.dist.vendor.js))
        .pipe(connect.reload());
});

gulp.task('clean:vendor:js', function (onDone) {
    del(patterns.dist.vendor.js.all, onDone);
});

//endregion

// region vendor js copy

gulp.task('copy:bower:css', ['clean:vendor:css'], function () {
    return gulp.src(patterns.bower.css)
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(paths.dist.vendor.css))
        .pipe(connect.reload());
});

gulp.task('clean:vendor:css', function (onDone) {
    del(patterns.dist.vendor.css.all, onDone);
});

//endregion

//endregion