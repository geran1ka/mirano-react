import classNames from "classnames";
import "./Card.modules.scss";

export const Card = ({ className, img, title, price }) => {
  console.log("card");

  return (
    <article className={classNames(className, "card")}>
      <img className="card__image" src={img} alt={title} />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">сегодня в 14:00</p>
          <button className="card__button">{price}&nbsp;₽</button>
        </div>
      </div>
    </article>
  );
};
