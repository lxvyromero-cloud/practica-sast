import sqlite3

def buscar_usuario(username):
    db = sqlite3.connect("database.db")
    cursor = db.cursor()
    # ERROR CRÍTICO: Inyección SQL por concatenación directa
    query = "SELECT * FROM users WHERE name = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()
