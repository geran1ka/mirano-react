import { Filter } from "./modules/Filter/Filter";
import { Footer } from "./modules/Footer/Footer";
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Hero } from "./modules/Hero/Hero";
import { Order } from "./modules/Order/Order";
import { Subscribe } from "./modules/Subscribe/Subscribe";

export const App = () => (
  <>
    <Header />

    <main>
      <Hero />

      <Filter />

      <Goods />

      <Subscribe />
    </main>

    <Footer />

    <Order />
    <div className="order" style={{ display: "none" }}>
      <div className="order__wrapper">
        <h2 className="order__title">Заказ оформлен!</h2>
        <p className="order__id">
          Ваш номер заказа: 971f365a-caa1-4cdb-9446-bad2eff047e1
        </p>
      </div>
    </div>
  </>
);
