import classNames from "classnames";
import s from "./Choices.module.scss";
import { useState } from "react";

export const Choices = ({ children, buttonLabel, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("className: ", className);
  console.log("choices");
  const handleToggle = () => {
    setIsOpen((oldIsOpen) => !isOpen);
  };

  return (
    <div className={classNames(s.choices, className)}>
      <button
        className={classNames(s.btn)}
        type="button"
        onClick={handleToggle}>
        {buttonLabel}
      </button>

      {isOpen && <div className={classNames(s.box)}>{children}</div>}
    </div>
  );
};
