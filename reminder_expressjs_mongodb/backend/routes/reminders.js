const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminders");

// Getting all reminders
router.get("/", async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one reminder
router.post("/", async (req, res) => {
  const name = req.body.name;
  if (await checkReminderExist(name))
    return res.status(500).json({ message: "reminder exists already" });

  const reminder = new Reminder({
    name: name,
    timestamp: new Date(),
    id: await generateId(),
  });

  try {
    const newReminder = await reminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get progressive id based on the last value on the DB
const generateId = async () => {
  const reminders = await Reminder.find();
  const maxId =
    reminders.length > 0
      ? reminders
          .map((item) => item.id)
          .sort((a, b) => a - b)
          .reverse()[0]
      : 1;

  return maxId + 1;
};

// check if a reminder with the current name exists already
const checkReminderExist = async (name) => {
  const reminder = await Reminder.find({ name: name });
  return reminder.length !== 0;
};

// Getting one reminder
router.get("/:id", getReminder, (req, res) => {
  res.json(res.reminder);
});

// Deleting one reminder
router.delete("/:id", getReminder, async (req, res) => {
  try {
    await res.reminder.remove();
    res.json({ message: "Deleted this reminder" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for getting reminder object
async function getReminder(req, res, next) {
  let reminder;

  try {
    reminder = await Reminder.find({ id: Number(req.params.id) });
    if (!reminder || !reminder.length) {
      return res.status(404).json({ message: "Can't find reminder" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  [res.reminder] = reminder;
  next();
}

module.exports = router;
