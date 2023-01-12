const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');

const ttf2woff = require('gulp-ttf2woff');
const fonts = 'app/fonts/*'
const ttf2woff2 = require('gulp-ttf2woff2');
const fontsFile = 'app/scss/_fonts.scss'
const srcFolder = 'app/fonts';
const fs = require('fs-extra')

function ttfToWoff() {
    return src('app/fonts/*')
        .pipe(ttf2woff())
        .pipe(dest('app/fonts'))
        .pipe(src(`${fonts}`))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'));
}

// g
function fontsStyle() {
    fs.readdir(srcFolder, function (err, fontsFiles) {
        if (fontsFiles) {
            //проверяем существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                //если файла нет создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    //записываем подключения шрифтов в файл стилей 
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: '${fontName}';\n\tfont-weight:${fontWeight};\n\tfont-style:normal;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-display:swap;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                //если есть файл,выводим сообщение
                console.log("файл scss/fonts.scss уже существует. Для обновления нужноно его удалить")
            }
        }
    });
    return src(`${srcFolder}`);

    function cb() { }
}




function buildSvg() {
    return src('app/images/icons/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/sprite'));
}



function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false

    })
}


function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({
            outputStyle: 'compressed'
        }))
        .pipe(concat('style.min.css'))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}


function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        // 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        /*'node_modules/swiper/swiper-bundle.min.js.map',
        'node_modules/slick-carousel/slick/slick.js',
         'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
                    
                    'node_modules/mixitup/dist/mixitup.js',
                    'node_modules/rateyo/src/jquery.rateyo.js',                    
                    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
                    'node_modules/swiper/swiper-bundle.js,*/
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                },
                {
                    cleanupIDs: false
                }
                ]
            })

        ]))
        .pipe(dest('dist/images'))

}


function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'

    ], {
        base: 'app'
    })
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}


function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
//  ,svgSprite,
exports.default = parallel(styles, scripts, browsersync, watching, ttfToWoff,fontsStyle,buildSvg);