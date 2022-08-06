const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){

    src('src/scss/**/*.scss')//Identificar el/los archivo .scss a compilar
        .pipe(plumber()) //evitar que no corra al correrlo
        .pipe( sass() ) //Compilarlo
        .pipe( dest('build/css') ); //Almacenarlo

    done();
}

//Aligerar imagenes

function imagenes( done ){

    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*{jpg,png}')
    .pipe(cache( imagemin(opciones) ))
    .pipe( dest('build/img') )

    done();
}


//Convertir imagenes a webp
function Vwebp(done){

    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //Buscar las umagenes
    .pipe(webp(opciones))
    .pipe( dest('build/img') );


    done();
}

//Convertir imagenes a formato avif
function Vavif(done){

    const opciones ={
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //Buscar las umagenes
    .pipe(avif(opciones))
    .pipe( dest('build/img') );


    done();
}

function JS( done ){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    done()
}

function dev(done){
    
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', JS);

    done()
}

exports.css = css;
exports.imagenes = imagenes;
exports.Vwebp = Vwebp;
exports.Vavif = Vavif;
exports.JS = JS;
exports.dev = parallel( imagenes,Vwebp, Vavif, dev, JS );