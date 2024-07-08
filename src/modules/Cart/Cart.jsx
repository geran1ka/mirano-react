import classNames from "classnames";
import { CartItem } from "../CartItem/CartItem";
import s from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, toggleCart } from "../../redux/cartSlice";
import { openModal } from "../../redux/modalSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector((state) => state.cart.isOpen);
  const items = useSelector((state) => state.cart.items);

  const handlerCartClose = () => {
    dispatch(toggleCart());
  };

  const handlerModalOpen = () => {
    dispatch(openModal());
    dispatch(closeCart());
  };

  return (
    <section className={classNames(s.cart, isOpenCart && s.open)}>
      <div className={s.container}>
        <div className={s.header}>
          <h3 className={s.title}>Ваш заказ</h3>

          <button className={s.close} onClick={handlerCartClose}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="5"
                y="5.70715"
                width="1"
                height="25"
                transform="rotate(-45 5 5.70715)"
                fill="#D17D2F"
              />
              <rect
                x="22.6777"
                y="5"
                width="1"
                height="25"
                transform="rotate(45 22.6777 5)"
                fill="#D17D2F"
              />
            </svg>
          </button>
        </div>

        <p className={s.dateDelivery}>сегодня в 14:00</p>

        <ul className={s.list}>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>

        <div className={s.footer}>
          <button className={s.orderBtn} onClick={handlerModalOpen}>
            Оформить
          </button>
          <p className={classNames(s.price, s.price_total)}>0&nbsp;₽</p>
        </div>
      </div>
    </section>
  );
};
