import classNames from "classnames";
import s from "./Choices.module.scss";

import { useDispatch } from "react-redux";
import {
  closeChoicePrice,
  closeChoiceTypeGoods,
  toggleChoicePrice,
  toggleChoiceTypeGoods,
} from "../../redux/choicesSlice";

export const Choices = ({ children, buttonLabel, className, type, isOpen }) => {
  const dispatch = useDispatch();

  console.log("className: ", className);
  console.log("choices");
  const handleToggle = () => {
    if (type === "price") {
      dispatch(closeChoiceTypeGoods());
      dispatch(toggleChoicePrice());
    }

    if (type === "typeGoods") {
      dispatch(closeChoicePrice());
      dispatch(toggleChoiceTypeGoods());
    }
    // setIsOpen((oldIsOpen) => !isOpen);
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
