import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import * as auth from "../utils/auth.js";

export default function Login({ handleLogin, setUserEmail }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChangeValue(evt) {
    const { name, value } = evt.target;
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    auth.login(formValue.email, formValue.password)
      .then(data => {
        handleLogin();
        setUserEmail(formValue.email);
         navigate("/", { replace: true });
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Войти</h1>
      <Form
        title="Вход"
        name="login"
        buttonText="Войти"
        onSubmit={handleLoginSubmit}
      >
        <input
          className="form__input authn_input"
          required={true}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChangeValue}
          value={formValue.email || ""}
        ></input>
        <span className="form__input-error" />
        <input
          className="form__input authn_input"
          required={true}
          type="password"
          min={6}
          max={12}
          id="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChangeValue}
          value={formValue.password || ""}
          autoComplete="on"
        ></input>
      </Form>
    </div>
  );
}
