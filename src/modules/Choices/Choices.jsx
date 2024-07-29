import classNames from "classnames";
import s from "./Choices.module.scss";

export const Choices = ({
  children,
  buttonLabel,
  className,
  isOpen,
  onToggle,
}) => (
  <div className={classNames(s.choices, className)}>
    <button
      className={classNames(s.btn, !isOpen && s.btn_open)}
      type="button"
      onClick={onToggle}>
      {buttonLabel}
    </button>

    {isOpen && <div className={classNames(s.box)}>{children}</div>}
  </div>
);
