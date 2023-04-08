const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
// const image = require('gulp-image');

const imagemin = require('gulp-imagemin');

const ttf2woff2 = require('gulp-ttf2woff2');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();


const fonts = () => {
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts'))
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src(['./src/**/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const imgToApp = () => {
  return src(['./src/img/**.jpg', '.src/img/**.png', '.src/img/**.jpeg'])
    .pipe(dest('./app/img'))
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const clean = () => {
  return del('./app/**')
}

const svgSprites = () => {
  return src('./src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('./app/img'))
}

const scripts = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const img = () => {
  return src([
    		'./src/img/**.jpg',
    		'./src/img/**.png',
    		'./src/img/**.jpeg',
    		'./src/img/*.svg',
    		'./src/img/**/*.jpg',
    		'./src/img/**/*.png',
    		'./src/img/**/*.jpeg'
    		])
  .pipe(imagemin())
  .pipe(dest('./app/img'))
}

// const images = () => {
//   return src([
// 		'./src/img/**.jpg',
// 		'./src/img/**.png',
// 		'./src/img/**.jpeg',
// 		'./src/img/*.svg',
// 		'./src/img/**/*.jpg',
// 		'./src/img/**/*.png',
// 		'./src/img/**/*.jpeg'
// 		])
//     .pipe(image())
//     .pipe(dest('./app/img'))
// };

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  watch('./src/scss/**/*.scss', styles)
  watch('./src/js/**/*.js', scripts)
  watch(`src/**/*.html`, htmlInclude)
  watch('./src/img/**.jpg', imgToApp)
  watch('./src/img/**.png', imgToApp)
  watch('./src/img/**.jpeg', imgToApp)

  watch('./src/img/*.{jpg,jpeg,png,svg}', img);


  // watch('./src/img/*.{jpg,jpeg,png,svg}', images);
	// watch('./src/img/**/*.{jpg,jpeg,png}', images);
  watch('./src/img/svg/**/*.svg', svgSprites)
  watch('./src/resources/**', resources)
  watch('./src/fonts/**.ttf', fonts)

}

exports.default = series(clean, parallel(htmlInclude, fonts, scripts, imgToApp, svgSprites, resources), img,  styles, watchFiles);


const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src(
    ['./src/js/components/**.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, svgSprites, resources),img, stylesBuild, watchFiles);
