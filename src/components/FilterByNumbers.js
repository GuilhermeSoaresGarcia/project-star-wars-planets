import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterByNumber() {
  const {
    columnArray,
    numericFilterParameters,
    getParameters,
    filterPlanetByNumbers,
  } = useContext(Context);

  return (
    <>
      <select
        data-testid="column-filter"
        onChange={ getParameters }
        id="column"
      >
        <option defaultValue>{'<Select by...>'}</option>
        <option disabled>-----------</option>
        {columnArray.map((item) => <option key={ item } id="column">{item}</option>)}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ getParameters }
        id="comparison"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        onChange={ getParameters }
        value={ numericFilterParameters.value }
        id="value"
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ filterPlanetByNumbers }
      >
        Filtrar
      </button>
    </>
  );
}

export default FilterByNumber;
