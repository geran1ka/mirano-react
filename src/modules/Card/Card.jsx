import classNames from "classnames";
import s from "./Card.module.scss";

export const Card = ({ className, img, title, price }) => {
  console.log("card");

  return (
    <article className={classNames(className, s.card)}>
      <img className={s.image} src={img} alt={title} />
      <div className={s.content}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.footer}>
          <p className={s.dateDelivery}>сегодня в 14:00</p>
          <button className={s.button}>{price}&nbsp;₽</button>
        </div>
      </div>
    </article>
  );
};
