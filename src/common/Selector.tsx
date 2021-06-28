import React from 'react';

type TProps = {
  current: number;
  arr: number[];
  label: string;
  changer: any
};

export const Selector: React.FC<TProps> = React.memo(
  ({ current, arr, changer, label }) => {

    const [visible, setVisible] = React.useState(false);
    const handleClick = React.useCallback(
      (option: number) => {
        setVisible(!visible);
        changer(option);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      [changer]
    );

    const options = React.useMemo(
      () =>
        arr.map((option: number, i: number) => {
          if (option !== current)
            return (
              <span
                key={i}
                className={'selector-label'}
                onClick={() => handleClick(option)}
              >
                {option}
              </span>
            );
        }),
      [arr]
    );

    return (
      <div className={'pagination-selector-wrapper'}>
        <h1 className={'paginator-per-page-title'}>{label}</h1>
        <div className={'selector-wrapper'}>
          <div
            className={'selector-label selector-label-current'}
            onClick={() => setVisible(!visible)}
          >
            <h1>{current}</h1>
          </div>
          <div
            className={`selector-options-list ${visible && 'open-selector'}`}
          >
            {visible && options}
          </div>
        </div>
      </div>
    );
  }
);
