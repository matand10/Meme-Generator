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
            font: 'Montserrat'
            // pos: { x: 10, y: 50 },
            // isDrag: false
        },

        {
            txt: 'I somet',
            size: 30,
            align: 'center',
            height: 400,
            width: gElCanvas.width / 2,
            color: 'black',
            font: 'Montserrat'
            // pos: { x: 10, y: 400 },
            // isDrag: false
        },
    ]
}

function moveText(direction) {
    let lineNum = gMeme.selectedLineIdx
    let currLine = gMeme.lines[lineNum]
    if (direction === 'down') {
        currLine.height += 10
    } else if (direction === 'up') {
        currLine.height -= 10
    } else if (direction === 'right') {
        currLine.width += 10
    } else if (direction === 'left') {
        currLine.width -= 10
    }
}

function checkAlignFocus() {
    let lineNum = gMeme.selectedLineIdx
    let txt = gMeme.lines[lineNum].txt
    let x = gMeme.lines[lineNum].width
    let y = gMeme.lines[lineNum].height

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

function setLineText(txt) {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].txt = txt
}

function setTextColor(color) {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].color = color
}

function setTextSize(size) {
    let lineNum = gMeme.selectedLineIdx
    if (gMeme.lines[lineNum].size > 60) gMeme.lines[lineNum].size = 60
    if (gMeme.lines[lineNum].size < 20) gMeme.lines[lineNum].size = 20
    gMeme.lines[lineNum].size += size
}

function setLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setFocus() {
    checkAlignFocus()
}

function deleteLine() {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines.splice(lineNum, 1)
}

function changeTextFont(font) {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].font = font
}

function saveImg() {
    const { selectedImgId, selectedLineIdx, lines } = gMeme
    const savedMeme = {
        selectedImgId,
        selectedLineIdx,
        lines
    }
    gSavedMemes.push(savedMeme)
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
        font: 'Montserrat'
    }
    lines.push(line)
}

function changeAlignment() {
    let lineNum = gMeme.selectedLineIdx
    gMeme.lines[lineNum].width = gElCanvas.width / 2
}

// function isTextClicked(clickedPos) {
//     let lineNum = gMeme.selectedLineIdx
//     let txt = gMeme.lines[lineNum].txt
//     let x = gElCanvas.width / 2
//     let y = gMeme.lines[lineNum].height
//     // center - x - gCtx.measureText(txt).width / 2, y - parseInt(gCtx.font) * 1.5, gCtx.measureText(txt).width, parseInt(gCtx.font) * 2


//     const pos = { x, y }
//     console.log('pos', pos);
//     const distance = pos.x * pos.y
//     console.log(distance);
//     // return distance <= gCircle.size


// }


// function setTextDrag(isDrag) {
//     let lineNum = gMeme.selectedLineIdx
//     gMeme.lines[lineNum].isDrag = isDrag
// }

// function moveText(dx, dy) {
//     let lineNum = gMeme.selectedLineIdx
//     gMeme.lines[lineNum].pos.x += dx
//     gMeme.lines[lineNum].pos.y += dy
// }


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}