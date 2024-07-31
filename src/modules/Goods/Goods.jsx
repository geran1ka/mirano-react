import classNames from "classnames";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import s from "./Goods.module.scss";
import { useSelector } from "react-redux";

import { API_URL } from "../../const";
import { Preload } from "../../Preload/Preload";

export const Goods = ({ title }) => {
  const {
    items: goods,
    status: goodsStatus,
    error,
  } = useSelector((state) => state.goods);

  let content = null;
  if (goodsStatus === "loading") {
    content = <Preload />;
  }

  if (goodsStatus === "success" && goods.length) {
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

  if (goodsStatus === "success" && !goods.length) {
    content = <p>По вашему запросу ничего не найдено</p>;
  }

  if (goodsStatus === "failed") {
    content = <p>Error...{error}</p>;
  }
  return (
    <section
      className={s.goods}
      style={{ position: goodsStatus === "loading" ? "relative" : "" }}>
      <div className={classNames("container", s.container)}>
        <div className={s.box}>
          <h2 className={s.title}>{title}</h2>

          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
};
