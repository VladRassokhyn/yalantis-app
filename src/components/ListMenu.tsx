import React from 'react';
import Select from 'react-select';
import { ListMenuPrototype } from '../common/ListMenuPrototype';
import { SliderRange } from '../common/SliderRange';
import { FixThisTypeLeter, RequestStatuses, TOrigin } from '../lib/types';

type TProps = {
  perPage: number;
  statusOrigins: string;
  origins: TOrigin[];
  changePerPageFn: (perPage: number) => void;
  changeOriginsFn: (origins: string[]) => void;
  changePriceFn: (min: number, max: number) => void;
  maxPrice: number;
  minPrice: number;
  filterPrice: { min: number; max: number };
};

const theme = (theme: FixThisTypeLeter) => ({
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

export const ListMenu = (props: TProps) => {
  const {
    perPage,
    origins,
    statusOrigins,
    changePerPageFn,
    changeOriginsFn,
    changePriceFn,
    maxPrice,
    minPrice,
    filterPrice,
  } = props;

  const handleChange = (e: FixThisTypeLeter) => {
    console.log(e);
    if (e.name === 'perPage') {
      changePerPageFn(e.value);
    } else {
      changeOriginsFn(e);
    }
  };

  const originOptions = React.useMemo(
    () =>
      origins.map((origin: TOrigin) => ({
        value: origin.value,
        label: origin.displayName,
      })),
    [origins]
  );

  if (statusOrigins !== RequestStatuses.SUCCESS) return <ListMenuPrototype />;

  return (
    <div className={'list-menu-wrapper'}>
      <div className={'react-select-wrapper'}>
        <h1>Origins</h1>
        <Select
          className="react-select-container__origins"
          classNamePrefix="react-select"
          isMulti
          isClearable={true}
          onChange={handleChange}
          options={originOptions}
          theme={theme}
        />
      </div>

      <div className={'react-select-wrapper'}>
        <h1>Per page</h1>
        <Select
          className="react-select-container__per-page"
          classNamePrefix="react-select"
          isSearchable={false}
          onChange={handleChange}
          value={{ value: perPage, label: perPage }}
          options={perPageOptions}
          theme={theme}
        />
      </div>

      <div className={'list-menu-price'}>
        <h1>Price</h1>
        <SliderRange
          min={minPrice}
          max={maxPrice}
          filterRange={filterPrice}
          changePriceFn={changePriceFn}
        />
      </div>
    </div>
  );
};
