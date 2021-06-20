import React from 'react';
import { useAppDispatch } from "../lib/store/hooks";
import { stProductPerPage } from "../lib/store/ProductReducer";

type P = {
  current: number
  arr: number[]
}

export const Selector: React.FC<P> = ({current, arr}) => {

  const dispatch = useAppDispatch();
  const [visible, setVisible] = React.useState(false);

  const handleClick = (option: number) => {
    setVisible(!visible);
    dispatch(stProductPerPage(option))
    // eslint-disable-next-line no-undef
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  const options = arr.map((option: number, i: number) => {
    if (option !== current)
    return <span
      key={i}
      className={'selector-label'}
      style={{top: `-${(i+1)*40} px`}}
      onClick={() => handleClick(option)}
    >
      {option}
    </span>
  })

  return <div className={'selector-wrapper'}>
    <div className={'selector-label selector-label-current'} onClick={() => setVisible(!visible)}>
      <h1>{current}</h1>
    </div>
    {visible && options}
  </div>
}