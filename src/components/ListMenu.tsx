import React from 'react';
import { Paginator } from '../common/Paginator';
import Select from 'react-select';

type TProps = {
  page: number;
  perPage: number;
  totalItems: number;
  changePageFn: any;
  changePerPageFn: any;
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

const options = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
];

export const ListMenu: React.FC<TProps> = ({
  page,
  perPage,
  totalItems,
  changePageFn,
  changePerPageFn,
}) => {

  const handleChange = React.useCallback(
    (e: any) => {
      changePerPageFn(e.value);
    },
    [perPage]
  );

  return (
    <div className={'list-menu-wrapper'}>
      <div />
      <Paginator
        changer={changePageFn}
        currentPage={page}
        perPage={perPage}
        totalItems={totalItems}
      />
      <div className={'react-select-wrapper'}>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          isSearchable={false}
          onChange={(e: any) => handleChange(e)}
          value={{ value: perPage, label: perPage }}
          options={options}
          theme={theme}
        />
      </div>
    </div>
  );
};
