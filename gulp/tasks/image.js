var gulp = require('gulp'),
    spritesmith = require('gulp.spritesmith'),
    del = require('del'),
    path = require('path'),
    config = require('../config'),
    errorDebug = require('../lib/error-debug');

gulp.task('build:img', ['copy:img:pictures', 'build:img:icons']);

//region pictures

gulp.task('copy:img:pictures', ['clean:img:pictures'], function () {
    return gulp.src(config.patterns.src.img.all)
        .pipe(gulp.dest(config.paths.dist.img._root));
});

gulp.task('clean:img:pictures', function (onDone) {
    del(config.patterns.dist.img.pictures, errorDebug(onDone));
});

//endregion

//region icon sprites

gulp.task('build:img:icons', ['clean:img:icons'], function () {
    var imgPath = path.relative(config.paths.dist.css, config.paths.dist.img.icons)
            .replace(/\\/g, '/'),
        retinaImgPath = path.relative(config.paths.dist.css, config.paths.dist.img.retinaIcons)
            .replace(/\\/g, '/');

    var spriteData = gulp.src(config.patterns.src.img.icons.all)
        .pipe(spritesmith({
            retinaSrcFilter: config.patterns.src.img.icons.retina,
            imgPath: imgPath,
            retinaImgPath: retinaImgPath,
            imgName: config.paths.dist.img.__layout.icons,
            retinaImgName: config.paths.dist.img.__layout.retinaIcons,
            cssName: '_icons.scss',
            cssVarMap: function (sprite) {
                sprite.name = 'icon_' + sprite.name.replace('@', '-')
            }
        }));

    spriteData.img.pipe(gulp.dest(config.paths.dist.img._root));
    spriteData.css.pipe(gulp.dest(config.paths.src.scss.core + '/icons'));
});

gulp.task('clean:img:icons', function (onDone) {
    del(config.patterns.dist.img.icons, errorDebug(onDone));
});

//endregion