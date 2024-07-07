import classNames from "classnames";
import s from "./Filter.module.scss";
import { Choices } from "../Choices/Choices";
import { useState } from "react";

export const Filter = () => {
  const [openChoice, setOpenChoice] = useState(null);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

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
            <Choices
              buttonLabel="Цена"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}>
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
            </Choices>

            <Choices
              className={s.choices_type}
              buttonLabel="Тип продукта"
              isOpen={openChoice === 1}
              onToggle={() => handleChoicesToggle(1)}>
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
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
