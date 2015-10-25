'use strict'

import gulp     from 'gulp';
import path     from 'path';
import webpack  from 'webpack-stream';
import sync     from 'run-sequence';
import serve    from 'browser-sync';

let root = 'www';
let reload = () => serve.reload();

let resolveToPlugins = (glob) => {
  glob = glob || '';
  return path.join(root, 'js/plugins', glob);
};

let paths = {
  output: root,
  entry: path.join(root, 'js/index.js'),
  js: [
    resolveToPlugins('**/*.js'),
    path.join(root, 'js/index.js')
  ],
  html: [
    path.join(root, '**/*.html')
  ],
  css: [
    path.join(root, '**/*.css')
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

gulp.task('watch', () => {
  let allPaths = [].concat(paths.css, paths.js, paths.html);
  gulp.watch(allPaths, ['webpack', reload]);
});


gulp.task('default', () => {
  sync('webpack', 'serve', 'watch');
});