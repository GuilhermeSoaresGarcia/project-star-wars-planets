import React, { useEffect, useState } from 'react';
import './App.css';
import Context from './context/Context';
import fetchPlanets from './helpers/FetchAPI';
import FilterByName from './components/FilterByName';
import Loading from './img/loading.gif';
import Table from './components/Table';

function App() {
  const [data, setData] = useState(null);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([
    {
      column: 'population',
      comparison: 'maior que',
      value: '100000',
    }]);

  console.log(filterByNumericValues);

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets(); // Talvez não valha a pena componentizar o fetch como fiz aqui, já que a quantidade de linhas pra fazer funcionar é quase igual a fazer o fetch direto no useEffect
      setData(planetsRequest);
    };
    requestApi();
  }, []);

  const searchPlanetByName = (e) => {
    setFilterByName({ name: e.target.value });
  };

  return (
    <>
      <h1>Star Wars</h1>
      {
        !data
          ? <img src={ Loading } alt="loading..." />
          : (
            <Context.Provider
              value={ {
                data,
                filterByName,
                searchPlanetByName,
                filterByNumericValues,
              } }
            >
              <FilterByName />
              <Table />
            </Context.Provider>
          )
      }
    </>
  );
}

export default App;
