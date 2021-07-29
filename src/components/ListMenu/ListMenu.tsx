import React from 'react';
import Select from 'react-select';
import { ListMenuPrototype } from '../../common';
import { SliderRange } from '../../common';
import { useDebounce } from '../../lib/hooks/useDebounce';
import { FixThisTypeLeter, RequestStatuses, TOrigin } from '../../lib/types';

type TProps = {
  perPage: number;
  statusOrigins: string;
  origins: TOrigin[];
  changePerPageFn: (value: { perPage: number }) => void;
  changeOriginsFn: (origins: string[]) => void;
  changePriceFn: (minPrice: number, maxPrice: number) => void;
  maxPrice: number;
  minPrice: number;
  filterOrigins: string[];
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
    filterOrigins,
  } = props;

  const [changedValue, setChangedValue] =
    React.useState<FixThisTypeLeter>(null);
  const { debouncedValue, isDebounced } = useDebounce<FixThisTypeLeter>(
    changedValue,
    500
  );

  const handleChange = (e: FixThisTypeLeter) => {
    setChangedValue(e);
  };

  React.useEffect(() => {
    if (changedValue) {
      if (changedValue.name === 'perPage') {
        changePerPageFn({ perPage: changedValue.value });
      }
      if (Array.isArray(changedValue)) {
        changeOriginsFn(changedValue);
      }
    }
  }, [debouncedValue]);

  let filterOriginOptions: { value: string; label: string }[] = [];

  const originOptions = origins.map((origin: TOrigin) => {
    const option = {
      value: origin.value,
      label: origin.displayName,
    };
    if (filterOrigins.includes(origin.value)) {
      filterOriginOptions.push(option);
    }
    return option;
  });

  if (statusOrigins !== RequestStatuses.SUCCESS || isDebounced)
    return <ListMenuPrototype />;

  return (
    <div className={'list-menu-wrapper'}>
      <div className={'react-select-wrapper'}>
        <h1>Origins</h1>
        <Select
          name={'origins'}
          className="react-select-container__origins"
          classNamePrefix="react-select"
          isMulti
          isClearable={true}
          onChange={handleChange}
          value={filterOriginOptions}
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
          setChangedValue={setChangedValue}
          minPrice={minPrice}
          maxPrice={maxPrice}
          changePriceFn={changePriceFn}
        />
      </div>
    </div>
  );
};
