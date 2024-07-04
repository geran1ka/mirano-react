import classNames from "classnames";
import sc from "./Choices.module.scss";
import s from "./Filter.module.scss";

export const Filter = () => {
  console.log("filter");

  return (
    <section className={s.filter}>
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className={s.form}>
          <fieldset className={s.group}>
            <input
              className={s.radio}
              type="radio"
              name="type"
              value="bouquets"
              id="flower"
              defaultChecked
            />
            <label
              className={classNames(s.label, s.label_flower)}
              htmlFor="flower">
              Цветы
            </label>

            <input
              className={s.radio}
              type="radio"
              name="type"
              value="toys"
              id="toys"
            />
            <label className={classNames(s.label, s.label_toys)} htmlFor="toys">
              Игрушки
            </label>

            <input
              className={s.radio}
              type="radio"
              name="type"
              value="postcards"
              id="postcard"
            />
            <label
              className={classNames(s.label, s.label_postcard)}
              htmlFor="postcard">
              Открытки
            </label>
          </fieldset>

          <fieldset className={classNames(s.group, s.group_choices)}>
            <div className={classNames(s.choices, sc.choices)}>
              <button className={classNames(s.select, sc.btn)} type="button">
                Цена
              </button>

              <div className={classNames(sc.box, s.choicesBox)}>
                <fieldset className={s.price}>
                  <input
                    className={s.inputPrice}
                    type="text"
                    name="minPrice"
                    placeholder="от"
                  />
                  <input
                    className={s.inputPrice}
                    type="text"
                    name="maxPrice"
                    placeholder="до"
                  />
                </fieldset>
              </div>
            </div>

            <div className={classNames(s.choices, s.choices_type, sc.choices)}>
              <button className={classNames(s.select, sc.btn)} type="button">
                Тип товара
              </button>

              <div
                className={classNames(sc.box, s.choicesBox, s.choicesBox_type)}>
                <ul className={s.typeList}>
                  <li className={s.typeItem}>
                    <button className={s.typeButton} type="button">
                      Монобукеты
                    </button>
                  </li>
                  <li className={s.typeItem}>
                    <button className={s.typeButton} type="button">
                      Авторские букеты
                    </button>
                  </li>
                  <li className={s.typeItem}>
                    <button className={s.typeButton} type="button">
                      Цветы в коробке
                    </button>
                  </li>
                  <li className={s.typeItem}>
                    <button className={s.typeButton} type="button">
                      Цветы в корзине
                    </button>
                  </li>
                  <li className={s.typeItem}>
                    <button className={s.typeButton} type="button">
                      Букеты из сухоцветов
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
