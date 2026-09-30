---
title: 10-Lab-pre-Microbit-Semaforo
description: 'Programma per simulare un semaforo'
draft: false
date: 2026-09-30
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/scratch/semaforo-1.gif
---

# 10-Lab-pre-Microbit-Semaforo

## Obiettivi

* **Sequenza**: Imparare che le istruzioni vengono eseguite una dopo l'altra.

* **Ciclo Infinito (Loop)**: Capire come un'azione può ripetersi per sempre.

* **Tempi di Attesa**: Usare il blocco attendi per controllare la durata di un'azione.

## Corrispondenza con micro:bit
Questo progetto usa la logica sequenziale e temporale, essenziale per:

* animazioni LED: far accendere e spegnere i LED in sequenza (es. un cuore che batte).

* stati del Programma: mantenere la micro:bit in attesa di un input (il loop per sempre).

**Istruzioni per Scratch**

## Fase 1: Preparazione degli Sprite

* Cancella lo sprite del gatto.

* Crea un nuovo sprite (o disegnalo) a forma di cerchio. Chiama lo sprite "Semaforo".

* Crea 4 Costumi per lo sprite "Semaforo" (o usa l'effetto colore, come spiegato di seguito):

	* Costume 1: Cerchio Rosso (o un cerchio scuro per "spento" e usa gli effetti grafici).

	* Costume 2: Cerchio Giallo.

	* Costume 3: Cerchio Verde.

(Alternativa suggerita, più semplice da programmare: usa un unico costume e cambia l'effetto colore.)

<center>
	<img src="/img/scratch/semaforo-costumi.png" alt="windows" width="70"/>
</center>


## Fase 2: Il Codice del Semaforo

Applica il seguente codice allo sprite Semaforo.

|Blocchi|Blocco di Scratch|Spiegazione Logica|
|:----------|:----------|:----------|
|Eventi|quando si clicca su (bandiera verde)|Il programma inizia|
|Controllo|ripeti per sempre|Mantiene il ciclo del semaforo attivo all'infinito|
|Aspetto|Verde: metti effetto colore a (60) (o usa passa al costume "Verde")	Passa a Verde| (Il valore 60 corrisponde al verde)|
|Controllo|attendi (4) secondi|il Verde rimane acceso per 4 secondi|
|Aspetto|Arancione (Frenata): metti effetto colore a (30) (o usa passa al costume "Arancione")|torna a Arancione per avvertire che sta per arrivare il Rosso|
|Controllo|attendi (2) secondo|L'arancione rimane acceso per 2 secondo|
|Aspetto|Rosso: metti effetto colore a (0) (o usa passa al costume "Rosso")	|Imposta il semaforo su Rosso. (Il valore 0 corrisponde al rosso/arancione)|
|Controllo|attendi (4) secondi|il Rosso deve rimanere acceso per 4 secondi|

**Risultato Atteso**

Cliccando sulla bandiera verde, il semaforo virtuale cambierà colore (Verde → Arancione → Rosso) in modo continuo, rispettando i tempi stabiliti.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/scratch/semaforo-costumi2.png" style="width: 45%; object-fit: cover;">
     <img src="/img/scratch/semaforo-1.gif" style="width: 45%; object-fit: cover;">
</div>

**Introduzione alla Condizione (Approfondimento)**

Per rendere il progetto ancora più completo, è utile aggiungere una condizione che interrompa il ciclo, simulando l'intervento di un vigile (come se fosse un input da un pulsante esterno).

Aggiungi questo blocco di codice allo stesso sprite:

|Blocchi|Blocco di Scratch|Spiegazione Logica|
|:----------|:----------|:----------|
|Eventi|quando il tasto [spazio] è premuto|Simula la pressione di un pulsante (che sarà il Pulsante A sulla micro:bit)|
|Aspetto|metti effetto colore a (20) (o Costume 4 - Arancione lampeggiante)|Mette il semaforo in uno stato di "allerta" o "emergenza"|
|Controllo|ferma (questo script)|interrompe la sequenza del semaforo (il loop ripeti per sempre)|

<center>
	<img src="/img/scratch/semaforo-costumi3.png" alt="windows" width="400"/>
</center>

Come vedi c'è bisogno di inserire dei blocchi per simulare il lampeggiamento e per interrompere i blocchi in modo alternato per evitare sovrapposizioni.

Possiamo inserire una nuova opzione. Rendere l'arancione lampeggiante una situazione momentanea, con una durata da definire in numero di cicli e successivamente ripartire con la sequenza principale di funzionamento del semaforo. 

Per fare questo abbiamo bisogno di tre sequenze di blocchi.

* La prima ha come inizio il blocco *quando si preme su bandierina verde* e fa iniziare l'alternanza delle luci del semaforo.
* La seconda ha come inizio *quando si preme il tasto freccia giu* che ferma la sequenza principale e inizia un loop temporaneo che avrà come conclusione il blocco che invia un messaggio: *invia a tutti Ricomincia*. Questo blocco sarà lo star della terza sequenza.
* La terza ha come inizio il blocco *quando ricevo Ricomincia* e farà partire la sequenza principale. Questa sequenza partirà solo dopo aver ricevuto un messaggio di input e non con la pressione di un tasto.

<center>
	<img src="/img/scratch/semaforo-temporizzato.png" alt="windows" width="400"/>
</center>



####Cosa abbiamo imparato?

* Il programma segue la sequenza all'interno del loop.
* Un evento esterno (la pressione del tasto) può scavalcare e condizionare il normale flusso del programma.
* Possiamo inserire dei blocchi messaggi che diventano le condizioni iniziali per far partire nuove istruzioni.