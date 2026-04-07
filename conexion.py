import sqlite3

def consultar_usuario(id_usuario):
    db = sqlite3.connect("datos.db")
    cursor = db.cursor()
    # Esto es una vulnerabilidad de Inyección SQL (concatenación directa)
    query = "SELECT * FROM usuarios WHERE id = " + id_usuario
    cursor.execute(query)
    return cursor.fetchone()
