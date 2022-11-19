import {useEffect, useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
    const[userName, setUserName] = useState('');
    const[userDescription, setUserDescription] = useState('');
    const[userAvatar, setUserAvatar] = useState('');
    const[cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
                setCards(cards);
                // const reverse = cards.reverse();
                // setCard(reverse);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__container-avatar">
                    <img className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
                    <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__name">
                        <h1 className="profile__name-text">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                    <Card
                        key={card._id}
                        link={card.link}
                        name={card.name}
                        likes={card.likes.length}
                        onCardClick={props.onCardClick}
                    />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;