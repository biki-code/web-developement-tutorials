import React from "react";
import ReactDOM from "react-dom";
import Phonebook from "./Components/Phonebook"

const App = () => {
  const phonebook = {
    name: "Superadvanced web phonebook app",
    contacts: [
      {
        name: "John Doe",
        phone: "358401234567",
        id: 1,
      },
      {
        name: "Jane Doe",
        phone: "44551234567",
        id: 2,
      },
      {
        name: "Foo bar",
        phone: "000",
        id: 3,
      },
    ],
  };

  return (
    <>
      <Phonebook phonebook={phonebook} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
