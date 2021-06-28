import React from 'react';

interface TProps {
  min: number;
  max: number;
  filterRange: { min: number; max: number };
  changePriceFn: any;
}

export const SliderRange: React.FC<TProps> = ({
  min,
  max,
  filterRange,
  changePriceFn,
}) => {
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);
  const minValRef = React.useRef(filterRange.min);
  const maxValRef = React.useRef(filterRange.max);
  const range = React.useRef<HTMLDivElement>(null);

  const getPercent = React.useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'min') {
      const value = Math.min(+e.target.value, maxVal - 1);
      setMinVal(value);
      minValRef.current = value;
    }
    if (e.target.name === 'max') {
      const value = Math.max(+e.target.value, minVal + 1);
      setMaxVal(value);
      if (maxVal > 999){
        maxValRef.current = 1000
      } else {
        maxValRef.current = value;
      }
    }
  };

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
    const timer = setTimeout(() => {
      changePriceFn(minValRef.current, maxValRef.current);
    }, 1000);
    return () => clearTimeout(timer);
  }, [minVal, maxVal]);

  return (
    <div className="price-range-wrapper">
      <input
        name={'min'}
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) => handleChange(e)}
        className="thumb thumb--left"
        style={minVal > max - 100 ? { zIndex: 5 } : {}}
      />
      <input
        name={'max'}
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            className="slider__left-value"
          />
        </div>
        <div className={'slider__right-input-box'}>
          <label>To $</label>
          <input
            maxLength={3}
            name={'max'}
            value={maxVal}
            onChange={(e) => handleChange(e)}
            className="slider__right-value"
          />
        </div>
      </div>
    </div>
  );
};
