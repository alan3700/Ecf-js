const overlap = document.querySelector(".overlap");
const modalTitle = document.querySelector(".titleModal");
const modalArtist = document.querySelector(".artistModal");
const modalAlbum = document.querySelector(".albumModal");
const modalLenght = document.querySelector(".lengthModal");
const modalContent = document.querySelector("#modal .modal-content");
const modalButton = document.querySelector(".btn-modal");

function showModal() {
    overlap.hidden = false;
}

function hideModal() {
    overlap.hidden = true;
}

modalButton.addEventListener("click", function(){
    hideModal()
    modalContent.textContent =' ';
});
