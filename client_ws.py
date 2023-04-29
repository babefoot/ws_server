import websocket
import sys 

device = sys.argv[1]

# Adresse URL du serveur websocket
websocket_url = "ws://localhost:8080/"

# Fonction qui sera appelée lorsqu'une nouvelle donnée sera reçue


def on_message(ws, message):
    print(message)


token = '#^lxn6`S@Z9CGD'
# Fonction qui sera appelée lors de l'ouverture de la connexion websocket


def on_open(ws):
    print("Connexion établie")
    message = '{ "token":"'+token+'", "action":"auth", "me" : "'+device+'"}'
    ws.send(message)
    print(f"Message envoyé : {message}")


# Création d'une connexion websocket
ws = websocket.WebSocketApp(websocket_url, on_message=on_message)

# Assignation de la fonction on_open à l'événement on_open de la connexion websocket
ws.on_open = on_open

# Démarrage de la connexion
ws.run_forever()

