---
title: 10-Laboratorio-MicroBit-Parte-10
draft: true
description: >-
  Messaggistica con Due Micro:bit (Radio)

  Questo è il passo più grande e utile: la comunicazione tra due o più Micro:bit. Ti permette di creare giochi multiplayer, telecomandi, o, in questo caso, un semplice sistema di messaggistica.


  Concetti: comunicazione Radio; inviare e ricevere dati senza fili.
date: 2026-01-16T00:28:00.000+01:00
image: /img/messaggi.gif
category: MicroBit
---
## Messaggistica con Due Micro:bit (Radio)

Questo è il passo più grande e utile: la comunicazione tra due o più Micro:bit. Ti permette di creare giochi multiplayer, telecomandi, o, in questo caso, un semplice sistema di messaggistica.

**Concetti**: comunicazione Radio; inviare e ricevere dati senza fili.

**Struttura del Programma (Da caricare su DUE Micro:bit)**

### Micro:bit 1 (Trasmettitore A)

|Blocco/Azione| Dettagli Tecnici|
|:--------|:--------|
|on start|radio set group 1 (Fondamentale: devono essere sullo stesso canale)|
|on button A pressed|radio send string "Ciao"|
|on button B pressed|radio send string "OK"|



<center>
	<img src="/img/microbit/trasmettitore.png" alt="windows" width="350"/>
</center>

### Micro:bit 2 (Ricevitore + Risponditore)

|Blocco/Azione| Dettagli Tecnici|
|:---------|:--------|
|on start| radio set group 1|
|on radio received receivedString|	show string receivedString|.
|if receivedString = "Ciao" then
radio send string "Saluti!"
|on button A pressed| radio send number 1 (Invia un dato numerico)|

<center>
	<img src="/img/microbit/ricevitore.png" alt="windows" width="350"/>
</center>


**Esercizio Aggiuntivo**

La prima microbit chiede che temperatura fa e la seconda mostra la temperatura.


### Micro:bit 1 (Trasmettitore)


<center>
	<img src="/img/microbit/trasmettitoreTemp.png" alt="windows" width="350"/>
</center>


### Micro:bit 2 (Ricevitore)

<center>
	<img src="/img/microbit/ricevitoreTemp.png" alt="windows" width="350"/>
</center>

**Esercizio Conclusivo**

La prima microbit chiede che temperatura fa e la seconda risponde 
dopo aver misurato la temperatura alla prima microbit che mostra sullo schermo il valore.

### Microbit A
<center>
	<img src="/img/microbit/microbitA.png" alt="windows" width="350"/>
</center>

### Microbit B
<center>
	<img src="/img/microbit/microbitB.png" alt="windows" width="350"/>
</center>
