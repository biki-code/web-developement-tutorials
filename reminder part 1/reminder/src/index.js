import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [
        {
          name: "Buy some eggs",
          timestamp: "2018-11-10T13:00:00.141Z",
          id: 1
        },
      ],
      newName: "",
    };
  }

  onChange(value) {
    this.setState({...this.state.reminders, ...value})
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h2>Reminders</h2>
        <form>
          <div>
            Name: <input onChange={this.onChange.bind(this)}/>
          </div>
          <div>
            Date: <input type="datetime-local" />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>

        {this.state.reminders.map(({ name, timestamp, id }) => (
          <div key={id}>
            {`${timestamp} ${name}`}
          </div>
        ))}
        <div>debug: {this.state.newName}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
