import React,{useState,useEffect} from 'react';
import './App.css';
import { FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries,setCountries]=useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});              //empty object
  const [tableData,setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries]= useState([]);
  const [casesType,setCasesType] =useState("cases");

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
    })
  },[])

  useEffect(()=>{
    //async -> send a request, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>(
          {
          name:country.country,                   //India,United Kingdom
          value:country.countryInfo.iso2,       //IN,UK
          cases:country.cases,
          todayCases:country.todayCases
        }
        ));
        const sortedData=sortData(countries);
        setCountries(countries);
        console.log(countries);
        setTableData(sortedData);
        setMapCountries(data);
      })
    }
    console.log("countries",tableData)
    
    getCountriesData();
  },[]);


  const onCountryChange = async (event) => {
    const countryCode=event.target.value;
    

    const url= countryCode === "Worldwide" ? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setInputCountry(countryCode);               //sets the input to select box
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);
    })
  }
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 Tracker</h1>
      <FormControl className="app__dropdown">
      <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
         <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            countries.map((country)=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox onClick={e =>setCasesType('cases')} active={casesType === "cases"} title="Coronavirus Cases" isRed total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>
        <InfoBox onClick={e=>setCasesType('recovered')} active={casesType === "recovered"} title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
        <InfoBox onClick={e=>setCasesType('deaths')} active={casesType === "deaths"} title="Deaths" isRed total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>
      </div>
      
      {/*header*/}
      {/*title+ dropdown*/}

      {/*infoboxes*/}
      {/*infoboxes*/}
      {/*infoboxes*/}

      {/*table*/}
      {/*graph*/}

      {/*map*/}
      <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Number of Cases by Country</h3>
          <Table countries={tableData}/>
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
