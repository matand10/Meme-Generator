function openModal() {
    var elAlert = document.querySelector('.alert-container')
    var elSpan = document.querySelector('.alert-container span')
    elAlert.style.display = 'flex'
    elAlert.classList.add('open')
    elSpan.innerText = 'Meme saved!'
    closeModal()
}

function closeModal() {
    var elAlert = document.querySelector('.alert-container')
    setTimeout(() => {
        elAlert.classList.remove('open')
    }, 3000)
}

function onAbout() {
    var modal = document.querySelector('.modal');
    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}