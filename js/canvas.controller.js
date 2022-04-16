'use strict'

let gEditCanvas = false
let gStartPos
let gKeyHistory = '';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function renderCanvas() {
    gCtx.fillStyle = "white"
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const width = gElCanvas.width
    const height = gElCanvas.height
    drawImg(width, height)
}

function drawImg(width, height) {
    let meme = gElCurrSavedMeme ? getCurrSavedMeme() : getMeme()
    let img = new Image();
    img.src = `meme-imgs (square)/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(gUploadImg ? gUploadImg : img, 0, 0, width, height)
        drawText(meme)
    };
}

function drawText(meme) {
    const lines = meme.lines
    lines.forEach(line => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.lineWidth = 2;
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeStyle = line.color
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    })
    setFocus()
}

function onRotate() {

}


function isLineClicked() {
    gEditCanvas = true
    setLine()
    renderMeme()
    setTimeout(setFocus, 0.2)
}


function addletter(letter) {
    if (!gEditCanvas) return
    let currLine = gMeme.selectedLineIdx
    gKeyHistory = gMeme.lines[currLine].txt
    gKeyHistory += letter;
    gMeme.lines[currLine].txt = gKeyHistory
    renderMeme()
}

function removeLetter() {
    if (!gEditCanvas) return
    let currLine = gMeme.selectedLineIdx
    gKeyHistory = gKeyHistory.slice(0, -1)
    gMeme.lines[currLine].txt = gKeyHistory
    renderMeme()
}


function keyUpHandler(ev) {
    if (ev.which === 32) ev.preventDefault();
    var elCanvas = document.querySelector('.canvas-container')
    if (elCanvas.style.display === 'none') return
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZץםןךףאבגדהוזחטיכלמנסעפצקרשת";
    let key = ev.key;
    if (key === 'Backspace') {
        removeLetter();
        return
    }
    if (key === ' ') {
        var letter = ' ';
        addletter(letter);
        return
    }
    for (var i = 0; i < letters.length; i++) {
        if (key === letters[i]) {
            let letter = letters.substring(i, i + 1);
            addletter(letter);
            break;
        }
    }
}


function onEmoji(emoji) {
    createEmojiLine(emoji)
    renderMeme()
}

function drawRect(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.rect(x, y, xEnd, yEnd);
    gCtx.closePath()
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function deSelectLine() {
    gMeme.selectedLineIdx = -1
    renderMeme()
}


function onChangeText(value) {
    setLineText(value)
    renderMeme()
}

function changeMemeColor(value) {
    setTextColor(value)
    renderMeme()
}

function onChangeFontSize() {
    setTextSize()
    renderMeme()
}

function onIncreaseSize(num) {
    setTextSize(num)
    renderMeme()
}

function onDecreaseSize(num) {
    setTextSize(num)
    renderMeme()
}

function onSwitchLine() {
    setLine()
    renderMeme()
    setTimeout(setFocus, 0.2)
}

function onAddText() {
    _createLine()
    renderMeme()
}

function onFocus() {
    setFocus()
}

function onChangeAlignment() {
    changeAlignment()
    renderMeme()
}

function clearMeme() {
    deleteLine()
    renderMeme()
}

function clearRect() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function onDownloadMeme(elLink) {
    download(elLink)
}

function clearCanvas() {
    if (gMeme.selectedLineIdx === -1) return
    deSelectLine()
}

function fitCanvas() {
    if (gMeme.selectedLineIdx > -1) return
    gMeme.selectedLineIdx = 0
    renderMeme()
}

function download(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function onEdit() {
    showCanvas()
}

function onMoveText(direction) {
    setText(direction)
    renderMeme()
}

function onChangeFont(font) {
    changeTextFont(font)
    renderMeme()
}

function onSaveMeme() {
    saveImg()
    openModal()
}



function showSavedMemes() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGallery = document.querySelector('.gallery')
    const elSavedGallery = document.querySelector('.saved-imgs')
    elSavedGallery.style.display = 'grid'
    elGallery.style.display = 'none'
    elCanvasContainer.style.display = 'none'

}

function hideCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGallery = document.querySelector('.gallery')
    const elSavedGallery = document.querySelector('.saved-imgs')
    elSavedGallery.style.display = 'none'
    elGallery.style.display = 'grid'
    elCanvasContainer.style.display = 'none'
    gElCurrSavedMeme = null
    renderImgs(getGallery())
}

function showCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const elGallery = document.querySelector('.gallery')
    const elSavedGallery = document.querySelector('.saved-imgs')
    elSavedGallery.style.display = 'none'
    elGallery.style.display = 'none'
    elCanvasContainer.style.display = 'flex'
}

function toggleLinks() {
    const elGallery = document.querySelector('.gallery')
    const elEdit = document.querySelector('.edit')
    if (elEdit.innerText === 'Edit') {
        showCanvas()
    } else {
        hideCanvas()
        renderCanvas()
        elGallery.style.display = 'grid'
    }
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gElCanvas.width = elContainer.offsetWidth - 100;
    // Unless needed, better keep height fixed.
    //   gCanvas.height = elContainer.offsetHeight
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (gMeme.selectedLineIdx === -1) return
    const meme = getMeme()
    const currLine = gMeme.selectedLineIdx
    const pos = getEvPos(ev)
    if (!meme.lines[currLine].isDrag) return
    const dx = pos.x - meme.lines[currLine].pos.x
    const dy = pos.y - meme.lines[currLine].pos.y
    setMoveText(dx, dy)
    renderMeme()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function addMouseListeners() {
    window.addEventListener("keydown", keyUpHandler, true);
    gElCanvas.addEventListener('dblclick', isLineClicked)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('dblclick', isLineClicked)
    gElCanvas.addEventListener('touchstart', onPicture)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

