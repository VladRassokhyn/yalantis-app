import React from 'react';
import { useDebounce } from '../../lib/hooks/useDebounce';

interface TProps {
  minPrice: number;
  maxPrice: number;
  changePriceFn: (min: number, max: number) => void;
  setChangedValue: (value: any) => void;
}

export const SliderRange: React.FC<TProps> = ({
  minPrice,
  maxPrice,
  changePriceFn,
  setChangedValue,
}) => {
  const min = 1;
  const max = 1000;
  const [minVal, setMinVal] = React.useState(minPrice);
  const [maxVal, setMaxVal] = React.useState(maxPrice);
  const [changed, setChanged] = React.useState(false);
  const minValRef = React.useRef(minPrice);
  const maxValRef = React.useRef(maxPrice);
  const range = React.useRef<HTMLDivElement>(null);
  const { debouncedValue, isDebounced } = useDebounce(changed, 1000);

  const getPercent = React.useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setChanged(true);
      if (e.target.name === 'min') {
        const value = Math.min(+e.target.value, +maxVal - 1);
        setMinVal(value);
        minValRef.current = value;
      }
      if (e.target.name === 'max') {
        const value = Math.max(+e.target.value, +minVal + 1);
        setMaxVal(value);
        if (maxVal > 999) {
          maxValRef.current = 1000;
        } else {
          maxValRef.current = value;
        }
      }
    },
    [minVal, maxVal]
  );

  React.useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  React.useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  React.useEffect(() => {
    if (changed && !isDebounced) {
      setChangedValue({ name: 'slider' });
      changePriceFn(minValRef.current, maxValRef.current);
    }
  }, [debouncedValue]);

  return (
    <div className="price-range-wrapper">
      <input
        name={'min'}
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleChange}
        className="thumb thumb--left"
        style={minVal > max - 100 ? { zIndex: 5 } : {}}
      />
      <input
        name={'max'}
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className={'slider__left-input-box'}>
          <label>From $</label>
          <input
            maxLength={3}
            name={'min'}
            value={minVal}
            onChange={handleChange}
            className="slider__left-value"
          />
        </div>
        <div className={'slider__right-input-box'}>
          <label>To $</label>
          <input
            maxLength={3}
            name={'max'}
            value={maxVal}
            onChange={handleChange}
            className="slider__right-value"
          />
        </div>
      </div>
    </div>
  );
};
