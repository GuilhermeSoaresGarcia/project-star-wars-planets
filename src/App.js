import React, { useEffect, useState } from 'react';
import './App.css';
import Context from './context/Context';
import fetchPlanets from './helpers/FetchAPI';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets();
      setData(planetsRequest);
    };
    requestApi();
  }, []);

  return (
    <>
      <h1>Star Wars</h1>
      <Context.Provider value={ data }>
        <Table />
      </Context.Provider>
    </>
  );
}

export default App;
