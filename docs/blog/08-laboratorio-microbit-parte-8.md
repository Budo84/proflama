---
title: 08-Laboratorio-MicroBit-Parte-8
draft: true
date: 2026-01-15T23:27:00.000+01:00
image: /img/magic-ball8.gif
category: News
---
## Magic 8-Ball Digitale

Questo progetto trasforma il Micro:bit in una versione digitale della popolare "Magic 8-Ball", offrendo risposte casuali a domande sì/no. 

Sfrutta lo **shake** oppure il pulsante **A** per l'input e la matrice LED per l'output testuale.

* **Shake** / **Pulsante  A**: 	Avvia la generazione della risposta.
* **Matrice LED**: Mostra la risposta in scorrimento.

#### Soluzione
* Input: quando si preme il Pulsante A, il Microbit genera un numero casuale tra 1 e 5 (o più, a seconda di quante risposte vuoi).
* Logica: Utilizzando la struttura se/altrimenti se/altrimenti, a ogni numero casuale (es. 1, 2, 3, 4, 5) viene associata una risposta diversa.

**Esempio**: Se il numero è 1, mostra "Sì, assolutamente." Se il numero è 2, mostra "Chiedi più tardi."

 * Output: La risposta associata al numero viene visualizzata sulla matrice LED in scorrimento.

 <center>
	<img src="/img/microbit/magic8.png" alt="windows" width="250"/>
</center>

<div style="page-break-after: always;"></div>
