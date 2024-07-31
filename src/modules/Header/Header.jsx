import classNames from "classnames";
import s from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/cartSlice";
import { changeSearch } from "../../redux/filtersSlice";
import { useEffect, useRef, useState } from "react";
import { debounce } from "../../util";

export const Header = () => {
  const dispatch = useDispatch();
  const itemsCart = useSelector((state) => state.cart.items);
  const [searchValue, setSearchValue] = useState("");

  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  const handlerCartToggle = () => {
    dispatch(toggleCart());
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      debounce(() => {
        if (window.scrollY > 200) {
          headerRef.current.classList.add(s.fixed);
          document.body.style.paddingTop = `${headerRef.current.offsetHeight}px`;
          console.log(
            "headerRef.current.offsetHeight: ",
            headerRef.current.offsetHeight,
          );
        } else {
          headerRef.current.classList.remove(s.fixed);
          document.body.style.paddingTop = "0";
        }
      }, 200),
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      searchInputRef.current.style.cssText = ``;

      dispatch(changeSearch(searchValue));
      setSearchValue("");
    } else {
      console.log(2);
      searchInputRef.current.style.cssText = `
        outline: 2px solid red;
        outlineOffset: 3px;
      `;

      setTimeout(() => {
        searchInputRef.current.style.cssText = ``;
      }, 2000);
    }
  };

  const handlerSearchValue = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <header className={s.header} ref={headerRef}>
      <div className={classNames("container", s.container)}>
        <form className={s.form} action="#" onSubmit={handleSubmit}>
          <input
            className={s.input}
            type="search"
            name="search"
            placeholder="Букет из роз"
            value={searchValue}
            onChange={handlerSearchValue}
            ref={searchInputRef}
          />

          <button className={s.searchButton} aria-label="начать поиск">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3333 4.16663C13.3333 4.78496 13.9442 5.70829 14.5625 6.48329C15.3575 7.48329
              16.3075 8.35579 17.3967 9.02163C18.2133 9.52079 19.2033 9.99996 20 9.99996M20
              9.99996C19.2033 9.99996 18.2125 10.4791 17.3967 10.9783C16.3075 11.645 15.3575
              12.5175 14.5625 13.5158C13.9442 14.2916 13.3333 15.2166 13.3333 15.8333M20
              9.99996H4.76837e-07"
                stroke="white"
              />
            </svg>
          </button>
        </form>

        <img
          className={s.logo}
          src="/img/logo.svg"
          alt="Логотип Mirano Flower Boutique"
        />

        <button className={s.cartButton} onClick={handlerCartToggle}>
          {itemsCart
            ? itemsCart.reduce((acc, item) => acc + item.quantity, 0)
            : 0}
        </button>
      </div>
    </header>
  );
};
