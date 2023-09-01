import React from "react";
import Header from "./Header";

function Entry(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ email, password });
  }
  return (
    <>
      <Header
        userEmail={props.userEmail}
        link={props.link}
        navigation={props.navigation}
      />
      <main className="entry__content">
        <h2 className="entry__heading">{props.title}</h2>
        <form className="entry__form" name={props.name} onSubmit={handleSubmit}>
          <input
            id="email"
            className="entry__form_input"
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email || ""}
            minLength="2"
            maxLength="200"
            onChange={handleEmailChange}
          />
          <input
            id="password"
            className="entry__form_input"
            type="password"
            name="password"
            required
            placeholder="Пароль"
            value={password || ""}
            minLength="2"
            maxLength="200"
            onChange={handlePasswordChange}
          />
          <button className="entry__button" type="submit">
            {props.button}
          </button>
          {props.children}
        </form>
      </main>
    </>
  );
}

export default Entry;
