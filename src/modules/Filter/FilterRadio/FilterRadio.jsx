import classNames from "classnames";
import s from "./FilterRadio.module.scss";
export const FilterRadio = ({ handelTypeChange, data, type }) => (
  <>
    <input
      className={s.radio}
      type="radio"
      name="type"
      value={data.value}
      id={data.value}
      checked={type === data.value}
      onChange={handelTypeChange}
    />
    <label className={classNames(s.label, data.className)} htmlFor={data.value}>
      {data.title}
    </label>
  </>
);
