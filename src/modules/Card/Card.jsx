import classNames from "classnames";
import s from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, openCart } from "../../redux/cartSlice";
import { useState } from "react";

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector((state) => state.cart.isOpen);

  const [buttonText, setButtonText] = useState(`${price}\u00A0₽`);

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ productId: id }));
    if (!isOpenCart) {
      console.log(isOpenCart);
      dispatch(openCart());
    }
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setButtonText("в корзину");
    }, 200);
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      setButtonText(`${price}\u00A0₽`);
    }, 100);
  };

  return (
    <article className={classNames(className, s.card)}>
      <img className={s.image} src={img} alt={title} />
      <div className={s.content}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.footer}>
          <p className={s.dateDelivery}>сегодня в 14:00</p>
          <button
            className={s.button}
            onClick={handlerAddToCart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};
