import classNames from "classnames";
import { goodsArray } from "../../goodsArray";
import { Card } from "../Card/Card";
import { Cart } from "../Cart/Cart";
import s from "./Goods.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGoods } from "../../redux/goodsSlice";

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

  return (
    <section className={s.goods}>
      <div className={classNames("container", s.container)}>
        <div className={s.box}>
          <h2 className={s.title}>Цветы</h2>

          <ul className={s.list}>
            {goods.map((item) => (
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
