import classNames from "classnames";
import s from "./Filter.module.scss";
import { Choices } from "../Choices/Choices";
import { useEffect, useRef, useState } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { useDispatch } from "react-redux";
import { debounce, getValidFilters } from "../../util";

export const Filter = () => {
  const [openChoice, setOpenChoice] = useState(null);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    type: "bouquets",
    minPrice: "",
    maxPrice: "",
    category: "",
  });

  const debounceFetchGoods = useRef(
    debounce((filters) => {
      const validFilters = getValidFilters(filters);
      dispatch(fetchGoods(validFilters));
    }, 300),
  ).current;

  useEffect(() => {
    debounceFetchGoods(filters);
  }, [debounceFetchGoods, filters]);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handelTypeChange = ({ target }) => {
    const { value } = target;
    const newFilters = { ...filters, type: value, minPrice: "", maxPrice: "" };
    setFilters(newFilters);
    setOpenChoice(null);
  };

  const handelPriceChange = ({ target }) => {
    const { name, value } = target;
    const newFilters = { ...filters, [name]: value ? parseInt(value, 10) : "" };
    setFilters(newFilters);
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
              checked={filters.type === "bouquets"}
              onChange={handelTypeChange}
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
              checked={filters.type === "toys"}
              onChange={handelTypeChange}
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
              checked={filters.type === "postcards"}
              onChange={handelTypeChange}
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
                  value={filters.minPrice}
                  onChange={handelPriceChange}
                />
                <input
                  className={s.inputPrice}
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onChange={handelPriceChange}
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
