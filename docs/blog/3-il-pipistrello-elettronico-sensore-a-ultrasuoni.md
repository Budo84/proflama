---
title: 3-Il Pipistrello Elettronico (Sensore a Ultrasuoni) 
description: 'Comprendere il funzionamento dell''ecolocalizzazione, leggere i dati dal sensore a ultrasuoni e usare la logica condizionale per creare un sensore di parcheggio visivo.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 3-Il Pipistrello Elettronico (Sensore a Ultrasuoni) 

**Obiettivo:** Comprendere il funzionamento dell'ecolocalizzazione, leggere i dati dal sensore a ultrasuoni e usare la logica condizionale per creare un "sensore di parcheggio" visivo.

**Concetti Chiave:**

*   Funzionamento dei sensori a ultrasuoni (Ecolocalizzazione: trigger ed echo).
*   Variabili (per memorizzare la distanza letta).
*   Logica Condizionale (`if / else`).
*   Integrazione con i fari RGB (visti nella lezione precedente).


### Fase 1: Teoria - Come "vede" un Pipistrello? 🗣️

*   **L'Ecolocalizzazione:** *Come fanno i pipistrelli o i delfini a non sbattere al buio?"*. Il sensore montato sulla porta frontale (Ultrasonic port) funziona esattamente così: un "occhio" invia un suono acutissimo (invisibile all'orecchio umano, un *ultrasuono*), il suono sbatte contro un ostacolo e torna indietro all'altro "occhio".
*   **La Matematica del Suono:** Il chip calcola quanto tempo ci ha messo il suono a fare andata e ritorno. Conoscendo la velocità del suono, calcola la distanza in centimetri. Tutto questo avviene in frazioni di secondo!
*   **La Variabile:** Per usare questo dato, dobbiamo "inscatolarlo" in una Variabile che chiameremo **`distanza`**.

### Fase 2: Lettura dei Dati 📏

Iniziamo scrivendo un programma base per leggere il valore dal sensore e mostrarlo sullo schermo della microbit.

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Variables** | `Make a Variable` | Crea una variabile e chiamala **`distanza`**. |     |
| **Basic** | `forever` | (Ciclo continuo) | Blocco principale. |
| **Variables** | `set...to` | **`set distanza to...`** *Prepariamo la scatola per ricevere il dato.* | Dentro `forever`. |
| **MiniCar** | `Ultrasonic...` | Cerca il blocco di lettura del sensore a ultrasuoni (es. `Ultrasonic sensor distance`) e inseriscilo nello spazio vuoto del blocco `set`. | Nello spazio del `set`. |
| **Basic** | `show number` | **`show number distanza`** *Fa scorrere il numero (in cm) sulla matrice LED.* | Sotto il `set`. |


<center>
	<img src="/img/robotica/minicarultrasuoni1.png" alt="minicarultrasuoni1.png" width="400"/>
</center>


**Test:** Mettendo una mano davanti al sensore (Ultrasonic port) e allontanandola, si vedranno i numeri sul display del micro:bit cambiare (es. 5, 12, 20...).


### Fase 3: Il Sensore di Parcheggio 🚨

Ora uniamo le conoscenze! Se l'ostacolo è troppo vicino, accendiamo i fari di rosso (allarme); se la strada è libera, li accendiamo di verde.

**Nota**: Rimuovi o metti da parte il blocco `show number` della fase 2, altrimenti il programma sarà troppo lento a causa dello scorrimento dei numeri sul display.

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Basic** | `forever` | **`set distanza to (Ultrasonic distance)`** *Manteniamo la lettura costantemente aggiornata.* | Dentro `forever`. |
| **Logic** | `if...then...else` | **`if distanza < 15 then`** *Se la distanza è minore di 15 cm... (Pericolo!)* | Sotto il `set`. |
| **MiniCar** | `RGB_LED...` | Imposta sia **`LED_L`** che **`LED_R`** al colore **`red`** (Rosso). | Nella sezione `if`. |
| **MiniCar** | `LED Show` | **`LED Show`** (Applica il colore rosso). | Nella sezione `if`. |
| **Basic** | `show icon` | **`show icon (X)`** sulla matrice del micro:bit. | Nella sezione `if`. |
| **Logic** | `else` | **Altrimenti...** *(Se la distanza è 15 cm o maggiore).* | Sezione `else`. |
| **MiniCar** | `RGB_LED...` | Imposta sia **`LED_L`** che **`LED_R`** al colore **`green`** (Verde). | Nella sezione `else`. |
| **MiniCar** | `LED Show` | **`LED Show`** (Applica il colore verde). | Nella sezione `else`. |
| **Basic** | `show icon` | **`show icon (Smile)`** sulla matrice del micro:bit. | Nella sezione `else`. |


<center>
	<img src="/img/robotica/minicarultrasuoni2.png" alt="minicarultrasuoni2.png" width="300"/>
</center>


### Fase 4: Sfida e Sperimentazione 🛠️

Il programma ora reagisce all'ambiente circostante.

*   **Sfida 1 (Tre livelli):** "Aggiungere un blocco `else if` per creare un livello intermedio? (Es: \> 20 cm Verde, tra 10 e 20 cm Giallo, \< 10 cm Rosso)".
*   **Sfida 2 (Allarme Sonoro):** "Aggiungere un blocco della sezione `Music` (`play tone`) solo quando il robot entra nella zona rossa, per creare un vero e proprio 'Bip' da sensore di parcheggio".

**Risoluzione dei problemi (Debugging):**

*   **Il robot segna sempre la stessa distanza (es. 0 o un numero fisso):** Il sensore è collegato bene alla "Ultrasonic port"? C'è un ostacolo troppo vicino che "accieca" il sensore?
*   **I colori non cambiano:** Ricordare di inserire il blocco `LED Show` sia nell'`if` che nell'`else`?