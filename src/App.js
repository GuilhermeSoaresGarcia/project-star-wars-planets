import React, { useEffect, useState } from 'react';
import './App.css';
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

  console.log(data);
  return (
    <>
      <h1>Star Wars</h1>
      <Table />
    </>
  );
}

export default App;
