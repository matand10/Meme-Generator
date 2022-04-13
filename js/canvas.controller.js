'use strict'

var gElCanvas
var gCtx

function renderCanvas() {
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const width = gElCanvas.width
    const height = gElCanvas.height
    let meme = getMeme()
    drawImg(meme, width, height)
}



function drawImg(meme, width, height) {
    let img = new Image();
    img.src = `meme-imgs (square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, width, height)
        drawText(meme, width / 2, height / 2)
    };
}

function drawText(meme, x, y) {
    gCtx.font = `${meme.lines[0].size}px Impact`
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.textBaseline = 'Top'
    gCtx.textAlign = `${meme.lines[0].align}`
    gCtx.lineWidth = 2;
    gCtx.fillStyle = `${meme.lines[0].color}`;
    gCtx.fillText(meme.lines[0].txt, x, y);
    gCtx.strokeText(meme.lines[0].txt, x, y);
    gCtx.fill();
}

function onChangeText(value) {
    setLineText(value)
    renderMeme()
}

function changeMemeColor(value) {
    setTextColor(value)
    renderMeme()
}

function onChangeFontSize(size) {
    setTextSize(size)
    renderMeme()
}

function onSwitchLine() {

}

function onEdit() {
    toggleLinks()
}

function hideCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'block'
    elCanvasContainer.hidden = true
}

function showCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    elCanvasContainer.hidden = false
}

function toggleLinks() {
    const elGallery = document.querySelector('.gallery')
    const elEdit = document.querySelector('.edit')
    if (elEdit.innerText === 'Edit') {
        elEdit.innerText = 'Main'
        showCanvas()
    } else {
        hideCanvas()
        renderCanvas()
        elEdit.innerText = 'Edit'
        elGallery.style.display = 'grid'
    }
}
