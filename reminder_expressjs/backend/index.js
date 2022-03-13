const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const logger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

let reminders = [
  {
    name: "Buy some eggs",
    timestamp: "2021-11-10T13:00:00.141Z",
    id: 1,
  },
  {
    name: "Make an omelette",
    timestamp: "2021-11-11T08:00:00.141Z",
    id: 2,
  },
  {
    name: "Wash dishes",
    timestamp: "2021-11-11T09:00:00.000Z",
    id: 3,
  },
  {
    name: "Buy more eggs",
    timestamp: "2021-11-11T13:00:00.000Z",
    id: 4,
  },
];

app.get("/api/reminders", (req, res) => {
  res.json(reminders);
});

app.get("/api/reminders/:id", (req, res) => {
  const id = Number(req.params.id);
  const reminder = reminders.find((reminder) => reminder.id === id);

  if (reminder) {
    res.json(reminder);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/reminders/:id", (req, res) => {
  const id = Number(req.params.id);
  reminders = reminders.filter((note) => note.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId =
    reminders.length > 0
      ? reminders
          .map((item) => item.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;

  return maxId + 1;
};

const checkNameExist = (name) => {
  return Boolean(reminders.filter((reminder) => reminder.name === name).length);
};

app.post("/api/reminders", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ error: "Name missing" });
  }

  if (checkNameExist(body.name)) {
    return res
      .status(400)
      .json({ error: "name must be unique" });
  }

  const reminder = {
    name: body.name,
    timestamp: new Date(),
    id: generateId(),
  };

  reminders = reminders.concat(reminder);

  console.log(reminder);
  res.json(reminder);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
