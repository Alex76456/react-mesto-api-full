//УСТАНАВЛИВАЕМ КОНФИГ ДЛЯ ВАЛИДАЦИИ ПОПАПОВ:---------------------------------------------------

export const validationPopupsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldsetSelector: '.popup__form-set',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//----------------------------

//КОНСТАНТЫ: --------------------------

export const elementsContainer = document.querySelector('.elements__list');


export const popupEdit = document.querySelector('.popup_type_edit');
export const formEdit = popupEdit.querySelector('.popup__form');


export const popupAdd = document.querySelector('.popup_type_add');
export const formAdd = popupAdd.querySelector('.popup__form');


export const popupAvatar = document.querySelector('.popup_type_avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form');

export const popupImage = document.querySelector('.popup_type_image');
export const popupConfirm = document.querySelector('.popup_type_confirm');


export const name = document.querySelector('.profile__title');
export const job = document.querySelector('.profile__subtitle');
export const avatar = document.querySelector('.profile__avatar-container');
export const avatarImage = document.querySelector('.profile__avatar');


export const nameInput = popupEdit.querySelector('.popup__input_type_name');
export const jobInput = popupEdit.querySelector('.popup__input_type_job');

export const placeInput = popupAdd.querySelector('.popup__input_type_place');
export const linkInput = popupAdd.querySelector('.popup__input_type_link');

export const avatarLinkInput = popupAvatar.querySelector('.popup__input_type_avatar-link');


export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

export const standartCard = document.querySelector('#element-template').content.querySelector('.elements__list-item');


// ----------------------------