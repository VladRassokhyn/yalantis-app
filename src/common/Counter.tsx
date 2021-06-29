import React from "react";

type TProps = {
  count: number;
  changerFn: any;
};

export const Counter: React.FC<TProps> = ({ count, changerFn }) => {

  const increment = React.useCallback(
    () => {
      changerFn(count + 1);
    }, [count]
  );
  const decrement = React.useCallback(
    () => {
      changerFn(count - 1);
    }, [count]
  );

  const handlerChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changerFn(+e.target.value);
    }, []
  );

  return (
    <>
      <b>Count:</b>
      <input
        className={"basket-count-input"}
        value={count}
        onChange={handlerChange}
      />
      <div className={"basket-count-buttons"}>
        <span className={"basket-count-increment"} onClick={increment}/>
        <span className={"basket-count-decrement"} onClick={decrement}/>
      </div>
    </>
  );
};
