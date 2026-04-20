---
title: 9-Il Cestino Smart con Sensore e Servo 🗑️🤖
description: 'Costruzione cestino smart con sensore a ultrasuoni e servomotore'
draft: false
date: 2026-04-20
category: Microbit
class_target: "1, 2, 3"
image: /img/robotica/secchio-smart.webp
---

# 9-Il Cestino Smart con Sensore e Servo 🗑️🤖

## 1. Analisi del Problema

Dobbiamo trasformare un "movimento fisico" in un'azione digitale.

*   **Input:** La distanza misurata dal sensore ad ultrasuoni (HC-SR04).
*   **Soglia:** Se la mano è a **meno di 10 cm**.
*   **Output (La Sequenza):**
    
    1.  Apertura (Rotazione a 180°).
    2.  Pausa di movimento (Blocco a 90° dopo 500ms).
    3.  Attesa (5 secondi per buttare la carta).
    4.  Chiusura (Ritorno a 0°).
    5.  Riposo (Blocco finale a 90°).


## 2. Il Cablaggio

Assicuriamoci di collegare correttamente il servo:

*   **Giallo/Arancione (Segnale):** Pin **P10**.
*   **Rosso (VCC):** 3V o batteria esterna.
*   **Marrone/Nero (GND):** Pin GND.


## 3. La struttura dei blocchi (Logica "Sempre")

Dovrai trascinare questi blocchi dall'area **MiniCar** (per il sensore) e dall'area **Pin** (per il servo).


### 1. Preparazione della Variabile

Sotto il blocco **`per sempre`** (forever):

*   Vai su `Variabili` -\> `Imposta [distanza] a...`
*   Incastra il blocco della categoria `MiniCar`: **`Ultrasonic port (cm)`**



### 2. La condizione "SE" (Il Cervello)

Subito sotto, aggiungi un blocco **`se [ ] allora ... altrimenti`** dalla categoria `Logica`:

*   Nella condizione metti: **`[distanza] < [10]`**



### 3. La sequenza di apertura (Dentro il "SE")

Qui scrivi i comandi per il movimento che hai chiesto:

1.  **Apertura:** `servomotore scrivi pin [P10] angolo [180]` (Categoria Avanzate -\> Pin)
2.  **Movimento:** `pausa (ms) [500]` (Categoria Fondamentali)
3.  **Blocco:** `servomotore scrivi pin [P10] angolo [90]` (Ferma la forza del motore)
4.  **Attesa carta:** `pausa (ms) [5000]` (I 5 secondi che hai chiesto)
5.  **Chiusura:** `servomotore scrivi pin [P10] angolo [0]`
6.  **Movimento:** `pausa (ms) [500]`
7.  **Riposo finale:** `servomotore scrivi pin [P10] angolo [90]`



### 4. La condizione di riposo (Dentro "ALTRIMENTI")

*   Trascina un ultimo blocco: `servomotore scrivi pin [P10] angolo [90]` _(Questo serve a dire al robot: "Se non c'è nessuno, tieni il braccetto del motore rilassato al centro")._


<center>
	<img src="/img/cestino1.webp" alt="cestino1.webp" width="300"/>
</center>


### 💡 Suggerimenti per i blocchi:

*   **Dove trovo il Servo?** Se non lo vedi, clicca su **Avanzate** (in fondo alla lista dei colori) -\> **Pin**. Lì troverai il blocco rosso con scritto `servomotore scrivi pin...`.
*   **Il valore 90:** Ricorda che per un servo standard a 180°, il valore **90** è la posizione centrale. Se vedi che il secchio non si chiude bene, prova a cambiare lo 0 con un 10 o il 180 con un 170.
*   **Velocità:** Se il secchio "sbatte" troppo forte quando si chiude, aggiungi una piccola pausa tra gli angoli.

**Prova a comporre i blocchi così: se metti la mano davanti al sensore ultrasuoni, il Micro:bit dovrebbe iniziare la sequenza e vedrai il braccetto del servo scattare!**



## 4. Debugging Meccanico

Se non funziona, controllate:

*   **Il Servo "vibra" durante i 5 secondi:** Significa che l'angolo 180° (o 0°) è troppo estremo e il servo sta spingendo contro il fine corsa meccanico del secchio. _Soluzione:_ Provate a usare 160° e 20°.
*   **Letture false:** Se il cestino si apre da solo, il sensore ultrasuoni sta leggendo un riflesso. Provate ad alzare la soglia a 5 cm o a inclinare leggermente il sensore.
*   **Potenza:** Se il Micro:bit si resetta quando il servo parte, ricordate che la **batteria 18650** (o pile nuove) è fondamentale per gestire lo spunto di corrente del motore.


### Ricorda

Fai notare ai ragazzi perché usiamo l'angolo **90** per "fermare" il motore. In un servo standard a 180°, il valore 90 è il centro. Dandogli questo valore dopo il movimento, togliamo lo sforzo di "tiro" continuo, salvaguardando la vita degli ingranaggi in plastica del piccolo SG90.

Ti piace questa struttura o vuoi che aggiungiamo un segnale acustico (Beep) quando il secchio sta per chiudersi?
