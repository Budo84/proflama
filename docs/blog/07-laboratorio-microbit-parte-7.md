---
title: 07-Laboratorio-MicroBit-Parte-7
draft: true
description: >-
  Contatore di Punteggio Interattivo

  Realizziamo un progetto utile per giochi da tavolo, sport o attività in classe, dove i pulsanti A e B controllano due diversi conteggi e la matrice LED mostra il punteggio in tempo reale.
date: 2026-01-15T10:46:00.000+01:00
image: /img/punteggio.gif
category: News
---
## Contatore di Punteggio Interattivo

Realizziamo un progetto utile per giochi da tavolo, sport o attività in classe, dove i pulsanti A e B controllano due diversi conteggi e la matrice LED mostra il punteggio in tempo reale.

* **Pulsante A**: aumenta il punteggio del Giocatore 1.
* **Pulsante B**: aumenta il punteggio del Giocatore 2.
* **Pulsante A+B**: resetta entrambi i punteggi a zero.
* **Matrice LED**: mostra i punteggi del Giocatore 1 e del Giocatore 2.


#### Soluzione

* Definisci due variabili: punteggio A e Punteggio B, inizializzate a zero.

* Incremento: al premere il Pulsante A, incrementa Punteggio A di 1. Al premere il Pulsante B, incrementa Punteggio_B di 1.

* Visualizzazione: usa il blocco mostra numero per visualizzare il punteggio del Giocatore 1 sulla matrice LED. Poi, mostra un simbolo di separazione (es. un trattino) e infine il punteggio del Giocatore 2. Puoi fare in modo che la visualizzazione venga aggiornata ogni volta che viene premuto un pulsante, o continuamente in un ciclo.

* Reset: al premere il Pulsante A+B, reimposta entrambe le variabili a 0 e mostra un messaggio di "Reset".

 <center>
	<img src="/img/microbit/contatore.png" alt="windows" width="450"/>
</center>
