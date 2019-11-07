
'use strict';
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp'),
    babel = require('gulp-babel'),
    bs = require('browser-sync').create(),
    sass = require('gulp-sass'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

const path = {
    src: {
        html: './src/*.html',
        css: './src/styles/**/*.{css,scss,sass}',
        js: './src/js/**/*.js',
        img: './src/images/**/*',
        fonts: './src/fonts/**/*',
    },
    dist: {
        html: './dist',
        css: './dist/css',
        js: './dist/js',
        img: './dist/img',
        fonts: './dist/fonts',
        maps: './dist/maps',
    },
};

const clean = () => del(path.dist.html);

const html = () => src(path.src.html).pipe(dest(path.dist.html)).pipe(bs.stream());

const css = cb => {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
        }).on('error', (error) => cb(error.message)))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dist.css))
        .pipe(bs.stream());
};

const js = () => {
    return src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dist.js))
        .pipe(bs.stream());
}

const fonts = () => src(path.src.fonts).pipe(dest(path.dist.fonts));

const img = () => src(path.src.img).pipe(dest(path.dist.img));

const serve = () => {
    bs.init({
        logPrefix: 'What I have done',
        server: path.dist.html,
    });
    watch(path.src.html, html, bs.reload);
    watch(path.src.css, css, bs.reload);
    watch(path.src.js, js, bs.reload);
    watch(path.src.fonts, fonts);
    watch(path.src.img, img);
}

exports.clean = clean;
exports.build = series(clean, parallel(html, css, js, fonts, img));
exports.default = series(clean, parallel(html, css, js, fonts, img), serve);