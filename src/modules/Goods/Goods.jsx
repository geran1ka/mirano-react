import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import "./Goods.modules.scss";

export const Goods = () => {
  console.log("goods");

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">Цветы</h2>

          <ul className="goods__list">
            {goodsArray.map((item) => (
              <li className="goods__item" key={item.id}>
                <Card className="goods__card" {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Cart />
    </section>
  );
};
