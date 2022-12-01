import {useEffect, useState, useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    // const[userName, setUserName] = useState('');
    // const[userDescription, setUserDescription] = useState('');
    // const[userAvatar, setUserAvatar] = useState('');
    // const[cards, setCards] = useState([]);
    const currentUser = useContext(CurrentUserContext);

    // function handleCardLike(card) {
    //     const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    //     api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    //         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

    // function handleCardDelete(card) {
    //     api.deleteCard(card._id)
    //     .then(() => {
    //         setCards(cards.filter((c) => {
    //             return c._id !== card._id;
    //         }))
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

    // useEffect(() => {
    //     Promise.all([api.getUserInfo(), api.getInitialCards()])
    //         .then(([user, cards]) => {
    //             // setUserName(user.name);
    //             // setUserDescription(user.about);
    //             // setUserAvatar(user.avatar);
    //             setCards(cards);
    //             // const reverse = cards.reverse();
    //             // setCard(reverse);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__container-avatar">
                    <img className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                    <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__name-text">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        _id={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes}
                        onCardClick={props.onCardClick}
                        owner={card.owner}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;