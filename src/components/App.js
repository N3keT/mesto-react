import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({isOpen: false});

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard({isOpen: false});
    }

    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            link: card.link,
            name: card.name,
        });
    }

  return (
        <div className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                />
            <Footer />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                name='profile'
                title='Редактировать профиль'
                button='Сохранить'
                children={
                    <>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="popup__input popup__input_type_name"
                            placeholder="Имя"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                        <span className="popup__input-error popup__input-error_field_name"></span>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            className="popup__input popup__input_type_about"
                            placeholder="О себе"
                            minLength="2"
                            maxLength="200"
                            required
                        />
                        <span className="popup__input-error popup__input-error_field_about"></span>
                    </>
                }
            />
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                name='add'
                title='Новое место'
                button='Создать'
                children={
                    <>
                        <input
                        type="text"
                        name="name" 
                        id="foto" 
                        className="popup__input popup__input_type_name" 
                        placeholder="Название"
                        minLength="2"
                        maxLength="30"
                        required
                        />
                        <span className="popup__input-error popup__input-error_field_place"></span>
                        <input
                        type="url"
                        name="link"
                        id="link"
                        className="popup__input popup__input_type_about"
                        placeholder="Ссылка на картинку"
                        required
                        />
                        <span className="popup__input-error popup__input-error_field_link"></span>
                    </>
                }
            />
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                name='avatar'
                title='Обновить аватар'
                button='Сохранить'
                children={
                    <>
                        <input
                        type="url"
                        name="avatar"
                        id="linkAvatar"
                        className="popup__input popup__input_type_about"
                        placeholder="Ссылка на картинку"
                        required
                        />
                        <span className="popup__input-error popup__input-error_field_link"></span>
                    </>
                }
            />
            <div id="delete" className="popup">
                <div className="popup__container">
                    <h3 className="popup__heading">Вы уверены?</h3>
                    <form className="popup__form" name="avatarForm" noValidate>
                        <button name="submit" type="submit" className="popup__submit-button">Да</button>
                    </form>
                    <button type="button" className="popup__close"></button>
                </div>
            </div>
        </div>
    );
}

export default App;
