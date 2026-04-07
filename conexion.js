require('dotenv').config();

const express = require('express');
const mysql = require('mysql2'); // mejor que mysql
const app = express();

// ✅ Crear pool de conexiones (mejor práctica)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(express.json());

// ✅ Validación básica de entrada
function isValidUsername(username) {
  return typeof username === 'string' && username.length > 0 && username.length < 50;
}

// ✅ Endpoint seguro contra SQL Injection
app.get('/user', (req, res) => {
  const username = req.query.username;

  if (!isValidUsername(username)) {
    return res.status(400).send("Parámetro inválido");
  }

  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error en el servidor");
    }
    res.json(results);
  });
});

// ✅ Eliminamos eval completamente (más seguro)
app.post('/calc', (req, res) => {
  const { a, b, op } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).send("Datos inválidos");
  }

  let result;

  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/':
      if (b === 0) return res.status(400).send("División por cero");
      result = a / b;
      break;
    default:
      return res.status(400).send("Operador inválido");
  }

  res.json({ result });
});

// ✅ Cookie segura
app.get('/login', (req, res) => {
  res.cookie('sessionId', 'secureRandomValue123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });

  res.send("Sesión iniciada correctamente");
});

// ✅ Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal");
});

app.listen(3000, () => {
  console.log("Servidor corriendo de forma segura en puerto 3000");
});
