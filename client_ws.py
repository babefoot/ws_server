import websocket
import sys
import threading
import time

device = sys.argv[1]

# Adresse URL du serveur websocket
websocket_url = "ws://localhost:8080/"

# Fonction qui sera appelée lorsqu'une nouvelle donnée sera reçue

#create a thread

id_game = ''


def send_message(ws, message):
    ws.send(message)
    print(f"Message envoyé : {message}")


def print_time(ws):
    while True:
        #make a menu to choose the action
        print("1. Send a goal team red")
        print("2. Send a goal team blue")
        print("3. Send a end of game")
        print("4. Quit")
        choice = input("Enter your choice: ")
        #switch case
        if choice == '1':
            id_scorer = input("Enter the id of the scorer: ")
            id_game = input("Enter the id of the game: ")
            payload = "{ \"team\" : \"r\", \"id_game\" : \""+id_game+"\", \"scorer\" : \""+ id_scorer + "\"}"
            message = '{ "token":"'+token+'", "action":"goal", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '2':
            id_scorer1 = input("Enter the id of the scorer 1 : ")
            id_scorer2 = input("Enter the id of the scorer 2 : ")
            id_game = input("Enter the id of the game: ")
            payload = "{ \"team\" : \"b\", \"id_game\" : \""+id_game+"\", \"scorer1\" : \""+ id_scorer1 + "\" " + ", \"scorer2\" : \"" + id_scorer2 + "\"}"
            message = '{ "token":"'+token+'", "action":"goal", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '3':
            id_game = input("Enter the id of the game: ")
            payload = "{ \"id_game\" : \""+id_game+"\"}"
            message = '{ "token":"'+token+'", "action":"end_game", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '4':
            break
        else:
            print("Invalid choice")
        time.sleep(1)

def on_message(ws, message):
    print(f"Message reçu : {message}")
    if message['action'] == 'game':
       id_game = message['id_game']
       print(id_game)
    elif message['action'] == 'tournament':
       print("Tournament")



token = '#^lxn6`S@Z9CGD'
# Fonction qui sera appelée lors de l'ouverture de la connexion websocket


def on_open(ws):
    print("Connexion établie")
    message = '{ "token":"'+token+'", "action":"auth", "me" : "'+device+'"}'
    ws.send(message)
    print(f"Message envoyé : {message}")


# Création d'une connexion websocket
ws = websocket.WebSocketApp(websocket_url, on_message=on_message)

threading.Thread(target=print_time, args=(ws,)).start()

# Assignation de la fonction on_open à l'événement on_open de la connexion websocket
ws.on_open = on_open

# Démarrage de la connexion
ws.run_forever()

