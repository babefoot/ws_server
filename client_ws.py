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
        print("4. Scan a card")
        print("5. Quit")
        choice = input("Enter your choice: ")
        #switch case
        if choice == '1':
            scorers = []
            id_scorer = input("Enter the id of the scorer : ")
            while id_scorer != '':
                scorers.append(id_scorer)
                id_scorer = input("Enter the id of the scorer : ")
            id_game = input("Enter the id of the game: ")
            payload = "{ \"team\" : \"R\", \"id_game\" : \""+id_game+"\", \"scorers\" : " + str(scorers).replace("'", '"') + "}"
            message = '{ "token":"'+token+'", "action":"goal", "payload" :' + payload + '}'
        elif choice == '2':
            scorers = []
            id_scorer = input("Enter the id of the scorer : ")
            while id_scorer != '':
                scorers.append(id_scorer)
                id_scorer = input("Enter the id of the scorer : ")
            id_game = input("Enter the id of the game: ")
            payload = "{ \"team\" : \"B\", \"id_game\" : \""+id_game+"\", \"scorers\" : " + str(scorers).replace("'", '"') + "}"
            message = '{ "token":"'+token+'", "action":"goal", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '3':
            id_game = input("Enter the id of the game: ")
            payload = "{ \"id_game\" : \""+id_game+"\"}"
            message = '{ "token":"'+token+'", "action":"end_game", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '4':
            id_card = input("Enter the id of the card: ")
            payload = "{ \"id_card\" : \""+id_card+"\"}"
            message = '{ "token":"'+token+'", "action":"scan_card", "payload" :' + payload + '}'
            ws.send(message)
        elif choice == '5':
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

