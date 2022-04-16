'use strict'
const POPULAR_WORDS = 'popularWordsDB'

let gCurrSavedMeme
let gElCurrSavedMeme
let gGallery = []
let gSortedGallery = []
let gKeyWords = []
let gWordMap = {}
let gWordMostPopularMap

function saveSize(mostPopular) {
    saveToStorage(POPULAR_WORDS, mostPopular)
}

function getCurrElSavedMeme() {
    return gElCurrSavedMeme
}

function getCurrSavedMeme() {
    return gCurrSavedMeme
}


function getMostPoplularWords() {
    gWordMostPopularMap = getMostPoplularObject()
    return gWordMostPopularMap
}

function getGallery() {
    return gGallery
}

function getSortedGallery() {
    return gSortedGallery
}

function getMapWords() {
    return gWordMap
}

function getPupolarWords() {
    const wordsMap = getMapWords()
    let pupolarWords = []
    for (let key in wordsMap) {
        if (wordsMap[key] >= 3) pupolarWords.push(key)
        // pupolarWords.push(key)
    }
    return pupolarWords
}


function getKeyWords(value) {
    gGallery.forEach(img => {
        let keywords = img.keywords
        keywords.forEach(word => {
            gKeyWords.push(word)
            if (value.toLowerCase() === word) {
                gSortedGallery.push(img)
                return
            }
        })
    })
    renderImgs(gSortedGallery)
}

function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).
        filter(([key, val]) => callback(val, key)));
}

function getMostPoplularObject() {
    let words = gWordMap
    return filterObject(words, (a) => a >= 3)
}

function countWordApperances() {
    for (var i = 0; i < gSortedGallery.length; i++) {
        var currWord = gSortedGallery[i]
        if (!gWordMap[currWord]) gWordMap[currWord] = 0
        gWordMap[currWord]++
    }
    return gWordMap
}


function mapKeywords() {
    gGallery.forEach(img => {
        let keywords = img.keywords
        keywords.forEach(word => {
            gKeyWords.push(word)
            gSortedGallery.push(word)
        })
    })
}

function getKeywords() {
    return gKeyWords
}

function _createPictures() {
    _createPicture(1, `meme-imgs (square)/${1}.jpg`, ['funny', 'men'])
    _createPicture(2, `meme-imgs (square)/${2}.jpg`, ['funny', 'dog'])
    _createPicture(3, `meme-imgs (square)/${3}.jpg`, ['cute', 'baby'])
    _createPicture(4, `meme-imgs (square)/${4}.jpg`, ['cute', 'cat'])
    _createPicture(5, `meme-imgs (square)/${5}.jpg`, ['baby', 'cute'])
    _createPicture(6, `meme-imgs (square)/${6}.jpg`, ['movie', 'men'])
    _createPicture(7, `meme-imgs (square)/${7}.jpg`, ['baby', 'cute'])
    _createPicture(8, `meme-imgs (square)/${8}.jpg`, ['funny', 'hat'])
    _createPicture(9, `meme-imgs (square)/${9}.jpg`, ['funny', 'babe'])
    _createPicture(10, `meme-imgs (square)/${10}.jpg`, ['men', 'politics'])
    _createPicture(11, `meme-imgs (square)/${11}.jpg`, ['men', 'funny'])
    _createPicture(12, `meme-imgs (square)/${12}.jpg`, ['men', 'funny'])
    _createPicture(13, `meme-imgs (square)/${13}.jpg`, ['drink', 'movie'])
    _createPicture(14, `meme-imgs (square)/${14}.jpg`, ['men', 'glasses'])
    _createPicture(15, `meme-imgs (square)/${15}.jpg`, ['men', 'cigarete'])
    _createPicture(16, `meme-imgs (square)/${16}.jpg`, ['comics', 'funny'])
    _createPicture(17, `meme-imgs (square)/${17}.jpg`, ['politics', 'men'])
    _createPicture(18, `meme-imgs (square)/${18}.jpg`, ['comics', 'funny'])
}

function _createPicture(id, src, keywords) {
    let picture = {
        id,
        src,
        keywords,
    }
    gGallery.push(picture)
}