---
title: 5-Il Robot Esploratore (Evita-Ostacoli) 🤖
description: 'Integrare input (sensore) e output (motori) in un ciclo continuo per permettere al robot di navigare in autonomia in una stanza senza sbattere.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 5-Il Robot Esploratore (Evita-Ostacoli) 🤖

**Obiettivo:** Integrare input (sensore) e output (motori) in un ciclo continuo per permettere al robot di navigare in autonomia in una stanza senza sbattere.

**Concetti Chiave:**

*   Autonomia robotica (Senso  $\to$  Decisione  $\to$  Azione).
*   Logica Condizionale avanzata in un ciclo continuo (`forever`).
*   Calibrazione dei tempi di manovra.


### Fase 1: Teoria - Come ragiona un veicolo autonomo? 🧠

*   **Il Ciclo di Guida Autonoma:** *"Come fa un'auto a guida autonoma a non fare incidenti?"*. Il principio base è sempre lo stesso: 
	*   **Sente** (legge l'ambiente con i sensori).
	*   **Pensa** (elabora i dati con il codice).
	*   **Agisce** (muove i motori o frena).
	
*   **Il nostro Algoritmo:** Il nostro robot dovrà fare esattamente questo in una frazione di secondo, ripetutamente:
    1.  **Sente:** Legge la distanza di fronte a sé.
    2.  **Pensa:** L'ostacolo è a meno di 15 cm?
    3.  **Agisce:** Se SÌ  $\to$  Frena, fai retromarcia, girati. Se NO  $\to$  Continua dritto.

*   **Sicurezza in Aula:** Poiché i robot si muoveranno da soli, è fondamentale creare uno spazio "recintato" sul pavimento o assicurarsi che non cadano dai tavoli!


### Fase 2: Costruzione del "Cervello" 🧩

Iniziamo a programmare. Questa volta useremo il ciclo `forever` perché il robot non deve mai smettere di guardarsi intorno.

| Sezione | Blocco | Istruzione e Funzione |
| :--- | :--- | :--- |
| **Variables** | `Make a Variable` | Creiamo la variabile **`distanza`** (se non l'abbiamo già). |
| **Basic** | `forever` | È il cuore del programma, tutto va qui dentro. |
| **Variables** | `set...to` | **`set distanza to (Ultrasonic distance)`** *Il robot "apre gli occhi" e misura lo spazio davanti a sé.* |
| **Logic** | `if...then...else` | Inseriamo il blocco di decisione sotto il `set`. |
| **Logic** | `0 < 0` | Impostiamo la condizione: **`if distanza < 15 then`** *(Soglia di pericolo: 15 cm).*|



### Fase 3: Azione! (Programmare le Manovre)  🚧

Ora riempiamo l'`if` (cosa fare se c'è pericolo) e l'`else` (cosa fare se la strada è libera).

* **Sezione `if` (PERICOLO - Ostacolo vicino):** Dobbiamo fermarci, indietreggiare un po' e girare per cercare una nuova strada.

| Sezione | Blocco | Istruzione e Funzione |
| :--- | :--- | :--- |
| **MiniCar** | `motor...` | **`motor = All Direction = Backward speed = 100`** *Frena e fai retromarcia.* |
| **Basic** | `pause` | **`pause (ms) 500`** (Indietreggia per mezzo secondo). |
| **MiniCar** | `motor...` | **`motor = A = Forward speed = 100`** 
|||**`motor = B = Backward speed = 100`**** *Girati verso destra per cercare una via libera.*|
| **Basic** | `pause` | **`pause (ms) 400`** (Calibrare questo tempo è fondamentale!). |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 0`** *Ferma i motori un istante per stabilizzare il robot prima di ripartire.* |

* **Sezione `else` (STRADA LIBERA):** Se non ci sono ostacoli a meno di 15 cm, andiamo avanti tranquilli!

| Sezione | Blocco | Istruzione e Funzione |
| :--- | :--- | :--- |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 80`**|

*Nota: Usiamo una velocità un po' più bassa (es. 80) per dare al sensore il tempo di "vedere" gli ostacoli in tempo!* 


<center>
	<img src="/img/robotica/minicarmotrultrasonic1.png" alt="minicarmotrultrasonic1.png" width="300"/>
</center>


### Fase 4: Collaudo e Messa a Punto (Tuning) 🔧

Questa è la parte più divertente (e caotica) della lezione. Scaricate il programma, accendete l'interruttore delle batterie e posizionate i robot a terra.

**Sfide di Messa a Punto (Debugging in tempo reale):**

*   **Il robot sbatte lo stesso!** *Soluzione:* Forse la velocità (80) è troppo alta per i riflessi del sensore? Oppure la soglia di distanza (15 cm) è troppo bassa? Provate ad aumentare la soglia a 20 cm.
*   **Il robot rimane incastrato negli angoli.** *Soluzione:* Modificate il tempo della curva (il `pause` dopo il `Turn_Right`). Se gira troppo poco (es. 200 ms), vedrà di nuovo lo stesso muro. Aumentate il tempo a 500 ms o 600 ms per fargli fare una curva più ampia.

**Sfida Extra per i più veloci:** "Riuscite ad aggiungere i fari RGB a questo programma? (Es: Fari Verdi quando va dritto, Fari Rossi quando fa retromarcia e fa la curva!)".