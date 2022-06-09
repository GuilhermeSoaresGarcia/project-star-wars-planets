import React, { useEffect, useState } from 'react';
import './App.css';
import Context from './context/Context';
import Loading from './img/loading.gif';
import fetchPlanets from './helpers/FetchAPI';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumbers';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [numericFilterParameters, setNumericFilterParameters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets(); // Talvez não valha a pena componentizar o fetch como fiz aqui, já que a quantidade de linhas pra fazer funcionar é quase igual a fazer o fetch direto no useEffect
      setData(planetsRequest);
      setFilteredData(planetsRequest);
    };
    requestApi();
  }, []);

  useEffect(() => { // Lógica para a filtragem pelas colunas com números
    setFilteredData(data.filter(({ name }) => name.includes(filterByName.name)));
  }, [data, filterByName]);

  useEffect(() => { // Lógica para a filtragem pelas colunas com números
    if (filterByNumericValues.length > 0) {
      let filterResult = data;
      filterByNumericValues.forEach((item) => {
        filterResult = filterResult.filter((planet) => {
          if (item.comparison === 'maior que') {
            return Number(planet[item.column]) > Number(item.value);
          }
          if (filterByNumericValues[0].comparison === 'menor que') {
            return Number(planet[item.column]) < Number(item.value);
          }
          return Number(planet[item.column]) === Number(item.value);
        });
      });
      setFilteredData(filterResult);
    }
  }, [data, filterByNumericValues]);

  const filterPlanetByName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const getParameters = ({ target }) => {
    const { id, value } = target;
    setNumericFilterParameters(
      {
        ...numericFilterParameters,
        [id]: value,
      },
    );
  };

  const filterPlanetByNumbers = () => {
    setFilterByNumericValues([...filterByNumericValues, numericFilterParameters]);
  };

  return (
    <>
      <h1>Star Wars</h1>
      {
        data.length === 0
          ? <img src={ Loading } alt="loading..." />
          : (
            <Context.Provider
              value={ {
                filteredData,
                filterByName,
                filterPlanetByName,
                numericFilterParameters,
                getParameters,
                filterByNumericValues,
                filterPlanetByNumbers,
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
