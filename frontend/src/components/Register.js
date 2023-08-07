/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Form from "./Form";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";

export default function Register({setIsToolTipOpen, 
  setIsSuccessMessage, 
  setMessageToolTip, 
  isLoggedIn}) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  React.useEffect(()=>{ 
    setFormValue({
      email: "",
      password: "",
    });
  }, [isLoggedIn]);

  function handleChangeValue(evt) {
    const { name, value } = evt.target;
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleRegisterSubmit(evt) {
    evt.preventDefault();

    const { email, password } = formValue;
    auth.register(email, password)
    .then((data) => {
      setIsToolTipOpen(true);
      setIsSuccessMessage(true);
      setMessageToolTip("Вы успешно зарегистрировались!");
      navigate("/sign-in", { replace: true })
    })
    .catch(err => console.log(`Ошибка: ${err}`))
      setIsToolTipOpen(true);
      setIsSuccessMessage(false);
      setMessageToolTip("Что-то пошло не так! Попробуйте ещё раз.")
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <Form
        title="Регистрация"
        name="register"
        buttonText= "Зарегистрироваться"
        onSubmit={handleRegisterSubmit}
      >
        <input
          className="form__input form_type_register"
          required={true}
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          value={formValue.email || ""}
          onChange={handleChangeValue}
        ></input>
        <span className="form__input-error" />
        <input
          className="form__input auth__input"
          required={true}
          type="password"
          min={6}
          max={12}
          id="password"
          name="password"
          value={formValue.password || ""}
          placeholder="Пароль"
          onChange={handleChangeValue}
          autoComplete="on"
        ></input>
        <span className="form__input-error" />
      </Form>
      <div className="auth_signIn">
        <p className="auth__subtitle"> Уже зарегистрированы? </p>
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </div>
    </div>
  );
}
