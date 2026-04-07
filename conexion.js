const express = require('express');
const mysql = require('mysql');
const app = express();

// ❌ Hardcoded credentials (VULNERABILIDAD)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // contraseña expuesta
  database: 'testdb'
});

app.use(express.json());

// ❌ Endpoint vulnerable a SQL Injection
app.get('/user', (req, res) => {
  const username = req.query.username;

  // ❌ Concatenación directa (SQL Injection)
  const query = "SELECT * FROM users WHERE username = '" + username + "'";

  db.query(query, (err, result) => {
    if (err) {
      res.send("Error en la consulta");
    } else {
      res.json(result);
    }
  });
});

// ❌ Uso de eval (muy inseguro)
app.post('/calc', (req, res) => {
  const expression = req.body.expression;

  try {
    const result = eval(expression); // peligroso
    res.send("Resultado: " + result);
  } catch (e) {
    res.send("Error");
  }
});

// ❌ Cookie insegura
app.get('/login', (req, res) => {
  res.cookie('sessionId', 'abc123'); // sin HttpOnly ni Secure
  res.send("Sesión iniciada");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
