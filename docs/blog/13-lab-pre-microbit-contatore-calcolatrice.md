---
title: 13-Lab-pre-Microbit-Contatore-Calcolatrice
description: 'costruire una calcolatrice virtuale'
draft: false
date: 2026-10-01
category: Scratch
class_target: "1, 2, 3, Tutti"
image: /img/scratch-logo.webp
---

# 13-Lab-pre-Microbit-Contatore-Calcolatrice


## PASSO 1: Preparare la Memoria (Le Variabili)

Prima di qualsiasi codice, dobbiamo creare le "scatole" dove la calcolatrice salverà i dati. 

Vai su Variabili, clicca "Crea una variabile" e fanne 4 (seleziona "Per tutti gli sprite"):

* *display*: È lo schermo. Mostra i numeri che digiti e il risultato.

* *primo-numero*: Tiene a mente il primo numero inserito (es. il 10 in "10 + 5").

* *operazione*: Tiene a mente il tasto premuto (+, -, *, /).

* *scrivi-nuovo*: È un interruttore (0 o 1).

	* Se è **1**: Il prossimo numero cliccato cancella il vecchio e inizia da capo.

	* Se è **0**: Il prossimo numero cliccato si attacca a quello già presente.

## PASSO 2: L'Inizio (Codice sullo Sfondo)

Dobbiamo dire alla calcolatrice come partire. 

Clicca sullo Stage (Sfondo) e inserisci questo codice:

* Quando si clicca su [Bandiera Verde]
* Porta [*display*] a [0]
* Porta [primo-numero] a [0]
* Porta [*operazione*] a []  (lascia vuoto)
* Porta [*scrivi-nuovo*] a [1]
	* Perché? All'inizio lo schermo deve essere 0 e la calcolatrice deve essere pronta a scrivere un nuovo numero (*scrivi-nuovo* = 1).

## PASSO 3: I Numeri Standard (1-9)

Crea uno Sprite, disegna un quadrato con il numero "1". Ecco il codice universale per i numeri da 0 a 9. Invece di fare 10 sprite diversi subito, ne faremo uno perfetto e poi lo duplicheremo.

* Quando si clicca questo sprite
* Se < (*scrivi-nuovo*) = (1) > O < (*display*) = (0) > allora
    
    Porta [*display*] a [1]  <-- (Cambia questo numero per ogni tasto)
    
    Porta [*scrivi-nuovo*] a [0]

	Altrimenti
   
   Porta [*display*] a (unione (*display*) (1)) <-- (Cambia anche questo)

Fine

<div style="display: flex; justify-content: space-around;">
     <img src="/img/scratch/tasto-calc.png" style="width: 45%; object-fit: cover;">
     <img src="/img/scratch/tasto-calc1.png" style="width: 45%; object-fit: cover;">
</div>


**La logica**

Il "Se" controlla: "Devo iniziare un numero nuovo?" (perché ho appena acceso o appena premuto +) OPPURE "C'è solo uno zero sullo schermo?".

Se sì -> Cancella tutto e scrive il numero. Spegne l'interruttore *scrivi-nuovo* (lo mette a 0) così i prossimi numeri si attaccheranno.

Altrimenti -> Usa unione per attaccare il numero in coda (es. c'era "2", premo 1, diventa "21").

*Ora duplica questo sprite 8 volte e cambia i numeri (2, 3... 9) sia nel disegno che nei due punti del codice indicati.*

## PASSO 4: Il Numero Speciale (0)

Lo zero ha bisogno di un codice leggermente diverso per evitare di scrivere "0000".

* Quando si clicca questo sprite
* Se < (*scrivi-nuovo*) = (1) > allora
    
    Porta [*display*] a [0]
    
    Porta [*scrivi-nuovo*] a [0]

* Altrimenti
	
	* Se < non < (*display*) = (0) > > allora
        
        Porta [*display*] a (unione (*display*) (0))
    
   * Fine

* Fine

<center>
	<img src="/img/scratch/tasto-zero-calc2.png" alt="windows" width="250"/>
</center>


La differenza: Nel ramo "Altrimenti", controlliamo che il display non sia già zero. Se c'è scritto "5", aggiunge lo zero ("50"). Se c'è scritto "0", non fa nulla.

## PASSO 5: Gli Operatori (+, -, *, /)

Crea uno Sprite per il tasto "+".

* Quando si clicca questo sprite
* Porta [*primo-numero*] a (*display*)
* Porta [*operazione*] a [+]
* Porta [*scrivi-nuovo*] a [1]

<center>
	<img src="/img/scratch/tasto-operatore-calc3.png" alt="windows" width="250"/>
</center>


**Cosa succede qui?**

Salva il numero che vedi nello schermo dentro la scatola di riserva *primo-numero*.

Si annota che vuoi fare una somma.

Attiva *scrivi-nuovo* = 1. Questo è fondamentale: significa che quando cliccherai il prossimo numero, la calcolatrice saprà che deve pulire lo schermo per farti scrivere il secondo addendo.

Duplica questo sprite per -, * e / cambiando solo il simbolo nel blocco Porta Operazione a...


## PASSO 6: Il Risultato (=)

Questo sprite fa i calcoli veri e propri.

* Quando si clicca questo sprite
* Se < (*operazione*) = (+) > allora
    Porta [*display*] a (*primo-numero* + *display*)
Se < (*operazione*) = (-) > allora
    Porta [*display*] a (*primo-numero* - *display*)
Se < (*operazione*) = (x) > allora
    Porta [*display*] a (*primo-numero* x *Display*)
Se < (*operazione*) = (/) > allora
    Porta [*display*] a (*primo-numero* / *Display*)

* Porta [ScriviNuovo] a [1]


<center>
	<img src="/img/scratch/tasto-uguale-calc4.png" alt="windows" width="300"/>
</center>


**Finale**: dopo aver mostrato il risultato, rimettiamo ScriviNuovo a 
1. Così, se l'utente clicca un numero subito dopo, inizia un nuovo calcolo invece di attaccare cifre al risultato finale.

## PASSO 7: Il Punto Decimale (.)

Per scrivere i numeri con la virgola (es. 3.14).

* Quando si clicca questo sprite
* Se <(ScriviNuovo) = (1)> allora
	* Porta [Display] a [0.]
	* Porta [ScriviNuovo] a [0]
* Altrimenti
	* Se < non < (Display) contiene [.] > > allora
	* Porta [Display] a (unione (Display) (.))
	* Fine
* Fine

<center>
	<img src="/img/scratch/tasto-punto-calc5.png" alt="windows" width="300"/>
</center>

Sicurezza: Il blocco contiene impedisce di scrivere numeri impossibili come 12.5.5.


## PASSO 8: Il Tasto Cancella (C)

Per resettare tutto in caso di errore.

* Quando si clicca questo sprite
* Porta [Display] a [0]
* Porta [PrimoNumero] a [0]
* Porta [Operazione] a []
* Porta [ScriviNuovo] a [1]

<center>
	<img src="/img/scratch/tasto-canc-calc6.png" alt="windows" width="300"/>
</center>


Ora prova a fare i conti con la tua nuova calcolatrice.