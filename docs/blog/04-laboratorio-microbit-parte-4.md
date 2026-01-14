---
title: 04-Laboratorio-MicroBit-Parte-4
date: 2026-01-14T23:17:00.000+01:00
image: /img/dado-elettronico.gif
category: MicroBit
---
## Dado Elettronico

Vogliamo realizzare un dado elettronico che funzioni muovendo microbit. Per fare questo introduciamo un concetto importante: la generazione di numeri casuali (random).

### La Casualità nel Codice

I numeri casuali (o "random") sono fondamentali per creare giochi, simulazioni, e qualsiasi programma che necessiti di risultati imprevedibili, come il programma del dado.

**Cos'è la Casualità?**

La casualità in programmazione non è mai veramente casuale; è una sequenza generata da un algoritmo (da qui il termine pseudo-casuale). Però, per i nostri scopi con Micro:bit, possiamo considerarli dei numeri imprevedibili.

Il blocco chiave per generarli è:

<center>
 *set [variabile] to pick random [A] to [B]*
</center>

* **pick random**: istruisce il Micro:bit a scegliere un numero.

* **[A] a [B]**: definisce l'intervallo. Il Micro:bit può scegliere qualsiasi numero intero compreso tra A e B, inclusi A e B stessi.

**Esercizio**: la Moneta Digitale

Simuliamo il lancio di una moneta. Abbiamo bisogno di due risultati: Testa o Croce.

**Attività**: Creazione della Moneta

* **Dichiarazione**: Crea una variabile chiamata *risultato*.

* **Generazione**: Usa il blocco *on button A pressed (o on shake)* e imposta:

	* *set risultato to pick random 0 to 1* 

(Il risultato sarà 0 per "Testa" o 1 per "Croce").

* **Visualizzazione con Logica**: utilizza la logica condizionale per mostrare il risultato.

	* *if risultato = 0 then show icon (cuore)* 
	* *else show icon (X)*

**Risultato Atteso**: Ogni volta che premi il pulsante A, il Micro:bit mostrerà casualmente un cuore (Testa) o una X (Croce).

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/testa-cuore.png" style="width: 75%; object-fit: cover;">
     <img src="/img/microbit/testa-cuore.gif" style="width: 35%; object-fit: cover;">
</div>


### Personalizzare gli Intervalli

Nel programma del dado, l'intervallo è 1 a 6. Ma possiamo usare numeri casuali per molti scopi.

**Attività**: Il Termometro Casuale

Supponiamo di voler simulare la temperatura in una stanza, che può variare tra $18^°C$ e $25^°C$.

* **Dichiarazione**: crea una variabile chiamata *temperatura*.

* **Generazione**: usa il blocco *forever* per aggiornare la temperatura ogni 5 secondi (usando pause 5000 ms):

<center>
*set temperatura to pick random 18 to 25*
</center>

* **Visualizzazione**: usa il blocco *show number temperatura* per mostrare il valore sulla matrice LED.

**Risultato Atteso**: La temperatura cambierà casualmente tra 18 e 25 ogni 5 secondi, simulando le variazioni ambientali.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/temperatura-casual.png" style="width: 65%; object-fit: cover;">
     <img src="/img/microbit/temperatura-casual.gif" style="width: 35%; object-fit: cover;">
</div>


### Applicazione Avanzata: Coordinate Casuali

I numeri casuali non servono solo a generare numeri in sequenza, ma possono essere usati per generare coordinate per il display LED.

**Attività**: il Pixel Impazzito

Vogliamo accendere e spegnere un LED a caso sulla matrice 5x5. Questo richiede due numeri casuali:

* **Coordinate**: crea due variabili: *x e y*.

Il display LED del Micro:bit ha 5 colonne (da 0 a 4) e 5 righe (da 0 a 4).

* **Generazione**: in un blocco *forever*

<center>
*set x to pick random 0 to 4*

*set y to pick random 0 to 4*
</center>

* **Visualizzazione**: usa il blocco *plot x, y* per accendere il LED nella posizione casuale.

* **Controllo**: aggiungi un piccolo *pause 500 ms* per non farlo accendere troppo velocemente.

* **Spegnimento**: usa un blocco *unplot x, y* per spegnere il LED nella posizione precedente.

* **Controllo**: aggiungi un piccolo *pause 500 ms* per non farlo spegnere troppo velocemente.

**Risultato Atteso**: un singolo LED si accenderà e spegnerà in posizioni completamente casuali sulla griglia 5x5.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/pixel-impazzito.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/pixel-impazzito.gif" style="width: 45%; object-fit: cover;">
</div>


In sintesi, i numeri casuali sono il tuo strumento per introdurre l'imprevedibilità e il movimento realistico nei tuoi progetti Microbit.

Questo è un progetto base per introdurre l'uso del sensore di movimento e della generazione casuale.

### Progetto finale: Dado elettronico

* **Trigger**: utilizza il blocco quando scosso. Quando il Microbit viene agitato, si attiva il lancio del dado.

* **Logica Casuale**: utilizza il blocco scegli numero a caso tra 1 e 6. Il risultato è il valore del dado.

* **Visualizzazione**: usa una struttura se/altrimenti se per associare ogni numero casuale (1 a 6) a un motivo a punti corrispondente sulla matrice LED (es. per il 3, accendi i tre LED in diagonale).

* **Aggiunta**: puoi aggiungere un suono (se usi Micro:bit v2) o un'animazione di conteggio rapido per rendere il lancio più eccitante prima di mostrare il risultato finale.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/nrand.png" style="width: 40%; object-fit: cover;">
     <img src="/img/microbit/dado-elettronico.gif" style="width: 50%; object-fit: cover;">
</div>
