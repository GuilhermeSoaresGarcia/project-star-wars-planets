import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterByNumber() {
  const { numericValuesParameters, getParameters } = useContext(Context);

  return (
    <div className="container-filter-by-numbers">
      <select
        data-testid="column-filter"
        onChange={ getParameters }
        id="column"
      >
        <option id="column">population</option>
        <option id="column">orbital_period</option>
        <option id="column">diameter</option>
        <option id="column">rotation_period</option>
        <option id="column">surface_water</option>
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
        value={ numericValuesParameters.value }
        id="value"
      />

      <button
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterByNumber;
