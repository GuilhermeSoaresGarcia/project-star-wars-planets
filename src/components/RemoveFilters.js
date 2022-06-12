import React, { useContext } from 'react';
import Context from '../context/Context';

function RemoveFilters() {
  const { filterByNumericValues,
    removeNumericFilter, removeAllFilters } = useContext(Context);
  console.log(filterByNumericValues);
  return (
    <>
      <ol>
        {filterByNumericValues
          .map(({ column, comparison, value }, index) => (
            <li data-testid="filter" key={ comparison + index }>
              {column}
              ,
              {' '}
              {comparison}
              ,
              {' '}
              {value}
              {' '}
              <button
                type="button"
                onClick={ () => {
                  removeNumericFilter();
                  console.log(filterByNumericValues);
                } }
              >
                Remover
              </button>
            </li>))}
      </ol>

      <div>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeAllFilters }
        >
          Remover todas filtragens
        </button>
      </div>
    </>
  );
}

export default RemoveFilters;
