'use strict'

function getSavedMemes() {
    let memes = loadFromStorage(SAVED_MEME)
    showSavedMemes()
    renderSavedMeme(memes)
}

function renderSavedMeme(memes) {
    const elSavedImgs = document.querySelector('.saved-imgs')
    let strHTML = memes.map(meme => `
    <img class="saved-gallery" src="meme-imgs (square)/${meme.selectedImgId}.jpg">
    `)
    elSavedImgs.innerHTML += strHTML.join('')
}


function renderImgs(imgs) {
    const gallery = imgs
    const elGallery = document.querySelector('.gallery')
    const strHTML = gallery.map(picture => `
    <img class="imgs" src="${picture.src}" alt="" onclick="onPicture(this, ${picture.id})">`)
    elGallery.innerHTML = strHTML.join('')
}

function onPicture(elImg, id) {
    toggleLinks()
    const meme = getMeme()
    meme.selectedImgId = id
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(meme, gElCanvas.width / 2)
}

function onGallerySort() {
    const searchInput = document.querySelector('[data-search]')
    searchInput.addEventListener('input', (e) => {
        let sortedGallery = getSortedGallery()
        const value = e.target.value
        getKeyWords(value)
        if (!getKeywords().includes(value)) {
            sortedGallery.splice(0, sortedGallery.length)
            renderImgs(getGallery())
        }
    })
}