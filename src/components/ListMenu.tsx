import React from 'react';
import Select from 'react-select';

type TProps = {
  perPage: number;
  origins: string[];
  changePerPageFn: any;
  changeOriginsFn: any
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
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];

export const ListMenu: React.FC<TProps> = ({
  perPage,
  origins,
  changePerPageFn,
  changeOriginsFn
}) => {

  const originOptions = origins.map((origin: string) => ({value: origin, label: origin}))

  return (
    <div className={'list-menu-wrapper'}>

      <div className={'react-select-wrapper'}>
        <h1>Origins</h1>
        <Select
          className="react-select-container__origins"
          classNamePrefix="react-select"
          isMulti
          isClearable={true}
          onChange={(e: any) => changeOriginsFn(e)}
          options={originOptions as any}
          theme={theme}
        />
      </div>

      <div className={'react-select-wrapper'}>
        <h1>Per page</h1>
        <Select
          className="react-select-container__per-page"
          classNamePrefix="react-select"
          isSearchable={false}
          onChange={(e: any) => changePerPageFn(e.value)}
          value={{ value: perPage, label: perPage }}
          options={perPageOptions}
          theme={theme}
        />
      </div>

    </div>
  );
};
