'use strict'

let gEmojy = ['🤯', '😎', '😉', '😍', '😋', '🤣', '😒', '💣']

let gNextIdx = gEmojy.length
let gPrevIdx = gEmojy.length - 4

function renderEmojies() {
    const emojies = gEmojy.slice(gPrevIdx, gNextIdx)
    const elEmojy = document.querySelector('.emojy-container')
    const strHTML = emojies.map(emojy => `
    <p onclick="onEmoji('${emojy}')">${emojy}</p>
    `)
    elEmojy.innerHTML = strHTML.join('')
}

function onClickRight() {
    gNextIdx++
    gPrevIdx++
    if (gNextIdx > gEmojy.length - 1) {
        gNextIdx = 4
        gPrevIdx = 0
    }
    renderEmojies()
}

function onClickLeft() {
    gNextIdx--
    gPrevIdx--
    if (gNextIdx === 3) {
        gNextIdx = gEmojy.length - 1
        gPrevIdx = gEmojy.length - 5
    }
    renderEmojies()
}