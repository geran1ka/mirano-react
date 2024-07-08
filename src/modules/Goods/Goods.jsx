import classNames from "classnames";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import s from "./Goods.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { API_URL } from "../../const";

export const Goods = () => {
  console.log("goods");
  const dispatch = useDispatch();
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  useEffect(() => {
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [dispatch, goodsStatus]);

  let content = null;
  if (goodsStatus === "loading") {
    content = <p>Loading...</p>;
  }

  if (goodsStatus === "success") {
    content = (
      <ul className={s.list}>
        {goods.map((item) => (
          <li className={s.item} key={item.id}>
            <Card
              className={s.card}
              id={item.id}
              img={`${API_URL}${item.photoUrl}`}
              title={item.name}
              dateDelivery="сегодня в 14:00"
              price={item.price}
            />
          </li>
        ))}
      </ul>
    );
  }

  if (goodsStatus === "failed") {
    content = <p>Error...{error}</p>;
  }
  return (
    <section className={s.goods}>
      <div className={classNames("container", s.container)}>
        <div className={s.box}>
          <h2 className={s.title}>Цветы</h2>

          {content}
        </div>
      </div>

      <Cart />
    </section>
  );
};
