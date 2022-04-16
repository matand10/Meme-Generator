'use strict'

function init() {
    if (loadFromStorage(SAVED_MEME)) gSavedMemes = loadFromStorage(SAVED_MEME)
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    const gallery = getGallery()
    addMouseListeners()
    addTouchListeners()
    _createPictures()
    renderImgs(gallery)
    onGallerySort()
    renderCanvas()
    renderEmojies()
    mapKeywords()
    countWordApperances()
    renderMapWords()
    getMostPoplularWords()
    setWordSize()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}


function hamburger() {
    var elBtn = document.getElementById('nav-icon1')
    elBtn.classList.toggle('open')
}

