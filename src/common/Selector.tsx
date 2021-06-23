import React from "react";

type P = {
  current: number
  arr: number[]
  label: string
  // eslint-disable-next-line no-unused-vars
  changer: (option: number) => void
}

export const Selector: React.FC<P> = ({ current, arr, changer, label }) => {

  const [visible, setVisible] = React.useState(false);

  const handleClick = (option: number) => {
    setVisible(!visible);
    changer(option);
    // eslint-disable-next-line no-undef
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const options = arr.map((option: number, i: number) => {
    if (option !== current)
      return <span
        key={i}
        className={"selector-label"}
        onClick={() => handleClick(option)}
      >
      {option}
    </span>;
  });

  return <div className={"pagination-selector-wrapper"}>
    <h1 className={"paginator-per-page-title"}>{label}</h1>
    <div className={"selector-wrapper"}>
      <div
        className={"selector-label selector-label-current"}
        onClick={() => setVisible(!visible)}
      >
        <h1>{current}</h1>
      </div>
      <div className={`selector-options-list ${visible && "open-selector"}`}>
        {visible && options}
      </div>
    </div>
  </div>;
};