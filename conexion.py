import sqlite3

# ERROR 1: Contraseña expuesta (Hardcoded Secret)
DB_PASSWORD = "super-secret-password-123" 

def buscar_usuario(nombre_usuario):
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()

    # ERROR 2: Inyección SQL (Concatenación directa)
    query = "SELECT * FROM usuarios WHERE nombre = '" + nombre_usuario + "'"

    cursor.execute(query)
    return cursor.fetchone()
