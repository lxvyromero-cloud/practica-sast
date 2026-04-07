#código de prueba con vulnerabilidad
def conectar_base_de_datos():
    usuario = "admin"
    password = "password123"  # <--- Esto es un Hardcoded Secret 
    print(f"Conectando con {usuario}...")
