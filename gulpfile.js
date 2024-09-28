const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const terser = require('gulp-terser')
const path = require('path')

// Caminhos dos arquivos
const paths = {
  styles: {
    src: 'src/sass/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src: 'src/images/*',
    dest: 'dist/images/'
  }
}

// Compilação do SASS
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
}

// Compressão de imagens usando importação dinâmica
async function images() {
  const imagemin = await import('gulp-imagemin')
  return gulp
    .src(paths.images.src)
    .pipe(imagemin.default())
    .pipe(gulp.dest(paths.images.dest))
}

// Compressão de código JavaScript
function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest))
}

// Monitoramento de mudanças
function watch() {
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, images)
}

// Exporta as tarefas
exports.styles = styles
exports.images = images
exports.scripts = scripts
exports.watch = watch
exports.default = gulp.series(styles, images, scripts)
