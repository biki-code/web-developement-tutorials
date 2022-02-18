const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
	console.log({ res });
	res.send("Hello from Express app");
});

app.post("/", (req, res) => {
	console.log(req.body);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
