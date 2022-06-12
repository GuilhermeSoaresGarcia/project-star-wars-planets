import React, { useContext } from 'react';
import Context from '../context/Context';

function RemoveFilters() {
  const { filterByNumericValues } = useContext(Context);
  console.log(filterByNumericValues);
  return (
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
                console.log('remover');
                console.log(filterByNumericValues);
              } }
            >
              Remover
            </button>
          </li>))}
    </ol>

  );
}

export default RemoveFilters;
