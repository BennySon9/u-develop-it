const express = require("express");
// const mysql = require("mysql2"); DELETED AND MOVED TO DB/CONNECTION.JS
const db = require("./db/connection");
// const inputCheck = require("./utils/inputCheck");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", apiRoutes);

// // Connect to database
// const db = mysql.createConnection( // REMOVED AND PLACED IN DB/CONNECTION.JS
//   {
//     host: "localhost",
//     // Your MySQL username,
//     user: "root",
//     // Your MySQL password
//     password: "Lincolnb1234!",
//     database: "election",
//   },
//   console.log("Connected to the election database.")
// );

// Get all candidates and their party affiliation
// app.get("/api/candidates", (req, res) => {
//   const sql = `SELECT candidates.*, parties.name
//              AS party_name
//              FROM candidates
//              LEFT JOIN parties
//              ON candidates.party_id = parties.id`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // GET a single candidate with party affiliations
// app.get("/api/candidate/:id", (req, res) => {
//   const sql = `SELECT candidates.*, parties.name
//              AS party_name
//              FROM candidates
//              LEFT JOIN parties
//              ON candidates.party_id = parties.id
//              WHERE candidates.id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });

// Create a candidate
// app.post("/api/candidate", ({ body }, res) => {
//   const errors = inputCheck(
//     body,
//     "first_name",
//     "last_name",
//     "industry_connected"
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id)
//   VALUES (?,?,?,?)`;
//   const params = [
//     body.first_name,
//     body.last_name,
//     body.industry_connected,
//     body.party_id,
//   ];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// Update a candidate's party
// app.put("/api/candidate/:id", (req, res) => {
//   const errors = inputCheck(req.body, "party_id");

//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }
//   const sql = `UPDATE candidates SET party_id = ?
//                WHERE id = ?`;
//   const params = [req.body.party_id, req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       // check if a record was found
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Candidate not found",
//       });
//     } else {
//       res.json({
//         message: "success",
//         data: req.body,
//         changes: result.affectedRows,
//       });
//     }
//   });
// });

// Delete a candidate
// app.delete("/api/candidate/:id", (req, res) => {
//   const sql = `DELETE FROM candidates WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Candidate not found",
//       });
//     } else {
//       res.json({
//         message: "successfully deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// // get all parties
// app.get("/api/parties", (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// // get a single party
// app.get("/api/party/:id", (req, res) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: row,
//     });
//   });
// });

// // delete a party
// app.delete("/api/party/:id", (req, res) => {
//   const sql = `DELETE FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       // checks if anything was deleted
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Party not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
