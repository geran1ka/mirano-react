import classNames from "classnames";
import s from "./Filter.module.scss";
import { Choices } from "../Choices/Choices";
import { useEffect, useRef, useState } from "react";
import { fetchGoods } from "../../redux/goodsSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce, getValidFilters } from "../../util";
import { FilterRadio } from "./FilterRadio/FilterRadio";
import {
  changeCategory,
  changePrice,
  changeType,
} from "../../redux/filtersSlice";

const filterTypes = [
  { title: "Цветы", value: "bouquets", className: s.label_bouquets },
  { title: "Игрушки", value: "toys", className: s.label_toys },
  { title: "Открытки", value: "postcards", className: s.label_postcards },
];

export const Filter = ({ setTitleGoods }) => {
  const [openChoice, setOpenChoice] = useState(null);

  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const goods = useSelector((state) => state.goods.items);
  const categories = useSelector((state) => state.goods.categories);

  const filterRef = useRef(null);
  const prevFiltersRef = useRef(filters);

  const debounceFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 300),
  ).current;

  useEffect(() => {
    if (goods.length) {
      filterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [goods]);

  useEffect(() => {
    const prevMinPrice = prevFiltersRef.current.minPrice;
    const prevMaxPrice = prevFiltersRef.current.maxPrice;

    const validFilters = getValidFilters(filters);
    console.log("validFilters: ", validFilters);

    if (!validFilters.type && !validFilters.search) {
      return;
    }

    if (
      prevMinPrice !==
        (validFilters.minPrice === undefined ? "" : validFilters.minPrice) ||
      prevMaxPrice !==
        (validFilters.maxPrice === undefined ? "" : validFilters.maxPrice)
    ) {
      console.log("prevMinPrice: ", prevMinPrice);
      console.log("validFilters.minPrice: ", validFilters.minPrice);

      console.log("min");

      debounceFetchGoods(validFilters);
    } else {
      dispatch(fetchGoods(validFilters));

      const type = filterTypes.find((item) => item.value === validFilters.type);
      console.log("type: ", type);
      if (type) {
        console.log("type");
        setTitleGoods(type.title);
      }

      if (validFilters.search) {
        console.log("sea");
        setTitleGoods("Результаты поиска");
      }
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

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(-1);
  };

  return (
    <section className={s.filter} ref={filterRef}>
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

            {categories.length ? (
              <Choices
                className={s.choices_type}
                buttonLabel="Тип продукта"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}>
                <ul className={s.typeList}>
                  {categories.map((category) => (
                    <li className={s.typeItem} key={category}>
                      <button
                        className={classNames(
                          s.typeButton,
                          category === filters.category
                            ? s.typeButton_active
                            : "",
                        )}
                        type="button"
                        onClick={() => {
                          handleCategoryChange(category);
                        }}>
                        {category}
                      </button>
                    </li>
                  ))}
                  <li className={s.typeItem}>
                    <button
                      className={classNames(s.typeButton)}
                      type="button"
                      onClick={() => {
                        handleCategoryChange("");
                      }}>
                      Все товары
                    </button>
                  </li>
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
};
