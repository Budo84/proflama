---
title: 02-Laboratorio-MicroBit-Parte-2
date: 2026-01-13T23:30:00.000+01:00
image: /img/matriceled2.gif
---
### Matrice LED

La nostra scheda ha a disposizione una matrice frontale composta da 25 LED, ognuno ha due coordinate di riferimento (x,y) secondo il seguente ordine:

<center>
	<img src="/img/microbit/matriceled.png" alt="windows" width="300"/>
</center>

#### Esercizio 1

Proviamo a far accendere in modo intermittente il secondo LED da sinistra nella riga in alto e il penultimo LED da sinistra nell'ultima riga. A quali coordinate corrispondono? 


#### Soluzioni

**(1,0) e (3,4)**.


<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/matriceled2.png" style="width: 20%; object-fit: cover;">
     <img src="/img/microbit/matriceled2.gif" style="width: 45%; object-fit: cover;">
</div>

#### Esercizio 2

Proviamo a visualizzare la sequenza 1, 2, 3, 4, 5 e un ciclo come segue:


<center>
	<img src="/img/microbit/matriceled3.png" alt="windows" width="500"/>
</center>

Dove hai inserito la sequenza di numeri? E il ciclo?

#### Soluzioni

La sequenza numerica va inserirla nel blocco ***on star***

Il ciclo invece va inserito nel blocco ***forever*** perchè non è stato specificato quante volte va ripetuto.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/matriceled4.png" style="width: 20%; object-fit: cover;">
     <img src="/img/microbit/matriceled5.png" style="width: 15%; object-fit: cover;">
</div>


<center>
	<img src="/img/microbit/matriceled6.gif" alt="windows" width="300"/>
</center>
