import React, { useEffect, useState } from 'react';
import './App.css';
import Context from './context/Context';
import Loading from './img/loading.gif';
import fetchPlanets from './helpers/FetchAPI';
import FilterByName from './components/FilterByName';
import FilterByNumber from './components/FilterByNumbers';
import RemoveFilters from './components/RemoveFilters';
import AlphabeticalOrder from './components/AlphabeticalOrder';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const columnArrayInitialState = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [columnArray, setColumnArray] = useState(columnArrayInitialState);
  const [numericFilterParameters, setNumericFilterParameters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [orderBy, setOrderBy] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

  useEffect(() => {
    const requestApi = async () => {
      const planetsRequest = await fetchPlanets(); // Talvez não valha a pena componentizar o fetch como fiz aqui, já que a quantidade de linhas pra fazer funcionar é quase igual a fazer o fetch direto no useEffect
      setData(planetsRequest);
      setFilteredData(planetsRequest);
    };
    requestApi();
  }, []);

  useEffect(() => { // Lógica para a filtragem pelo nome
    setFilteredData(data.filter(({ name }) => name.includes(filterByName.name)));
  }, [data, filterByName]);

  useEffect(() => { // Lógica para a filtragem pelas colunas com números
    if (filterByNumericValues.length > 0) {
      let filterResult = [];
      filterByNumericValues.forEach((item) => {
        filterResult = filteredData.filter((planet) => {
          if (item.comparison === 'maior que') {
            return Number(planet[item.column]) > Number(item.value);
          }
          if (item.comparison === 'menor que') {
            return Number(planet[item.column]) < Number(item.value);
          }
          return Number(planet[item.column]) === Number(item.value);
        });
      });
      setFilteredData(filterResult);
    }
  }, [filterByNumericValues]);

  useEffect(() => { // Lógica para remover o filtro da coluna
    const copy = [...columnArray]; // Sem o spread, mesmo eu tendo feito uma cópia, as alterações acabam mutando o array original também
    const parameterToRemove = filterByNumericValues.map((parameter) => parameter.column);
    const indexOfFirstSelection = copy.indexOf(String(parameterToRemove));
    if (indexOfFirstSelection >= 0) {
      copy.splice(Number(indexOfFirstSelection), 1);
    } else if (filterByNumericValues.length > 1) {
      const newSelection = filterByNumericValues[filterByNumericValues.length - 1].column;
      const getNewIndex = copy.indexOf(String(newSelection));
      copy.splice(Number(getNewIndex), 1);
    } setColumnArray(copy);
  }, [filterByNumericValues]);

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

  const removeNumericFilter = (event) => {
    const copy = [...columnArray];
    const parameter = event.target.parentElement.innerHTML.split(',')[0];
    copy.push(parameter);
    const removeFromFilterByNumericValues = filterByNumericValues
      .filter((item) => item.column !== parameter);
    setColumnArray(copy);
    setFilterByNumericValues(removeFromFilterByNumericValues);
    setFilteredData(data);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumnArray(columnArrayInitialState);
    setFilteredData(data);
  };

  const orderParameters = ({ target }) => {
    const { name, value } = target;
    setOrderBy({ ...orderBy.order, [name]: value });
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
                columnArray,
                numericFilterParameters,
                getParameters,
                filterByNumericValues,
                filterPlanetByNumbers,
                removeNumericFilter,
                removeAllFilters,
                orderParameters,
                orderBy,
              } }
            >
              <FilterByName />
              <FilterByNumber />
              <RemoveFilters />
              <AlphabeticalOrder />
              <Table />
            </Context.Provider>
          )
      }
    </>
  );
}

export default App;
