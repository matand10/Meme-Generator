'use strict'

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function init() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const gallery = getGallery()
    _createPictures()
    renderImgs(gallery)
    onGallerySort()
    renderCanvas()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}


function hamburger() {
    var elBtn = document.getElementById('nav-icon1')
    elBtn.classList.toggle('open')
}

