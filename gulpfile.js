
let project_folder = require('path').basename(__dirname);
let source_folder = '#src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        libs_css: project_folder + '/css/libs',
        js: project_folder + '/js/',
        libs_js: project_folder + '/js/libs',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
        css: [source_folder + '/scss/style.scss',
              '!' + source_folder + '/scss/_*.scss',
        ],
        libs_css: source_folder + '/scss/libs/*.css',
        js: [source_folder + '/js/script.js',
             '!' + source_folder + '/js/_*.js'
        ],
        libs_js: source_folder + '/js/libs/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: source_folder + '/fonts/*.{css,scss,ttf,otf,woff,woff2,eot}',
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/scss/**/*.scss',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + '/'
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default;

function browserSync(){
    browsersync.init({
        server:{
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(fileinclude())
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function libs_css(){
    return src(path.src.libs_css)
           .pipe(dest(path.build.libs_css))
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function libs_js(){
    return src(path.src.libs_js)
           .pipe(dest(path.build.libs_js))
}

function images(){
    return src(path.src.img)
           .pipe(dest(path.build.img))
}

function fonts(){
    return src(path.src.fonts)
           .pipe(dest(path.build.fonts))
}

function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function clean(){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, libs_css, js, libs_js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.libs_css = libs_css;
exports.js = js;
exports.libs_js = libs_js;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;

