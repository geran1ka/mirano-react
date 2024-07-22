import { useState } from "react";
import { API_URL } from "../../const";
import s from "./CartItem.module.scss";

export const CartItem = ({ id, name, price, photoUrl, quantity }) => {
  const [quantityValue, setQuantityValue] = useState(quantity);

  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className={s.itemTitle}>{name}</h4>
      <div className={s.counter}>
        <button className={s.counterBtn}>-</button>
        <input
          className={s.counterInput}
          type="number"
          max="99"
          min="0"
          value={quantityValue}
          onChange={(e) => {
            setQuantityValue(e.target.value);
          }}
        />
        <button className={s.counterBtn}>+</button>
      </div>
      <p className={s.price}>{price}&nbsp;₽</p>
    </li>
  );
};
