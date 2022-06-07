import React, { useContext } from 'react';
import Context from '../context/Context';
import Loading from '../img/loading.gif';
import TableHeader from './TableHeader';

function Table() {
  const { data, filterByName } = useContext(Context);

  return (
    !data ? <img src={ Loading } alt="loading..." />
      : (
        <table>
          <TableHeader />
          <tbody>
            {data.filter(({ name }) => name
              .includes(filterByName.name))
              .map(({
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbitalPeriod,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
                population,
                films,
                created,
                edited,
                url },
              index) => (
                <tr key={ index }>
                  <td>{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>))}
          </tbody>
        </table>
      )
  );
}

export default Table;
