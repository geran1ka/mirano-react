import { useState } from "react";
import { API_URL } from "../../const";
import s from "./CartItem.module.scss";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";
import { debounce } from "../../util";

export const CartItem = ({ id, name, price, photoUrl, quantity }) => {
  const dispatch = useDispatch();
  const [quantityValue, setQuantityValue] = useState(quantity);

  const debounceInputChange = debounce((newQuqntityValue) => {
    dispatch(addItemToCart({ productId: id, quantity: newQuqntityValue }));
  }, 500);

  const handleInputChange = (e) => {
    const newQuqntityValue = parseInt(e.target.value);
    setQuantityValue(e.target.value);
    debounceInputChange(newQuqntityValue);
  };

  const handleDecrement = () => {
    const newQuqntityValue = quantityValue - 1;
    setQuantityValue(newQuqntityValue);
    debounceInputChange(newQuqntityValue);
  };
  const handleIncrement = () => {
    const newQuqntityValue = quantityValue + 1;
    setQuantityValue(newQuqntityValue);
    debounceInputChange(newQuqntityValue);
  };

  return (
    <li className={s.item}>
      <img className={s.img} src={`${API_URL}${photoUrl}`} alt={name} />
      <h4 className={s.itemTitle}>{name}</h4>
      <div className={s.counter}>
        <button className={s.counterBtn} onClick={handleDecrement}>
          -
        </button>
        <input
          className={s.counterInput}
          type="number"
          max="99"
          min="0"
          value={quantityValue}
          onChange={handleInputChange}
        />
        <button className={s.counterBtn} onClick={handleIncrement}>
          +
        </button>
      </div>
      <p className={s.price}>{price * quantity}&nbsp;₽</p>
    </li>
  );
};
