---
title: 14-Animazione-Inclinazione 
description: 'Questo progetto prepara i ragazzi a usare l''accelerometro della micro:bit per rilevare l''inclinazione e controllare il movimento. In Scratch, si userà il mouse o i tasti, ma il concetto di spostamento nello spazio rimane lo stesso.'
draft: false
date: 2026-10-01
category: Scratch
class_target: "1, 2, 3, Tutti"
image: /img/scratch-logo.webp
---

# 14-Animazione-Inclinazione 

Questo progetto prepara i ragazzi a usare l'accelerometro della micro:bit per rilevare l'inclinazione e controllare il movimento. In Scratch, si userà il mouse o i tasti, ma il concetto di spostamento nello spazio rimane lo stesso.

|Concetto Introdotto|	Corrispondenza con micro:bit|
|:---------|:---------|
|Movimento XY	|Usare l'inclinazione per muovere uno sprite (come un joystick)|
|Se a Catena|	Verificare contemporaneamente diverse condizioni|

**Istruzioni Scratch**

* Scegli uno sprite.

* Usa il blocco *Ripeti per sempre*.

All'interno, usa quattro blocchi se... allora... separati (non uno dentro l'altro):

* SE tasto freccia su premuto, ALLORA cambia y di 5.

* SE tasto freccia giù premuto, ALLORA cambia y di -5.

* SE tasto freccia destra premuto, ALLORA cambia x di 5.

* SE tasto freccia sinistra premuto, ALLORA cambia x di -5.

Possiamo anche simulare un salto premendo il tasto spazio. Per far questo il nostro sprite dovrà cambiare la posizione y di un certo valore positivo e successivamente ritornare alla posizione y iniziale.


<center>
	<img src="/img/scratch/animazione-inclinazione.png" alt="windows" width="300"/>
</center>


<center>
	<img src="/img/scratch/animazione-inclinazione.gif" alt="windows" width="300"/>
</center>