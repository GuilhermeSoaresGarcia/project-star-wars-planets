import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterByName() {
  const { filterByName, searchPlanetByName } = useContext(Context);
  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ searchPlanetByName }
      value={ filterByName.name }
    />
  );
}

export default FilterByName;
