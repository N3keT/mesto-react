import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isOpen: false});
    const [currentUser, setCurrentUser] = useState({});
    const[cards, setCards] = useState([]);
    const [cardDelete, setCardDelete] = useState({});

    useEffect(() => {
        api.getInitialCards()
        .then((cards) => {
            setCards(cards);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        api.getUserInfo()
        .then((user) => {
            setCurrentUser(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards(cards.filter((c) => {
                return c._id !== card._id;
            }));
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
        .then((result) => {
            setCards([result, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleDeletePlaceClick(card) {
        setDeletePlacePopupOpen(true);
        setCardDelete(card);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setDeletePlacePopupOpen(false);
        setSelectedCard({isOpen: false});
    }

    function handleCardClick(card) {
        setSelectedCard({
            isOpen: true,
            link: card.link,
            name: card.name,
        });
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
        .then((result) => {
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handleUpdateAvatar(data) {
        api.setAvatar(data)
        .then((result) => {
            setCurrentUser(result);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page_background">
                <div className="page">
                    <Header />
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePlaceClick}
                        />
                    <Footer />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <DeletePlacePopup
                        isOpen={isDeletePlacePopupOpen}
                        onClose={closeAllPopups}
                        onDeletePlace={handleCardDelete}
                        card={cardDelete}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
