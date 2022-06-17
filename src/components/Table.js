import React, { useContext } from 'react';
import Context from '../context/Context';
import TableHeader from './TableHeader';
import planetsImages from '../data/planetsImages';

function Table() {
  const { filteredData } = useContext(Context);

  return (
    <table>
      <TableHeader />
      <tbody>
        {filteredData.map(({
          name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films
          // created,
          // edited,
          // url
        },
        index) => (
          <tr key={ index }>
            <td>
              <img
                alt={ name }
                src={ planetsImages.filter(({ planet }) => planet === name)[0].image }
              />
            </td>
            <td data-testid="planet-name">{name}</td>
            <td>{rotationPeriod}</td>
            <td>{orbitalPeriod}</td>
            <td>{diameter}</td>
            <td>{climate}</td>
            <td>{gravity}</td>
            <td>{terrain}</td>
            <td>{surfaceWater}</td>
            <td>{population}</td>
            <td>{films}</td>
            {/* <td>{created}</td>
            <td>{edited}</td>
            <td>{url}</td> */}
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
