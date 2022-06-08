import React, { useEffect, useState } from 'react';
import './App.css';
import Context from './context/Context';
import Loading from './img/loading.gif';
import fetchPlanets from './helpers/FetchAPI';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumbers';
import Table from './components/Table';

function App() {
  const [data, setData] = useState(null);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [numericValuesParameters, setNumericValuesParameters] = useState({
    column: '',
    comparison: '',
    value: '0',
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([
    {
      column: '',
      comparison: '',
      value: '0',
    }]);

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets(); // Talvez não valha a pena componentizar o fetch como fiz aqui, já que a quantidade de linhas pra fazer funcionar é quase igual a fazer o fetch direto no useEffect
      setData(planetsRequest);
    };
    requestApi();
  }, []);

  const filterPlanetByName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const getParameters = ({ target }) => {
    const { id, value } = target;
    setNumericValuesParameters(
      {
        ...numericValuesParameters,
        [id]: value,
      },
    );
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
                filterPlanetByName,
                numericValuesParameters,
                getParameters,
                filterByNumericValues,
              } }
            >
              <FilterByName />
              <FilterByNumber />
              <Table />
            </Context.Provider>
          )
      }
    </>
  );
}

export default App;
