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

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets();
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
            <Context.Provider value={ { data, filterByName, searchPlanetByName } }>
              <FilterByName />
              <Table />
            </Context.Provider>
          )
      }
    </>
  );
}

export default App;
