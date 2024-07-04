import classNames from "classnames";
import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import s from "./Goods.module.scss";

export const Goods = () => {
  console.log("goods");

  return (
    <section className={s.goods}>
      <div className={classNames("container", s.container)}>
        <div className={s.box}>
          <h2 className={s.title}>Цветы</h2>

          <ul className={s.list}>
            {goodsArray.map((item) => (
              <li className={s.item} key={item.id}>
                <Card className={s.card} {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Cart />
    </section>
  );
};
