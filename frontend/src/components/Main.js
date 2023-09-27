import React from "react";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContex } from "../contexts/CurrentUserContext";

export const PopupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);

function Main(props) {
  const currentUser = React.useContext(CurrentUserContex);
  return (
    <>
      <Header
        userEmail={props.userEmail}
        link={"/sign-in"}
        navigation={"Выйти"}
        signout={props.sugnout}
      />
      <main className="content">
        <section className="profile">
          <div
            className="profile__avatar-conteiner"
            onClick={props.onEditAvatar}
          >
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__heading">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              card={card}
            />
          ))}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Main;
