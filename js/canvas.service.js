'use strict'


let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            align: 'top',
            color: 'red'
        },

        {
            txt: 'Welcome to our Generator',
            size: 30,
            align: 'center',
            color: 'red'
        },

        {
            txt: 'Hello',
            size: 30,
            align: 'bottom',
            color: 'red'
        },
    ]
}

function getMeme() {
    return gMeme
}

function setLineText(txt) {
    gMeme.lines[0].txt = txt
}

function setTextColor(color) {
    gMeme.lines[0].color = `${color}`
}

function setTextSize(size) {
    gMeme.lines[0].size = size
}