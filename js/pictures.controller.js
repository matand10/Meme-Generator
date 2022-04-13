'use strict'



function renderImgs() {
    const gallery = getGallery()
    const elGallery = document.querySelector('.gallery')
    const strHTML = gallery.map(picture => `
    <img class="imgs" src="${picture.src}" alt="" onclick="onPicture(this, ${picture.id})">`)
    elGallery.innerHTML += strHTML.join('')
}

function onPicture(elImg, id) {
    toggleLinks()
    const meme = getMeme()
    meme.selectedImgId = id
    showCanvas()
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(meme, 250, 250)
}