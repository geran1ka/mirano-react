import classNames from "classnames";
import s from "./Filter.module.scss";

export const FilterRadio = ({ handelTypeChange, data, type }) => (
  <div>
    <input
      className={s.radio}
      type="radio"
      name="type"
      value={data.value}
      id={data.value}
      checked={type === data.value}
      onChange={handelTypeChange}
    />
    <label
      className={classNames(s.label, `${s.label}_${data.value}`)}
      htmlFor={data.value}>
      {data.title}
    </label>
  </div>
);
