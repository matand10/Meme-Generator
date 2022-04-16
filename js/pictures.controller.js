'use strict'


function loadSavedMemes() {
    if (!loadFromStorage(SAVED_MEME)) return
    let memes = loadFromStorage(SAVED_MEME)
    showSavedMemes()
    renderSavedMeme(memes)
}

function renderSavedMeme(memes) {
    const elSavedImgs = document.querySelector('.saved-imgs')
    let strHTML = memes.map(meme => `
    <img class="saved-gallery" onclick="openSavedMeme(this, ${meme.selectedImgId})" src="meme-imgs (square)/${meme.selectedImgId}.jpg">
    `)
    elSavedImgs.innerHTML = strHTML.join('')
}

function openSavedMeme(elImg, id) {
    let memes = loadFromStorage(SAVED_MEME)
    let meme = memes.find(meme => meme.selectedImgId === id)
    gElCurrSavedMeme = elImg
    gCurrSavedMeme = meme
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText(meme, gElCanvas.width / 2)
    showCanvas()
}


function renderMapWords() {
    const words = getPupolarWords()
    const elPopularWords = document.querySelector('.sort-by-name')
    const strHTML = words.map(word => `
    <h5 class="popular-words" onclick="searchImgByWord('${word}'); inceaseWordSize('${word}')">${word}</h5>`)
    elPopularWords.innerHTML = strHTML.join('')
    setWordSize()
}




function inceaseWordSize(key) {
    let mostPopular
    if (!loadFromStorage(POPULAR_WORDS)) mostPopular = getMostPoplularWords()
    else mostPopular = loadFromStorage(POPULAR_WORDS)
    console.log(mostPopular);
    if (mostPopular[key] === 20) return
    mostPopular[key] += 2
    saveSize(mostPopular)
    setWordSize()
}

function searchImgByWord(word) {
    let sortedGallery = getSortedGallery()
    sortedGallery.splice(0, sortedGallery.length)
    getKeyWords(word)
}

function setWordSize() {
    const elLinks = document.querySelectorAll('.popular-words')
    let mostPopular
    if (!loadFromStorage(POPULAR_WORDS)) mostPopular = getMostPoplularWords()
    else mostPopular = loadFromStorage(POPULAR_WORDS)
    let i = 0
    for (let key in mostPopular) {
        elLinks[i].style.fontSize = (mostPopular[key] * 3) + 'px'
        i++
    }
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