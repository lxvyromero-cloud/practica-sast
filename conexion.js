require('dotenv').config(); // para variables de entorno

const express = require('express');
const mysql = require('mysql');
const app = express();

// ✅ Conexión segura (sin credenciales hardcodeadas)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD, // protegida
  database: 'testdb'
});

app.use(express.json());

// ✅ Endpoint protegido contra SQL Injection
app.get('/user', (req, res) => {
  const username = req.query.username;

  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      res.status(500).send("Error en la consulta");
    } else {
      res.json(result);
    }
  });
});

// ✅ Reemplazo de eval() por alternativa controlada
app.post('/calc', (req, res) => {
  const expression = req.body.expression;

  try {
    // ⚠️ Validación básica (solo números y operadores)
    if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
      return res.status(400).send("Expresión inválida");
    }

    const result = Function('"use strict"; return (' + expression + ')')();
    res.send("Resultado: " + result);
  } catch (e) {
    res.status(500).send("Error al evaluar");
  }
});

// ✅ Cookie segura
app.get('/login', (req, res) => {
  res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.send("Sesión iniciada de forma segura");
});

app.listen(3000, () => {
  console.log("Servidor seguro corriendo en puerto 3000");
});
