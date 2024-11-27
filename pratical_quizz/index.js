const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MySQL55!root",
  database: "pratical_quizz",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.post("/add", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to create user" });
    } else {
      res.status(201).json({ message: "User created", id: result.insertId });
    }
  });
});

app.get("/records", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/records/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    } else if (result.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(query, [name, email, userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to update user" });
    } else {
      res.status(200).json({ message: "User updated" });
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete user" });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
