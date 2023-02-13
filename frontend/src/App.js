import "./App.css";
import React from "react";
import LineChart from "./components/LineChart";
import { useState } from "react";

function App() {
  const [dataType, setDataType] = useState("");

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  let database_cols = ["test1", "test2", "test3"];

  const onSelectChange = (e) => {
    setDataType(e.target.value);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Lumber Data Dashboard</h1>
      </header>
      <form>
        <select onChange={onSelectChange}>
          {database_cols.map((col, i) => (
            <option key={i} value={col}>
              {col}
            </option>
          ))}
        </select>
      </form>
      <LineChart data={data} labels={labels} name={"Test"} title={"test"} />
    </div>
  );
}

export default App;
