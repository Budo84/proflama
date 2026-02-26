---
title: 2-Accendiamo i Fari RGB
description: 'Imparare a controllare i due fari LED RGB del robot, comprendendo la differenza tra l''impostazione di un colore e la sua effettiva visualizzazione.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 2-Accendiamo i Fari RGB

**Obiettivo:** Imparare a controllare i due fari LED RGB del robot, comprendendo la differenza tra l'impostazione di un colore e la sua effettiva visualizzazione.

**Concetti Chiave:**

*   Cos'è un LED RGB (Red, Green, Blue).
*   Comunicazione: il microbit dice al controller del robot come accendere i LED.
*   Utilizzo del blocco `LED Show`.


### Fase 1: Teoria dei Fari RGB 🌈

*   **Che cos'è RGB?** I fari del robot non sono semplici lampadine, ma LED RGB. "RGB" sta per Rosso (Red), Verde (Green) e Blu (Blue). Mescolando questi tre colori base, il robot può creare quasi ogni colore.
*   **Come ragiona il Robot?** Il microbit da solo non ha i pin sufficienti per tutto, quindi invia un messaggio "segreto" (tramite protocollo IIC) a un chip sul robot che si occupa di accendere fisicamente le luci. Noi, grazie all'estensione `MiniCar`, useremo blocchi semplicissimi senza preoccuparci della complessità elettronica.
*   **La Regola d'Oro dei LED:** Impostare un colore non basta. Bisogna sempre dare il comando di "stampa" o "mostra" per far accendere la luce.


### Fase 2: Il Primo Test (Accensione Base)🚦

Apriamo la categoria **MiniCar** nella Toolbox.

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Basic** | `on start` | (Base) | Blocco principale. |
| **MiniCar** | `LED OFF` | **`LED OFF`** *All'avvio le luci devono essere spente per partire da una situazione pulita.* | Dentro `on start`.|
| **MiniCar** | `RGB_LED...` | **`RGB_LED_R color = red`** *Imposta il faro Destro (R) sul colore Rosso.*| Sotto `LED OFF`. |
| **MiniCar** | `RGB_LED...` | **`RGB_LED_L color = blue`** *Imposta il faro Sinistro (L) sul colore Blu.*| Sotto il blocco precedente. |
| **MiniCar** | `LED Show` | **`LED Show`** *Comando fondamentale, senza questo le luci non si accenderanno. Invia il segnale finale ai LED.* | Alla fine del blocco `on start`. |


<center>
	<img src="/img/robotica/minicarled1.png" alt="minicarled1.png" width="400"/>
</center>


**Test:** I fari dovrebbero accendersi (uno rosso e uno blu) e rimanere fissi.


### Fase 3: Animazione - La Macchina della Polizia 🚓

Ora che sappiamo accendere i fari, rendiamolo dinamico usando il blocco `forever` per creare un'animazione lampeggiante in stile sirena della polizia.

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Basic** | `forever` | (Ciclo continuo) | Blocco separato. |
| **MiniCar** | `RGB_LED...` | Imposta **`LED_L`** a **`red`** e **`LED_R`** a **`blue`**. | Dentro `forever`. |
| **MiniCar** | `LED Show` | **`LED Show`** *Aggiorna le luci.*|     |
| **Basic** | `pause` | **`pause (ms) 300`** *Aspetta un terzo di secondo.* |     |
| **MiniCar** | `RGB_LED...` | Imposta **`LED_L`** a **`blue`** e **`LED_R`** a **`red`**. *Invertiamo i colori!* |     |
| **MiniCar** | `LED Show` | **`LED Show`** *Aggiorna di nuovo le luci.* |     |
| **Basic** | `pause` | **`pause (ms) 300`** |     |



<center>
	<img src="/img/robotica/minicarled2.png" alt="minicarled2.png" width="400"/>
</center>


**Risultato Atteso:** I due fari frontali lampeggeranno alternando rosso e blu continuamente, dando un bellissimo effetto visivo.


### Fase 4: Esplorazione Libera e Debugging 🛠️

*   **Sfida 1:** Creare un effetto 'Semaforo' usando il verde, il giallo e il rosso, temporizzati correttamente
*   **Sfida 2:** Esplorare i blocchi che gestiscono l'intensità (PWM) per creare un effetto di luce che "respira" (diventa gradualmente più luminosa e poi si abbassa).


**Risoluzione dei problemi frequenti:**

*   **Le luci non si accendono:** Ricordare di inserire il blocco `LED Show` dopo aver cambiato i colori
*   **Il robot non si accende:** Le batterie AAA sono inserite correttamente e l'interruttore di accensione (Power switch) è su ON?