import "./App.css";
import React from "react";
import LineChart from "./components/LineChart";
import { useState, useEffect } from "react";

function App() {
  const [dataType, setDataType] = useState("");
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataBaseCols, setDataBaseCols] = useState([]);
  const [dataBaseData, setDataBaseData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/data");
        const json = await response.json();
        if (response.ok) {
          setDataBaseData(json.data);
          setDataBaseCols(Object.keys(json.data[0]).slice(1, 7));
          setLength(json.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataBaseData) {
      setLabels(dataBaseData.map((item) => item.Date));
      setData(dataBaseData.map((item) => item[dataType]));
      setSliderValue(100);
      setLoaded(true);
    }
  }, [dataType, dataBaseData]);

  useEffect(() => {
    if (dataBaseData) {
      let spliceVal = Math.floor((sliderValue / 100) * length);
      if (spliceVal < 3) {
        spliceVal = 4;
      }
      setLabels(dataBaseData.slice(0, spliceVal).map((item) => item.Date));
      setData(dataBaseData.slice(0, spliceVal).map((item) => item[dataType]));
    }
  }, [sliderValue]);

  const onSelectChange = (e) => {
    setDataType(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Lumber Data Dashboard</h1>
      </header>
      <section className="wrapper">
        <form className="form">
          <select className="select" onChange={onSelectChange}>
            <option value="">Select a Data Type</option>
            {dataBaseCols.map((col, i) => (
              <option key={i} value={col}>
                {col}
              </option>
            ))}
          </select>
        </form>
        {loaded ? (
          <LineChart
            id="linechart"
            data={data}
            labels={labels}
            title={dataType}
          />
        ) : null}
        <div className="slidecontainer">
          <label className="slider-label">Date Slider:</label>
          <input
            type="range"
            min="1"
            max="100"
            className="slider"
            id="myRange"
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
