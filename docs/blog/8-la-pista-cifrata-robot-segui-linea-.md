---
title: 8-La Pista Cifrata (Robot Segui-Linea) 🏁
description: 'Comprendere il principio della riflessione della luce, leggere i valori digitali dei sensori di tracciamento e programmare un algoritmo di correzione della traiettoria per seguire un percorso nero su fondo bianco.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 8-La Pista Cifrata (Robot Segui-Linea) 🏁

**Obiettivo:** Comprendere il principio della riflessione della luce, leggere i valori digitali dei sensori di tracciamento e programmare un algoritmo di correzione della traiettoria per seguire un percorso nero su fondo bianco.

## Fase 1: Brainstorming e Teoria 🧠


*   **Domanda alla classe:** *"Come fanno i treni a seguire i binari senza uno sterzo? E se il nostro robot dovesse seguire una linea disegnata a terra senza avere dei binari fisici?"*
*   **Il Segreto è sotto il cofano:** Chiedi ai ragazzi di capovolgere l'auto (spenta). Sotto troveranno i "Line tracking sensors". Spiega che funzionano emettendo luce infrarossa e leggendo il riflesso:
    *   **Il colore BIANCO riflette la luce.** Il sensore legge "0" (Falso/Strada libera).
    *   **Il colore NERO assorbe la luce.** Il sensore non riceve il riflesso e legge "1" (Vero/Linea trovata).
*   **L'Hardware:** Il robot usa un componente chiamato "Voltage comparator" per trasformare questi riflessi in segnali digitali perfetti (0 o 1) per la nostra microbit.

## Fase 2: Progettazione dello Pseudocodice 📝


*   *Cosa facciamo se entrambi i sensori leggono BIANCO (0)?* -\> La linea è in mezzo, andiamo DRITTI!
*   *Cosa facciamo se il sensore SINISTRO legge NERO (1)?* -\> Stiamo uscendo fuori strada a destra! Dobbiamo curvare a SINISTRA per rimettere la linea al centro.
*   *Cosa facciamo se il sensore DESTRO legge NERO (1)?* -\> Curviamo a DESTRA.
*   *E se entrambi leggono NERO (1)?* -\> Siamo arrivati a un incrocio o alla fine della pista. STOP.

## Fase 3: Scrittura del Codice  💻


| Sezione | Blocco | Istruzione e Funzione Pedagogica |
| :--- | :--- | :--- |
| **Variables** | `Make Variable` | Crea **`value`**. Insegna che i dati sensoriali vanno sempre "salvati" in un contenitore prima di usarli. |
| **Basic** | `forever` | Il ciclo continuo di lettura. |
| **Variables** | `set...to` | **`set value to (Line Tracking)`** |
| **Logic** | `if / else if / else` | Creiamo un blocco con 4 condizioni totali (cliccando sul +). |
| **Logic** | Condizione 1 | **`if (value = 1) then`** *Siamo al centro.* |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 60`** (Velocità moderata per non perdere la linea). |
| **Logic** | Condizione 2 | **`else if (value=2) then`** *Il sensore sinistro tocca il nero.* |
| **MiniCar** | `motor...` | **`motor = All Direction = Turn_Left speed = 60`** (Correzione a sinistra). |
| **Logic** | Condizione 3 | **`else if (value=3) then`** |
| **MiniCar** | `motor...` | **`motor = All Direction = Turn_Right speed = 60`** (Correzione a destra). |
| **Logic** | Condizione 4 | **`else`** (che equivale a entrambi Neri). |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 0`** (STOP). |


<center>
	<img src="/img/robotica/linetracking.png" alt="linetracking.png" width="300"/>
</center>


## Fase 4: Collaudo e "Tuning" 🔧

*   **Il Tracciato:** Preparate a terra un percorso usando del nastro isolante nero (deve essere largo almeno 1.5 cm) su un pavimento chiaro o cartelloni bianchi. Fate curve dolci all'inizio!
*   **Debugging Attivo:**  
	*   *Il robot "perde" la linea nelle curve:* Va troppo veloce! Ridurre la `speed` a 40 o 50.
    *   *Il robot va a scatti e "sbanda" continuamente:* È l'effetto ping-pong dell'algoritmo base. Chiedi loro di provare a usare `Turn_Left` con una velocità più bassa (es. 40) per rendere la correzione meno brusca.
*   **Codice per seguire i valori del LineTracking**: Scrivere il codice per seguire i valori del LineTracking.


<center>
	<img src="/img/robotica/linetracking1.png" alt="linetracking1.png" width="300"/>
</center>
