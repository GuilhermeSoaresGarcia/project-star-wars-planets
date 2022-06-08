import React, { useContext } from 'react';
import Context from '../context/Context';

function FilterByName() {
  const { filterByName, filterPlanetByName } = useContext(Context);
  return (
    <input
      data-testid="name-filter"
      type="text"
      onChange={ filterPlanetByName }
      value={ filterByName.name }
    />
  );
}

export default FilterByName;
