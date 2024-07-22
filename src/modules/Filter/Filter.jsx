import classNames from "classnames";
import s from "./Filter.module.scss";
import { Choices } from "../Choices/Choices";
import { useEffect, useRef, useState } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce, getValidFilters } from "../../util";
import { FilterRadio } from "./FilterRadio/FilterRadio";
import { changePrice, changeType } from "../../redux/filtersSlice";

const filterTypes = [
  { title: "Цветы", value: "bouquets", className: s.label_bouquets },
  { title: "Игрушки", value: "toys", className: s.label_toys },
  { title: "Открытки", value: "postcards", className: s.label_postcards },
];

export const Filter = ({ setTitleGoods }) => {
  const [openChoice, setOpenChoice] = useState(null);

  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);

  const prevFiltersRef = useRef({});

  const debounceFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilters = getValidFilters(filters);

    if (!validFilters.type) {
      return;
    }

    if (prevFilters.type !== validFilters.type) {
      dispatch(fetchGoods(validFilters));
      setTitleGoods(
        filterTypes.find((item) => item.value === validFilters.type).title,
      );
    } else {
      debounceFetchGoods(validFilters);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, debounceFetchGoods, filters]);

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  };

  const handelTypeChange = ({ target }) => {
    const { value } = target;
    dispatch(changeType(value));
    setOpenChoice(-1);
  };

  const handelPriceChange = ({ target }) => {
    const { name, value } = target;
    dispatch(changePrice({ name, value }));
  };

  return (
    <section className={s.filter}>
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className={s.form}>
          <fieldset className={s.group}>
            {filterTypes.map((item) => (
              <FilterRadio
                key={item.value}
                data={item}
                handelTypeChange={handelTypeChange}
                type={filters.type}
              />
            ))}
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
