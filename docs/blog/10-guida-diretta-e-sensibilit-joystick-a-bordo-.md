---
title: 10-Guida Diretta e Sensibilità (Joystick a Bordo) 🕹️🏎️
description: 'Leggere i valori analogici del joystick, creare una "Zona Morta" personalizzata (300-700) e trasformare i comandi in movimento fisico dei motori.'
draft: false
date: 2026-04-20
category: Microbit
class_target: "1, 2, 3"
image: /img/robotica/minicar-telecomandata.webp
---

# 10-Guida Diretta e Sensibilità (Joystick a Bordo) 🕹️🏎️

**Obiettivo:** Leggere i valori analogici del joystick, creare una "Zona Morta" personalizzata (300-700) e trasformare i comandi in movimento fisico dei motori.



## Fase 1. Brainstorming: I Numeri del Joystick 🧠

Iniziamo svelando come "pensa" il joystick:

*   **Analogico vs Digitale:** A differenza di un bottone che dice solo ACCESO (1) o SPENTO (0), il joystick usa potenziometri che restituiscono un numero da **0 a 1023**.
*   **La Mappa (Assi X e Y):** \* L'asse **X** (Sinistra/Destra) è collegato al Pin **P3**.
    *   L'asse **Y** (Avanti/Indietro) è collegato al Pin **P4**.
*   **Il Segreto della "Zona Morta":** Quando lasciamo il joystick al centro, il valore è circa 512. Tuttavia, le molle non sono perfette. Se impostassimo la partenza a 513, il robot tremerebbe per ogni minimo movimento! Nel nostro codice abbiamo creato una "Zona Morta" sicura: il robot non farà nulla finché il valore non supererà **700** o non scenderà sotto **300**.



## Fase 2. Costruzione del Codice 💻

Andiamo su MakeCode e componiamo il programma che hai progettato. Creiamo due variabili, `asseX` e `asseY`, per memorizzare le letture dei pin P3 e P4 in tempo reale.

| Blocco Logico | Condizione (Lettura Pin) | Azione Motori (A e B) | Significato Fisico |
| --- | --- | --- | --- |
| **Se** | `asseY > 700` | Motore A = **Forward** (100)<br><br>  <br><br>Motore B = **Forward** (100) | Spinta in Avanti |
| **Altrimenti se** | `asseY < 300` | Motore A = **Backward** (100)<br><br>  <br><br>Motore B = **Backward** (100) | Spinta all'Indietro |
| **Altrimenti se** | `asseX > 700` | Motore A = **Forward** (100)<br><br>  <br><br>Motore B = **Backward** (100) | Curva (es. a Destra) |
| **Altrimenti se** | `asseX < 300` | Motore A = **Backward** (100)<br><br>  <br><br>Motore B = **Forward** (100) | Curva (es. a Sinistra) |



## Fase 3. L'Inganno del Codice: Il Freno Scomparso! 🕵️‍♂️

Fai scaricare il codice ai ragazzi così com'è e fagli fare un test a ruote sollevate.

**Cosa succederà?** Spingeranno in avanti, i motori partiranno. Molleranno il joystick... **e i motori continueranno a girare!**

*   **La Domanda alla classe:** *"Perché non si ferma? Il joystick è tornato al centro (es. 500)!"*
*   **La Soluzione:** Il programma, quando il valore è 500, non entra in nessuno dei `se` o `altrimenti se` (perché 500 non è \>700 e non è \<300). Ma poiché non c'è un'istruzione finale che gli dica cosa fare "in tutti gli altri casi", il robot mantiene semplicemente **l'ultimo ordine ricevuto**.
*   **Il Fix Definitivo:** I ragazzi dovranno cliccare sul bottoncino `(+)` in fondo al blocco logico per aggiungere un ultimo **`altrimenti`** vuoto, e inserirci dentro:
    *   `motore A speed 0`
    *   `motore B speed 0` *(Questo è il "Freno" di emergenza che si attiva ogni volta che la levetta è nella Zona Morta!)*


<center>
	<img src="/img/robotica/minicar-telecomandata1.png" alt="minicar-telecomandata1.png" width="300"/>
</center>


## Fase 4. Collaudo a Terra e Priorità degli Assi 🔧

In fase di test, fate notare ai ragazzi l'ordine dei blocchi: il programma controlla **prima** l'asse Y e **poi** l'asse X.

*   *Sfida:* Cosa succede se spingo il joystick in diagonale (sia in alto che a destra contemporaneamente)?
*   *Risposta:* Il robot andrà solo dritto! Perché l'istruzione `asseY > 700` viene letta per prima, bloccando la lettura dell'asse X. (In informatica si chiama "Priorità di esecuzione").

