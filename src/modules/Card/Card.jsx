import classNames from "classnames";
import s from "./Card.module.scss";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartSlice";

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();

  const handlerAddToCart = () => {
    dispatch(addItemToCart({ id, img, title, dateDelivery, price }));
  };
  return (
    <article className={classNames(className, s.card)}>
      <img className={s.image} src={img} alt={title} />
      <div className={s.content}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.footer}>
          <p className={s.dateDelivery}>сегодня в 14:00</p>
          <button className={s.button} onClick={handlerAddToCart}>
            {price}&nbsp;₽
          </button>
        </div>
      </div>
    </article>
  );
};
