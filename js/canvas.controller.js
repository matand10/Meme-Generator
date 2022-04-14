'use strict'

let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

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

function drawText(meme) {
    const lines = meme.lines
    lines.forEach(line => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align
        gCtx.lineWidth = 2;
        gCtx.fillStyle = line.color
        gCtx.fillText(line.txt, line.width, line.height);
        gCtx.strokeStyle = line.color
        gCtx.strokeText(line.txt, line.width, line.height);
    })
    setFocus()
}

function drawRect(x, y, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.rect(x, y, xEnd, yEnd);
    gCtx.closePath()
    gCtx.lineWidth = 3;
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
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
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function onEdit() {
    showCanvas()
}

function onMoveText(direction) {
    moveText(direction)
    renderMeme()
}

function onChangeFont(font) {
    changeTextFont(font)
    renderMeme()
}

function onSaveMeme() {
    saveImg()
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

// function draw(x, y, ev) {
//     const { offsetX, offsetY } = ev

//     switch (gCurrShape) {
//         case 'line':
//             drawLine(x, y, offsetX, offsetY)
//             break;
//         case 'circle':
//             drawArc(x, y, offsetX, offsetY)
//             break;
//         case 'square':
//             drawSquare(x, y)
//             break;
//         case 'trangle':
//             drawTriangle(x, y, offsetX, offsetY)
//             break;
//     }
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }

//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft,
//             y: ev.pageY - ev.target.offsetTop
//         }
//     }
//     return pos
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isTextClicked(pos)) return
//     setTextDrag(true)
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'
// }

// function onMove(ev) {
//     const meme = getMeme()
//     const currLine = gMeme.selectedLineIdx
//     if (!meme.lines[currLine].isDrag) return
//     const pos = getEvPos(ev)
//     const dx = gStartPos.x
//     const dy = gStartPos.y
//     moveText(dx, dy)
//     gStartPos = pos
//     renderMeme()
// }

// function onUp() {
//     setTextDrag(false)
//     document.body.style.cursor = 'grab'
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', onUp)
// }

