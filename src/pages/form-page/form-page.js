import React, { useEffect, useState } from "react";
import { ERGAST_URL } from "_pages/main-page/main-page";

import { Button } from "_atoms";
import { Table } from "_molecules";
import { Article } from "_organisms/form/form-section.styled.js";
import axios from "axios";

const years = [];
const currentYear = new Date().getFullYear();

for (let i = currentYear; i >= 1950; i--) {
  years.push(i);
}

const FormPage = () => {
  const [raceInfo, setRaceInfo] = useState({});
  const [availableCircuits, setAvailableCircuits] = useState({});
  const [enteredLocation, setEnteredLocation] = useState("");
  const [enteredYear, setEnteredYear] = useState("");

  const yearChangeHandler = (event) => {
    setEnteredYear(event.target.value);
    axios
      .get(`${ERGAST_URL}/${event.target.value}/circuits.json`)
      .then((response) => {
        setAvailableCircuits(response.data);
      });
  };

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .get(
        `${ERGAST_URL}/${enteredYear}/circuits/${enteredLocation}/results.json`
      )
      .then((response) => {
        setRaceInfo(response.data);
      });
  };

  return (
    <Article>
      <form onSubmit={onSubmitHandler}>
        <div className="form-inputs">
          <div>
            <label htmlFor="year-select">Year</label>
            <select required id="year-select" onChange={yearChangeHandler}>
              <option value="" disabled selected hidden>
                Select year...
              </option>
              {years.map((year, index) => (
                <option value={year} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location-select">Gran Prix Location</label>
            <select
              required
              name="locations"
              id="location-select"
              onChange={locationChangeHandler}
            >
              <option value="" disabled selected hidden>
                Select location...
              </option>
              {Object.keys(availableCircuits).length &&
                availableCircuits.MRData.CircuitTable.Circuits.map(
                  (item, index) => (
                    <option value={item.circuitId} key={index}>
                      {item.circuitName}
                    </option>
                  )
                )}
            </select>
          </div>
          <Button preset="primary" type="submit">
            Check Results
          </Button>
        </div>
        {Object.keys(raceInfo).length > 0 && (
          <Table preset="other" info={raceInfo.MRData.RaceTable.Races} />
        )}
      </form>
    </Article>
  );
};

export default FormPage;
