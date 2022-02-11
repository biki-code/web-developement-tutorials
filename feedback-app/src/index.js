import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  useEffect(() => {
    // This will run every time good, neutral, bad is changed
    console.log(`There are ${good} good reviews so far`);
    console.log(`There are ${neutral} neutral reviews so far`);
    console.log(`There are ${bad} bad reviews so far`);
  }, [good, neutral, bad]);

  return (
    <div>
      <p>
        <div>There are {good} good reviews so far</div>
        <div>There are {neutral} neutral reviews so far</div>
        <div>There are {bad} bad reviews so far</div>
      </p>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
    </div>
  );
};

ReactDOM.render(<Feedback />, document.getElementById("root"));
