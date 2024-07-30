import classNames from "classnames";
import s from "./Choices.module.scss";
import { useEffect, useRef } from "react";
import { adjustElementPosition, debounce } from "../../util";

export const Choices = ({
  children,
  buttonLabel,
  className,
  isOpen,
  onToggle,
}) => {
  const choiseRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      adjustElementPosition(choiseRef.current);
    }

    const debAdjustElementPosition = debounce(() => {
      if (isOpen) {
        adjustElementPosition(choiseRef.current);
      }
    }, 100);

    window.addEventListener("resize", debAdjustElementPosition);

    return () => {
      window.removeEventListener("resize", debAdjustElementPosition);
    };
  }, [isOpen]);

  return (
    <div className={classNames(s.choices, className)}>
      <button
        className={classNames(s.btn, !isOpen && s.btn_open)}
        type="button"
        onClick={onToggle}>
        {buttonLabel}
      </button>

      {isOpen && (
        <div className={classNames(s.box)} ref={choiseRef}>
          {children}
        </div>
      )}
    </div>
  );
};
