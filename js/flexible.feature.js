'use strict'

function onRandomMeme() {
    showCanvas()
    randomImg()
}

function randomImg() {
    let gallery = getGallery()
    let img = gallery[getRandomIntInclusive(0, gallery.length)]
    setAsMeme(img)
}

function setAsMeme(img) {
    let meme = getMeme()
    meme.selectedImgId = img.id
    meme.lines.splice(0, getRandomIntInclusive(0, 1))
    meme.lines.forEach(line => {
        line.txt = getRandomStr()
        line.size = getRandomIntInclusive(16, 30)
        line.color = getRandomColor()
    })
    setImg(meme)
}

function setImg(meme) {
    let img = new Image();
    img.src = `meme-imgs (square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0)
        drawText(meme)
    };
}

function getRandomStr() {
    const BANK = ['hello ', 'good ', 'batman ', 'gallses ', 'bottle ', 'toy ', 'enjoy ', 'board ', 'spiderman ', 'holly ', 'spring ', 'back to sleep ', 'check ', 'dog ', 'baby ']
    let txt = ''
    for (let i = 0; i < 3; i++) {
        txt += BANK[getRandomIntInclusive(0, BANK.length - 1)]
        console.log(txt);
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


