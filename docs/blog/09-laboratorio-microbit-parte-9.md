---
title: 09-Laboratorio-MicroBit-Parte-9
draft: true
description: >+
  Allarme con codice segreto

  Questi tre programmi isolano i concetti di Stato, Condizione sul Sensore e Sequenza, preparando i ragazzi per unire il tutto nel progetto finale dell'Allarme con Codice Segreto.

date: 2026-01-16T00:25:00.000+01:00
image: /img/allarme.png
category: MicroBit
---
### Introduciamo tre concetti per la realizzazione di un programma che simula un allarme con codice segreto

Questi tre programmi isolano i concetti di **Stato**, **Condizione sul Sensore** e **Sequenza**, preparando i ragazzi per unire il tutto nel progetto finale dell'Allarme con Codice Segreto.

#### a. Interruttore a Levetta Digitale (Gestione dello Stato)

Questo programma introduce il concetto di *Stato* utilizzando una variabile che agisce come un interruttore ON/OFF.

La variabile di stato ("stato_luce") è cruciale per il progetto dell'allarme ("stato_allarme"). Qui, 0 significa "Spento" e 1 significa "Acceso".

#### Soluzione

* Variabile: crea una variabile chiamata "stato_luce".

* Pulsante A (ON): Imposta la variabile "stato_luce" a 1 (Acceso) e mostra un'icona luminosa (es. un quadrato pieno).

* Pulsante B (OFF): Imposta la variabile "stato_luce" a 0 (Spento) e cancella lo schermo.

* Stato Iniziale: Nel blocco all'avvio, imposta "stato_luce" a 0 e cancella lo schermo.

<center>
	<img src="/img/microbit/interruttore-digit.png" alt="windows" width="350"/>
</center>

<div style="page-break-after: always;"></div>


#### b. Allarme Condizionato al Movimento (Trigger e Condizione)

Questo programma introduce l'uso di un evento sensore (al vibrare) e la logica condizionale (SE...) basata sullo stato.

Il Micro:bit esegue un'azione (allarme) solo se una condizione ("stato_allarme" = 1) è soddisfatta. Questo è il cuore del progetto finale.

#### Soluzione

* Variabile: usa la variabile "stato_luce" del progetto precedente (o rinominala "stato_allarme").

* Pulsante A (Arma): Imposta "stato_allarme" a 1 e mostra una "X" (Armato).

* Pulsante B (Disarma): Imposta "stato_allarme" a 0 e mostra una spunta (Disarmato).

* Trigger: Nel blocco quando scosso:

	* SE "stato_allarme" è uguale a 1, riproduci un suono (es. suona tono C4 per 1/2 battuta). Mostra l'icona di un teschio (allarme!).

	* ALTRIMENTI (se è disarmato), non fare nulla (o mostra brevemente un'icona di "STOP").

<center>
	<img src="/img/microbit/allarme-movimento1.png" alt="windows" width="350"/>
</center>

<div style="page-break-after: always;"></div>


#### c. Sequenza Semplice a Due Passi (Logica Sequenziale)

Questo programma introduce la variabile che traccia il progresso di una sequenza corretta (sequenza_codice), fondamentale per il codice segreto.
Una variabile (passo) viene incrementata solo se l'input del pulsante è corretto. Ogni errore riporta la variabile a zero.

#### Soluzione

Variabile: Crea una variabile chiamata "passo_codice" (inizializzata a 0).

Il Codice: La sequenza segreta è A, B.

Gestione del Pulsante A (Primo Passo) Nel blocco del pulsante A:

SE "passo_codice" è uguale a 0 (stato iniziale):

* imposta "passo_codice" a 1. Passo 1 completato. 
* Mostra il numero 1.

ALTRIMENTI (errore): 

* imposta "passo_codice" a 0. Reset. 
* Mostra una X.

Gestione del Pulsante B (Secondo Passo/Successo) Nel blocco del pulsante B:

SE "passo_codice" è uguale a 1 (il pulsante 'A' è stato premuto):

* imposta "passo_codice" a 2. Codice completato. 
* Mostra un'icona di stella (Successo). 
* Imposta di nuovo "passo_codice" a 0 per poter ricominciare.

ALTRIMENTI (errore):	

* imposta passo_codice a 0. Reset.
* Mostra una X.

<center>
	<img src="/img/microbit/sequenza-semplice.png" alt="windows" width="450"/>
</center>

<div style="page-break-after: always;"></div>


### 3. Allarme con Codice Segreto
Questo progetto è un vero "mini-sistema di sicurezza". La Microbit mostra una X se l'allarme è attivo e una faccina felice se è disattivato. L'allarme (un suono e un teschio sulla matrice Led) suona se la scheda viene mossa e se il codice segreto non viene inserito correttamente.

* **Pulsante A**: inserisce il "Primo numero" del codice.
* **Pulsante B**: inserisce il "Secondo numero" del codice.
* **Matrice LED**: visualizza lo stato (luce rossa/verde) e le icone di successo/fallimento.
* **Scuotimento**: attiva l'allarme (simulando un "furto").

#### Soluzione

* Stato: Definisci una variabile Stato_Allarme (attivo/disattivo).
* Codice: Definisci una variabile codice segreto (es. una sequenza di 3 A e 3 B).
* Attivazione/Disattivazione: Usa i pulsanti A e B in sequenza per disattivare l'allarme.
* Quando l'utente preme i pulsanti, una variabile Contatore_Codice registra i passaggi.
* Se la sequenza di pulsanti è corretta, imposta Stato_Allarme su "Disattivo" e mostra un'icona verde sulla matrice LED.
* Allarme: usa l'evento quando scosso.
* **SE** Stato_Allarme è "Attivo", mostra un'icona di allarme (es. un teschio o una X rossa) e avvia un suono ripetuto o una vibrazione (se hai un motore collegato al pin 0).
* **ALTRIMENTI**, non succede nulla, solo una spunta verde.

##### Impostazione Iniziale Nel blocco all'avvio

* Imposta la variabile stato_allarme a 0 (Disattivo). L'allarme parte spento.
* Mostra una faccina felice sulla matrice LED per confermare che il sistema è disattivato.


##### Attivazione dell'Allarme
Usiamo il pulsante A+B per attivare il sistema di sicurezza prima di allontanarci.

Nel blocco all'accensione dei pulsanti A+B:

* Imposta la variabile stato_allarme a 1 (Attivo).
* Mostra una "X" sulla matrice LED per indicare che il sistema è armato.
* Resetta la variabile sequenza_codice a 0.

##### Inserimento del Codice Segreto (Disattivazione)
Questa è la parte più complessa, dove l'utente deve premere i pulsanti nella sequenza corretta per evitare l'allarme.

**Passaggio 1** Nel blocco all'accensione del pulsante A:

* SE "sequenza_codice" è uguale a 0 (inizio del codice), allora imposta "sequenza_codice" a 1.

* ALTRIMENTI SE "sequenza_codice" è uguale a 1 (secondo passo corretto), allora imposta "sequenza_codice" a 2.

* ALTRIMENTI (errore nella sequenza), mostra un'icona di errore e resettiamo la "sequenza_codice" a 0.

**Passaggio 2** Nel blocco all'accensione del pulsante B:

* SE "sequenza_codice" è uguale a 2 (terzo passo corretto), allora imposta "sequenza_codice" a 3 (codice completato).

* ALTRIMENTI (errore), mostra un'icona di errore e resettiamo la "sequenza_codice" a 0.

**Spiegazione gestione pulsante 'A'**


1. Caso: Inizio del Codice (Passaggio 1) Nel blocco all'accensione del pulsante A:

	*	SE la variabile "sequenza_codice" è uguale a 0 (stato iniziale), imposta "sequenza_codice" a 1. Indica che il primo 'A' è stato premuto correttamente.

2. Caso: Secondo Pulsante 'A' (Passaggio 2) Nel blocco all'accensione del pulsante A:

	* ALTRIMENTI SE la variabile "sequenza_codice" è uguale a 1 (il primo 'A' è già stato premuto), imposta "sequenza_codice" a 2. Indica che il secondo 'A' è stato premuto correttamente.

3. Caso: Errore del Codice
	
	* ALTRIMENTI (se premi A in qualsiasi altro momento, es. quando il codice è già stato completato o se è stato premuto B per errore), mostra un'icona di Errore (X). Imposta "sequenza_codice" a 0. Reset e si deve ricominciare da capo.

**Spiegazione gestione pulsante 'B'**

Il pulsante B è il terzo e ultimo passo della sequenza.

1. Caso: Codice Completo. Nel blocco all'accensione del pulsante B:

	* SE la variabile "sequenza_codice" è uguale a 2 (ovvero la sequenza 'A' → 'A' è stata completata). Imposta "sequenza_codice" a 3. Indica che il codice è stato inserito correttamente!

2. Caso: Errore del Codice

	* ALTRIMENTI (se premi B troppo presto, quando "sequenza_codice" è 0 o 1), mostra un'icona di Errore (X). Imposta "sequenza_codice" a 0. Reset e si deve ricominciare da capo.

**Spiegazione gestione pulsante Disattivazione del Sistema (Codice Inserito)**

Quando la variabile sequenza_codice raggiunge 3, il sistema deve disattivarsi. Puoi aggiungere questa logica come un blocco per sempre o come un'ulteriore condizione nel codice del pulsante B. Per semplicità, la inseriamo come blocco separato:

Nel blocco per sempre (o subito dopo aver impostato sequenza_codice a 3):

* SE la variabile "sequenza_codice" è uguale a 3, imposta "stato_allarme" a 0 (Disattivo). Mostra la spunta per confermare.

* Imposta "sequenza_codice" a 0. Prepara il sistema per una nuova attivazione/disattivazione.


In sintesi, la variabile "sequenza_codice" funge da contatore del progresso che viene resettato non appena viene premuto il pulsante sbagliato.


Questo è l'ideale per mostrare la logica sequenziale e l'uso di variabili di stato per creare un progetto complesso e realistico.

<center>
	<img src="/img/microbit/allarme_movimento.png" alt="windows" width="500"/>
</center>
