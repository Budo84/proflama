---
title: 02-Primo-gioco-Gatto e Topo
description: 'gioco gatto e topo'
draft: false
date: 2026-09-17
category: Scratch
class_target: "Elementari, Tutti"
image: /img/scratch-logo.webp
---

# 02-Primo-gioco-Gatto e Topo

##Parte 1 - Impostiamo il gioco

Lo scopo del gioco è scappare dal gatto che cerca di inseguire il puntatore del mouse. Per realizzarlo abbiamo bisogno di un loop diverso dal precedente: **ripeti fino a quando**.

Inserisci il blocco prendendolo da **Controllo**, inserisci dal menù **Sensori** un blocco a forma di esagono nel loop e seleziona *puntatore del mouse* dal menù.

Ora inserisci lo script precedente nel blocco **ripeti fino a quando**.

Infine inserisci un blocco **dire** dal menù **Aspetto**.

<center>
	<img src="/img/scratch/Screenshot3.png" alt="windows" width="300"/>
</center>

Prova ad eseguire lo script. Cosa succede quando il gatto tocca il bordo dello **stage**?

Correggi questo problema inserendo un blocco **rimbalza quando tocchi il bordo** dal menù **Movimento**.


<center>
	<img src="/img/scratch/Screenshot4.png" alt="windows" width="300"/>
</center>

####Cosa abbiamo imparato?

L'istruzione che abbiamo usato (**ripeti fino a quando** fa parte di quelle istruzioni dette **CONDIZIONALI**.

Ne fanno parte **SE, SE ALLORA, RIPETI FINO A QUANDO** e indicano al computer di reagire solo al verificarsi di certe condizioni.

**Ripeti fino a quando** farà ripetere le istruzioni al suo interno continuamente fino al verificarsi della condizione che ne permette la conclusione, nel nostro caso, finché il gatto non toccherà il puntatore del mouse.

Prova ora a rendere lo script più facile da usare aggiungendo all'inizio il blocco con la bandierina verde dal menù **Situazioni**

<center>
	<img src="/img/scratch/Screenshot5.png" alt="windows" width="300"/>
</center>

Adesso lo script verrà eseguito solo dopo aver cliccato sulla bandierina verde. Per interromperlo clicca sul cerchio rosso.


####Cosa abbiamo imparato?

I blocchi hanno una forma per cui possono unirsi solo in certi modi, sono simili a un puzzle.

La **sintassi** cioè il modo in cui è scritto un codice è molto importante perchè se ci sono degli errori il computer non riesce ad eseguire correttamente tutte le istruzioni fermandosi o generando errori. In Scratch i blocchi si uniranno solo se la sintassi è corretta, gli incastri dei blocchi permettono di avere un controllo sulla sintassi.

##Parte 2 - Posizioniamoci al centro

Miglioriamo la giocabilità del nostro gioco facendo partire il gatto dal centro dello **stage**.

Aggiungiamo il blocco **vai a** dal menù **Movimento**.

<center>
	<img src="/img/scratch/Screenshot6.png" alt="windows" width="300"/>
</center>

Ora possiamo impostare la posizione di partenza usando le coordinate cartesiane.

####Cosa abbiamo imparato?

Per definire qualsiasi punto dello stage abbiamo bisogno delle coordinate cartesiane (x,y) che descrivono un punto nello spazio dello stage.


##Parte 3 - Assegnamo un punteggio

Per assegnare un punteggio abbiamo bisogno di introdurre un nuovo concetto: le **variabili**.

Le **variabili** sono dei contenitori a cui viene assegnato un nome. Possiamo cambiarne il contenuto senza perdere il riferimento, cioè il nome dato.

Per creare una variabile vai al menù **Variabili** e clicca su *"Crea una Variabile"* nominandola *"punteggio"*.

Inserisci un blocco **porta punteggio** all'inizio. Inserisci infine un blocco **cambia punteggio** nel loop per segnare un punto ogni volta che il mouse eviti il gatto.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/scratch/Screenshot7.png" style="width: 25%; object-fit: cover;">
     <img src="/img/scratch/Screenshot8.png" style="width: 35%; object-fit: cover;">
</div>

Ora prova a giocare, in un angolo dello **stage** vedrai un segnapunti. Il punteggio aumenta finchè il mouse non verrà preso dal gatto.

##Parte 3 - Aggiungiamo un vero Mouse

Per concludere il nostro gioco inseriamo un vero Mouse al posto del puntatore del mouse.

<center>
	<img src="/img/scratch/mouse.png" alt="windows" width="200"/>
</center>


Clicca sul gatto nell'**area dello sprite** per aprire il **Catalogo degli sprite**. Seleziona *"Mouse1"*. Il topo apparirà nello stage insieme al gatto.

Ora dobbimo scrivere lo script per far muovere il topo. Seleziona *"Mouse1"* e inserisci questi blocchi:

* **vai a** per far apparire il topo ogni volta nello stesso punto ma lontano dal gatto.
* **ripeti fino a quando** per far muovere il topo continuamente e poi la condizione dal menù **Sensori** **sta toccando (Sprite1)** per indicare che il topo è stato preso.

<center>
	<img src="/img/scratch/Screenshot9.png" alt="windows" width="300"/>
</center>

L'ultimo passaggio consiste nel cambiare la condizione sul loop del gatto e inserire al posto di *"puntatore del mouse"* proprio *"Mouse1"*.

<center>
	<img src="/img/scratch/Screenshot10.png" alt="windows" width="300"/>
</center>


Ora sei pronto per sfidare il gatto...Vinca il più veloce.

####Come faccio a salvare?

Per salvare i progetti scrivi il nome nella barra del titolo e clicca su salva ora. Potrai trovarlo nella schermata principale cliccando sul simbolo di una cartellina con scritto *"LE MIE COSE"*.


####Per i più esperti

Prova ora ad aggiungere una condizione sul punteggio del Topo. Come avrai notato il topo raccoglie molti più punti del gatto, prova a migliorare questo aspetto.

La soluzione prevede:

* l'introduzione di una nuova variabile che chiameremo punteggio che serve da contatore;
* un blocco operatori che divide il valore della variabile punteggio per un parametro da noi assegnato;
* una condizione sul resto della divisione che se vera fa aumentare il punteggio del topo di 1.

<center>
	<img src="/img/scratch/gatto-topo-punteggio.png" alt="windows" width="350"/>
</center>


Di seguito il codice con la soluzione.

<center>
	<img src="/img/scratch/gatto-topo-completo.png" alt="windows" width="350"/>
</center>

<center>
	<img src="/img/scratch/gatto-topo-completo.gif" alt="windows" width="350"/>
</center>
