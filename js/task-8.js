import images from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay')
};

const galleryMarkup = createGalleryList(images);

refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryList.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', onCloseModal)
refs.backdrop.addEventListener('click', onBackDropClick)

function createGalleryList(obj) {
  return obj
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

function openModal(e) {
  window.addEventListener('keydown', onEscKeyPress);
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  };

  refs.modal.classList.add('is-open');
  refs.modalImage.src = e.target.dataset.source;
  refs.modalImage.alt = e.target.alt;
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress)
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

function onBackDropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModal()
  };
}