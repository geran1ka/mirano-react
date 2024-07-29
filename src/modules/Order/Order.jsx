import classNames from "classnames";
import s from "./Order.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeOrder, sendOrder, updateOrderData } from "../../redux/orderSlice";
import { useCallback, useEffect } from "react";

export const Order = () => {
  const isOpenModal = useSelector((state) => state.order.isOpenCart);
  const orderId = useSelector((state) => state.order.orderId);

  const dispatch = useDispatch();

  const handlerCloseModal = useCallback(
    ({ target }) => {
      if (target.matches(`.${s.order}`) || target.closest(`.${s.close}`)) {
        dispatch(closeOrder());
      }
    },
    [dispatch],
  );

  const orderData = useSelector((state) => state.order.data);
  const itemsCart = useSelector((state) => state.cart.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateOrderData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendOrder());
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        dispatch(closeOrder());
      }
    };
    if (isOpenModal) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [dispatch, isOpenModal, handlerCloseModal]);

  if (!isOpenModal) return null;

  return (
    <div className={s.order} onClick={handlerCloseModal}>
      <div className={s.wrapper}>
        {orderId ? (
          <>
            <h2 className={s.title}>Заказ оформлен!</h2>
            <p className={s.id}>Ваш номер заказа: {orderId}</p>
          </>
        ) : (
          <>
            <h2 className={s.title}>Оформить заказ</h2>
            <form className={s.form} id="order" onSubmit={handleSubmit}>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные заказчика</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="buyerName"
                    value={orderData.buyerName}
                    placeholder="Имя"
                    onChange={handleChange}
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="buyerPhone"
                    value={orderData.buyerPhone}
                    placeholder="Телефон"
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные получателя</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="recipientName"
                    value={orderData.recipientName}
                    placeholder="Имя"
                    onChange={handleChange}
                  />
                  <input
                    className={s.input}
                    type="text"
                    name="recipientPhone"
                    value={orderData.recipientPhone}
                    placeholder="Телефон"
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Адрес</legend>
                <div className={s.inputGroup}>
                  <input
                    className={s.input}
                    type="text"
                    name="street"
                    value={orderData.street}
                    placeholder="Улица"
                    onChange={handleChange}
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="house"
                    value={orderData.house}
                    placeholder="Дом"
                    onChange={handleChange}
                  />
                  <input
                    className={classNames(s.input, s.input_min)}
                    type="text"
                    name="apartment"
                    value={orderData.apartment}
                    placeholder="Квартира"
                    onChange={handleChange}
                  />
                </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <div className={s.payment}>
                  <label className={s.labelRadio}>
                    <input
                      className={s.radio}
                      type="radio"
                      name="paymentOnline"
                      value={orderData.paymentOnline === "true"}
                      defaultChecked
                      onChange={handleChange}
                    />
                    Оплата онлайн
                  </label>
                </div>
                <div className={s.delivery}>
                  <label htmlFor="delivery">Доставка 01.07</label>
                  <input
                    type="hidden"
                    name="deliveryDate"
                    value={orderData.deliveryDate}
                    onChange={handleChange}
                  />
                  <div className={s.selectWrapper}>
                    <select
                      className={s.select}
                      name="deliveryTime"
                      value={orderData.deliveryTime}
                      onChange={handleChange}
                      id="delivery">
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className={s.footer}>
              <p className={s.total}>
                {" "}
                {itemsCart.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                )}
                &nbsp;₽
              </p>
              <button className={s.button} type="submit" form="order">
                Заказать
              </button>
            </div>
          </>
        )}
      </div>
      <button className={s.close} type="button">
        ×
      </button>
    </div>
  );
};
