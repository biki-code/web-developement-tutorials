import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Components/Button";
import Statistics from "./Components/Statistics";
import "./index.css"

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const check = good || neutral || bad;

  const ratings_class = [
    {
      name: "good",
      state_object: () => setGood(good + 1),
    },
    {
      name: "neutral",
      state_object: () => setNeutral(neutral + 1),
    },
    {
      name: "bad",
      state_object: () => setBad(bad + 1),
    },
  ];

  useEffect(() => {
    // This will run every time good, neutral, bad is changed
    console.log(`There are ${good} good reviews so far`);
    console.log(`There are ${neutral} neutral reviews so far`);
    console.log(`There are ${bad} bad reviews so far`);
  }, [good, neutral, bad]);

  const fraction_positive = (good / (good + neutral + bad)) * 100;
  const percentage_positive = Number.isNaN(fraction_positive)
    ? 0
    : fraction_positive.toFixed(2);
  const avg = ((good + neutral + bad) / 3).toFixed(2);

  return (
    <div>
      <h2>Given Feedback</h2>

      {ratings_class.map(({ name, state_object }) => (
        <Button key={name} name={name} state_object={state_object} />
      ))}

      <h2>Statistics</h2>
      {check ? (
        <table>
          <thead>
            <tr>
              <th>Review type</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            <Statistics _label={"Good"} _value={good} />
            <Statistics _label={"Neutral"} _value={neutral} />
            <Statistics _label={"Bad"} _value={bad} />
            <Statistics _label={"Average"} _value={avg} />
            <Statistics
              _label={"Positive"}
              _value={`${percentage_positive}%`}
            />
          </tbody>
        </table>
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
};

ReactDOM.render(<Feedback />, document.getElementById("root"));
