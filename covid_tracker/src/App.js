import './App.css';
import React, { useState,useEffect } from "react";
import InfoBox from "./InfoBox.js";
import Table from "./Table.js";
import { sortData } from "./util.js";
import { LineGraph } from "./LineGraph.js";

import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(()=>{
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
      };

    getCountriesData();

  },[]);

  const onCountryChanged = (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
  }


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
              
          <Select
                  variant="outlined"
                  onChange={onCountryChanged} value={country}
                >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
          </Select>

          </FormControl>
        </div>


        <div className="app__stats">
            <InfoBox title="Coronavirus Cases" id="stats__cases"
             active={countryInfo.todayCases} 
             total={countryInfo.cases}
            />
            <InfoBox title="Recovered" id="stats__recovered"
             active={countryInfo.todayRecovered} 
             total={countryInfo.recovered}
            />
            <InfoBox title="Deaths" id="stats__deaths"
            active={countryInfo.todayDeaths} 
            total={countryInfo.deaths}
           />
        </div>
        
      </div>

      <h3 id="note">PS:The API(disease.sh) used to fecth data stopped collecting data recently.
        So plz ignore the cases,recovered,death numbers displayed.</h3>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </CardContent>

        <CardContent>
        <h3>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
