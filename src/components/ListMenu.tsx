import React from 'react';
import Select from 'react-select';
import { SliderRange } from '../common/SliderRange';

type TProps = {
  perPage: number;
  origins: string[];
  changePerPageFn: any;
  changeOriginsFn: any;
  changePriceFn: any;
  maxPrice: number;
  minPrice: number;
  filterPrice: { min: number; max: number };
};

const theme = (theme: any) => ({
  ...theme,
  borderRadius: '10px',
  colors: {
    ...theme.colors,
    primary25: 'rgba(246,72,28,0.2)',
    primary: '#f6481c',
  },
});

const perPageOptions = [
  { name: 'perPage', value: 10, label: 10 },
  { name: 'perPage', value: 25, label: 25 },
  { name: 'perPage', value: 50, label: 50 },
];

export const ListMenu: React.FC<TProps> = ({
  perPage,
  origins,
  changePerPageFn,
  changeOriginsFn,
  changePriceFn,
  maxPrice,
  minPrice,
  filterPrice,
}) => {
  const handleChange = (e: any) => {
    if (e.name === 'perPage') {
      changePerPageFn(e.value);
    } else {
      changeOriginsFn(e);
    }
  };

  const originOptions = React.useMemo(
    () =>
      origins.map((origin: string) => ({
        value: origin,
        label: origin,
      })),
    [origins]
  );

  return (
    <div className={'list-menu-wrapper'}>
      <div className={'react-select-wrapper'}>
        <h1>Origins</h1>
        {React.useMemo(
          () => (
            <Select
              className="react-select-container__origins"
              classNamePrefix="react-select"
              isMulti
              isClearable={true}
              onChange={handleChange}
              options={originOptions}
              theme={theme}
            />
          ),
          [originOptions]
        )}
      </div>

      <div className={'react-select-wrapper'}>
        <h1>Per page</h1>
        {React.useMemo(
          () => (
            <Select
              className="react-select-container__per-page"
              classNamePrefix="react-select"
              isSearchable={false}
              onChange={handleChange}
              value={{ value: perPage, label: perPage }}
              options={perPageOptions}
              theme={theme}
            />
          ),
          [perPage]
        )}
      </div>

      <div className={'list-menu-price'}>
        <h1>Price</h1>
        {React.useMemo(
          () => (
            <SliderRange
              min={minPrice}
              max={maxPrice}
              filterRange={filterPrice}
              changePriceFn={changePriceFn}
            />
          ),
          [minPrice, maxPrice, filterPrice]
        )}
      </div>
    </div>
  );
};
