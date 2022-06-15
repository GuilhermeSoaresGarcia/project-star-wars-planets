import React, { useContext } from 'react';
import Context from '../context/Context';

function AlphabeticalOrder() {
  const { orderParameters, sortingOrder } = useContext(Context);
  const columnArray = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  return (
    <>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ orderParameters }
      >
        {columnArray.map((item, index) => (
          <option
            key={ index }
            name="column"
            value={ item }
          >
            {item}
          </option>
        ))}
      </select>

      <label htmlFor="asc">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          onChange={ orderParameters }
          id="asc"
          value="ASC"
          defaultChecked
        />
        ASC
      </label>

      <label htmlFor="desc">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          onChange={ orderParameters }
          id="desc"
          value="DESC"
        />
        DESC
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ sortingOrder }
      >
        Ordenar
      </button>
    </>
  );
}

export default AlphabeticalOrder;
