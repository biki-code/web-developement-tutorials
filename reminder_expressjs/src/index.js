import React from "react";
import ReactDOM from "react-dom";
import api from "./utils/api";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      newName: "",
      newDate: "",
    };
  }

  componentDidMount() {
    this.updateStateFromDB();
  }

  updateStateFromDB() {
    api()
      .get("/reminders")
      .then((res) => {
        this.setState({ reminders: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateDB() {
    api()
      .post("/reminders", {
        name: this.state.newName,
        timestamp: this.state.newDate,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          reminders: [...this.state.reminders, res.data],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteEntry(id) {
    const confirm = window.confirm("Do you want to delete this entry?");
    confirm &&
      api()
        .delete(`/reminders/${id}`)
        .then((res) => this.updateStateFromDB())
        .catch((err) => {
          console.error(err);
        });
  }

  handleNameChange(e) {
    const newName = e.target.value;
    this.setState({ ...this.state, newName: newName });
  }

  handleDateChange(e) {
    const newDate = e.target.value;
    this.setState({ ...this.state, newDate: newDate });
  }

  handleStateUpdate(e) {
    e.preventDefault();

    const newName = this.state.newName;
    const newDate = this.state.newDate;

    if (newName && newDate) {
      if (!this.checkNameExistence(newName)) {
        this.updateDB();
      } else {
        alert("reminder already exists");
      }
    } else {
      alert("Name and/or date is empty");
    }
  }

  checkNameExistence(name) {
    const reminders = this.state.reminders;
    return Boolean(
      reminders.filter((reminder) => reminder.name === name).length
    );
  }

  render() {
    return (
      <div>
        <h2>Reminders</h2>
        <form>
          <div>
            Name: <input onChange={this.handleNameChange.bind(this)} />
          </div>
          <div>
            Date:{" "}
            <input
              type="datetime-local"
              onChange={this.handleDateChange.bind(this)}
            />
          </div>
          <div>
            <button onClick={this.handleStateUpdate.bind(this)} type="submit">
              Add
            </button>
          </div>
        </form>

        {this.state.reminders.map(({ name, timestamp, id }) => (
          <div key={id}>
            <span>{`${timestamp} ${name}`}</span>{" "}
            <button onClick={() => this.deleteEntry(id)}>Delete</button>
          </div>
        ))}
        <h2>Debug</h2>
        <div>newName: {this.state.newName}</div>
        <div>newDate: {this.state.newDate}</div>
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
