import { useDispatch } from "react-redux";
import { Filter } from "./modules/Filter/Filter";
import { Footer } from "./modules/Footer/Footer";
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { Subscribe } from "./modules/Subscribe/Subscribe";
import { useEffect, useState } from "react";
import { registerCart } from "./redux/cartSlice";

export const App = () => {
  const dispatch = useDispatch();
  const [titleGoods, setTitleGoods] = useState("");

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
    };

    initializeCart();
  }, [dispatch]);

  return (
    <>
      <Header setTitleGoods={setTitleGoods} />

      <main>
        <Hero />

        <Filter setTitleGoods={setTitleGoods} />

        <Goods title={titleGoods} />

        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  );
};
