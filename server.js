const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS (Allows API to be accessed from different domains)
app.use(cors());

// Route to return current timestamp
app.get("/api/timestamp", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

// Route to return timestamp for a given date
app.get("/api/timestamp/:date", (req, res) => {
  let { date } = req.params;

  // If date is a number (Unix timestamp), convert to an integer
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Timestamp Microservice!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
