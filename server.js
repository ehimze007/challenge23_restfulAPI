require("dotenv/config");

const mongoose = require("mongoose");
const express = require("express");
const User = require("./models/User.js");

const app = express();

// database connection
mongoose
  .connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));

// parse payload in request body
app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
  const { name, email, phone_number } = req.body;

  const user = new User({ name, email, phone_number });

  user
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

// Get all users
app.get("/users", async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Get a specific user by ID
app.get("/users/:id", async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const { name, email, phone_number } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { name, email, phone_number },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(204).json();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
