---
title: 06-Laboratorio-MicroBit-Parte-6
draft: true
description: >-
  Contatore di Passi (Pedometro)

  Questo programma utilizza l'accelerometro e le variabili per contare i passi e introduce la necessità di resettare i dati.


  Puoi renderlo un dispositivo da polso che traccia i tuoi movimenti o da caviglia, mostrando il potenziale wearable.
date: 2026-01-15T10:29:00.000+01:00
image: /img/contapassi.gif
category: MicroBit
---
## Contatore di Passi (Pedometro)

Questo programma utilizza l'accelerometro e le variabili per contare i passi e introduce la necessità di resettare i dati.

Puoi renderlo un dispositivo da polso che traccia i tuoi movimenti o da caviglia, mostrando il potenziale wearable.

#### Soluzione

Variabile: Crea una variabile chiamata passi (inizializzata a 0).

Rilevamento del Passo: Utilizza il blocco on shake. Questo evento si attiva ogni volta che il Micro:bit rileva un movimento che assomiglia a un passo.

Contatore: Dentro il blocco al passo, cambia la variabile passi di 1.

Visualizzazione:

**Pulsante A (Mostra Passi)**: quando si preme il pulsante A, viene mostrato il valore attuale della variabile passi sulla matrice LED.

**Pulsante B (distanza percorsa)**: quando si preme il pulsante B, viene mostrato il valore in metri della distanza percorsa. Si può impostare la conversione con una variabile dichiarata all'inizio che indica la lunghezza del passo.

**Pulsante A+B (azzera)**: Quando premi i pulsanti A+B, imposta la variabile passi a 0 e mostra un'icona di spunta (✓) per confermare il reset.

<center>
	<img src="/img/microbit/contapassi.png" alt="windows" width="450"/>
</center>

<div style="page-break-after: always;"></div>

Se volessimo risparmiare batteria e sopratutto rendere il programma più facilmente replicabile su altri dispositivi, dovremmo inserire le condizioni e tutto il corpo del programma nel blocco forever eliminandole dai tasti fisici.

<center>
	<img src="/img/microbit/contatore-evoluto.png" alt="windows" width="450"/>
</center>



