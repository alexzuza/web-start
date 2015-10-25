'use strict'

import gulp         from 'gulp';
import path         from 'path';
import webpack      from 'webpack-stream';
import sync         from 'run-sequence';
import serve        from 'browser-sync';
import postcss      from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

let root = 'www';
let reload = () => serve.reload();

let resolveToPlugins = (glob) => {
  glob = glob || '';
  return path.join(root, 'js/plugins', glob);
};

let resolveToLibrary = (glob) => {
  glob = glob || '';
  return path.join(root, 'js/library', glob);
};

let paths = {
  output: root + '/build/',
  entry: path.join(root, 'js/index.js'),
  js: [
    resolveToPlugins('**/*.js'),
    resolveToLibrary('**/*.js'),
    path.join(root, 'js/index.js')
  ],
  html: [
    path.join(root, '**/*.html')
  ],
  css: [
    path.join(root, '**!(build)/*.css')
  ]
};

gulp.task('serve', () => {
  serve({
    port: process.env.PORT || 3000,
    server: { baseDir: root }
  });
});

gulp.task('webpack', () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    ];
    return gulp.src(paths.css)
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.output));
});

gulp.task('watch', () => {
  let allPaths = [].concat(paths.js, paths.html);
  gulp.watch(allPaths, ['webpack', reload]);
  gulp.watch(paths.css, ['css', reload]);
});

gulp.task('default', () => {
  sync('webpack', 'css', 'serve', 'watch');
});