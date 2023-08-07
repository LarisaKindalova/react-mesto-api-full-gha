import React from "react";

export default function AuthForm({
  name,
  children,
  onSubmit,
  buttonText,
}) {
  return (
    <form className={`form form_type_${name}`}>
      {children}
      <button
        type="submit"
        className="form__submit-button"
        aria-label="кнопка"
        onClick={onSubmit}
        name={`form__${name}`}
      >
      {buttonText}
      </button>
    </form>
  );
}
