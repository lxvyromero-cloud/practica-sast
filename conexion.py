import sqlite3
def buscar_usuario(nombre):
    # Esto es vulnerable a SQL Injection (Paso 37 de tu guía)
    query = "SELECT * FROM usuarios WHERE nombre = '" + nombre + "'"
    return query
