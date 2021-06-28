import React from 'react';

export const ProductPrototype = () => {
  return (
    <div className={'product-wrapper'}>
      <div className={'product-container'}>
        <h1>
          <div
            className={'product-proto-animation'}
            style={{ height: '30px', width: '100%' }}
          />
        </h1>
        <div className={'product-description-container'}>
          <div
            className={'product-image-wrapper product-proto-animation'}
          ></div>
          <div className={'product-description'}>
            <h2>
              <div className={'product-proto-animation'} />
            </h2>
            <h2>
              <div className={'product-proto-animation'} />
            </h2>
            <h2>
              <div className={'product-proto-animation'} />
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
