function Card(props) {
    function handleOnCardClick() {
        props.onCardClick(props)
    }

    return (
        <li>
            <div className="element">
                <img className="element__foto" style={{ backgroundImage: `url(${props.link})` }} onClick={handleOnCardClick} />
                <div className="element__place">
                    <h2 className="element__place-name">{props.name}</h2>
                    <div className="element__like-container">
                        <button type="button" className="element__like"></button>
                        <p className="element__amount-likes">{props.likes}</p>
                    </div>
                </div>
                <button type="button" className="element__delete"></button>
            </div>
        </li>
    );
}

export default Card;