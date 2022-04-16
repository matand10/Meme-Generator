'use strict'
const SAVED_MEME = 'memeDB'

let gSavedMemes = []
let gElCanvas
gElCanvas = document.querySelector('#my-canvas')
let gCtx = gElCanvas.getContext('2d')


let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'center',
            height: 50,
            width: gElCanvas.width / 2,
            color: 'black',
            font: 'Montserrat',
            pos: { x: gElCanvas.width / 2, y: 50 },
            isDrag: false
        },

        {
            txt: 'I love Laznia',
            size: 30,
            align: 'center',
            height: 400,
            width: gElCanvas.width / 2,
            color: 'red',
            font: 'Montserrat',
            pos: { x: gElCanvas.width / 2, y: 400 },
            isDrag: false
        },
    ]
}

function setText(direction) {
    let lineNum = gMeme.selectedLineIdx
    let currLine = gMeme.lines[lineNum].pos

    if (direction === 'down') {
        currLine.y += 10
    } else if (direction === 'up') {
        currLine.y -= 10
    } else if (direction === 'right') {
        currLine.x += 10
    } else if (direction === 'left') {
        currLine.x -= 10
    }
}


function checkAlignFocus() {
    let lineNum = gMeme.selectedLineIdx
    if (lineNum === -1) return
    let txt = gMeme.lines[lineNum].txt
    let x = gMeme.lines[lineNum].pos.x
    let y = gMeme.lines[lineNum].pos.y

    switch (gMeme.lines[lineNum].align) {
        case 'center':
            drawRect(x - gCtx.measureText(txt).width / 2, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2)
            break;
        case 'left':
            drawRect(x, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2)
            break;
        case 'right':
            drawRect(x - gCtx.measureText(txt).width, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2)
            break;
    }
}

// Left - x, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2
// center - x - gCtx.measureText(txt).width / 2, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2
// right - x - gCtx.measureText(txt).width, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2


function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function setLineText(txt) {
    let lineNum = gMeme.selectedLineIdx
    let currSavedMeme = getCurrSavedMeme()
    if (gElCurrSavedMeme) currSavedMeme.lines[lineNum].txt = txt
    gMeme.lines[lineNum].txt = txt
}

function setTextColor(color) {
    let lineNum = gMeme.selectedLineIdx
    let currSavedMeme = getCurrSavedMeme()
    if (gElCurrSavedMeme) currSavedMeme.lines[lineNum].color = color
    gMeme.lines[lineNum].color = color
}

function setTextSize(size) {
    let lineNum = gMeme.selectedLineIdx
    if (gMeme.lines[lineNum].size > 60) gMeme.lines[lineNum].size = 60
    if (gMeme.lines[lineNum].size < 20) gMeme.lines[lineNum].size = 20
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        if (currSavedMeme.lines[lineNum].size > 60) currSavedMeme.lines[lineNum].size = 60
        if (currSavedMeme.lines[lineNum].size < 20) currSavedMeme.lines[lineNum].size = 20
        currSavedMeme.lines[lineNum].size += size
    }
    gMeme.lines[lineNum].size += size
}

function setLine() {
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.selectedLineIdx++
        if (currSavedMeme.selectedLineIdx >= currSavedMeme.lines.length) currSavedMeme.selectedLineIdx = 0
    }
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setFocus() {
    checkAlignFocus()
}

function deleteLine() {
    let lineNum = gMeme.selectedLineIdx
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.lines.splice(lineNum, 1)
    }
    gMeme.lines.splice(lineNum, 1)
}

function changeTextFont(font) {
    let lineNum = gMeme.selectedLineIdx
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.lines[lineNum].font = font
    }
    gMeme.lines[lineNum].font = font
}

function saveImg() {
    const { selectedImgId, selectedLineIdx, lines } = gMeme
    const savedMeme = {
        selectedImgId,
        selectedLineIdx,
        lines
    }
    let currSavedMeme = getCurrSavedMeme()
    if (gElCurrSavedMeme) gSavedMemes.push(currSavedMeme)
    else gSavedMemes.push(savedMeme)
    saveToStorage(SAVED_MEME, gSavedMemes)
}

function _createLine() {
    let lines = gMeme.lines
    let line = {
        txt: 'Text here',
        size: 30,
        align: 'center',
        height: 250,
        width: gElCanvas.width / 2,
        color: getRandomColor(),
        font: 'Montserrat',
        pos: { x: gElCanvas.width / 2, y: 250 },
        isDrag: false
    }
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.lines.push(line)
    }
    lines.push(line)
}

function createEmojiLine(emoji) {
    let lines = gMeme.lines
    let line = {
        txt: emoji,
        size: 30,
        align: 'center',
        height: 250,
        width: gElCanvas.width / 2,
        pos: { x: gElCanvas.width / 2, y: 250 },
        isDrag: false
    }
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.lines.push(line)
    }
    lines.push(line)
}

function changeAlignment() {
    let lineNum = gMeme.selectedLineIdx
    if (gElCurrSavedMeme) {
        let currSavedMeme = getCurrSavedMeme()
        currSavedMeme.lines[lineNum].width = gElCanvas.width / 2
    }
    gMeme.lines[lineNum].width = gElCanvas.width / 2
}

function isTextClicked(clickedPos) {
    let lineNum = gMeme.selectedLineIdx
    const { x, y } = gMeme.lines[lineNum].pos
    // if (clickedPos.y - y > 30 || y - clickedPos.y > 30) return false
    const distance = (x - clickedPos.x) + (y - clickedPos.y)
    return distance <= gMeme.lines[lineNum].size
}


function setTextDrag(isDrag) {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].isDrag = isDrag
}

function setMoveText(dx, dy) {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].pos.x += dx
    gMeme.lines[lineNum].pos.y += dy
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

