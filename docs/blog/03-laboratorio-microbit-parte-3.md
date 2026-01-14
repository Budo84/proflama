---
title: 03-Laboratorio-MicroBit-Parte-3
date: 2026-01-14T23:16:00.000+01:00
image: /img/matrice-item.gif
---

Vogliamo realizzare un programma che alla pressione del pulsante A incrementi di 5 i LED sulla matrice della microbit e alla pressione del pulsante B elimini 5 LED sulla matrice della microbit. Per realizzarlo abbiamo bisono di introdurre tre concetti fondamentali: **Variabili**, **Visualizzazione LED** e **Logica Condizionale** (*if...then*).

#### Fase 1: Introduzione alla Variabile (Programma 1)

**Concetto chiave**: una variabile è come una scatola o un contenitore in memoria che può contenere un valore (un numero o un testo) e il cui contenuto può cambiare.

**Attività**: "Il Contatore Interattivo
Dichiarazione e Inizializzazione".

* In *on start (all'avvio)*, creiamo la nostra variabile, chiamandola *item* (come nel codice finale).
* Le diamo un valore iniziale, *set item to 0*. Iniziare da zero è una pratica comune.

**Modifica**

* Quando premiamo *on button A pressed*, usiamo *change item by 1*. Questo aumenta il valore di 1.
* Quando premiamo *on button B pressed*, usiamo *change item by -1*. Questo diminuisce il valore di 1.

**Visualizzazione**

* Nel blocco *forever (per sempre)*, mostriamo il valore attuale di item usando *show number item*.

<center>
	<img src="/img/microbit/variabile.png" alt="windows" width="350"/>
</center>

#### Fase 2: Visualizzare i Dati sulla Matrice LED (Programma 2)

**Concetto chiave**: come trasformare un numero (la variabile) in una rappresentazione visiva sulla griglia 5x5 di LED, usando un grafico a barre.

**Attività**: "Il Grafico a Barre"

* Manteniamo i blocchi di *on start* e *on button A pressed* della Fase 1, ma modifichiamo l'incremento a *change item by 5*.

**Il Blocco Magico**: sostituiamo il blocco *show number item* in forever con il blocco *plot bar graph of item up to 25*.

**Spiegazione**: Il blocco 'plot bar graph' (traccia grafico a barre) prende il valore di item e lo confronta con un valore massimo (in questo caso, 25). Se item è 0, non accende nulla. Se item è 25, accende tutti e 5 i LED in verticale.

* **Test**: premere A ripetutamente. Ogni pressione (che aggiunge 5) dovrebbe accendere un LED per ogni colonna finché tutti e 25 i LED non sono accesi.

**Domanda di Verifica**: se impostassi il valore massimo a 100, quanti LED si accenderebbero con un valore di item pari a 50? (*Risposta: Metà della matrice LED, o 2 colonne e mezza*).

#### Fase 3: Aggiungere i Limiti (Programma 3 e Codice Finale)

**Concetto chiave**: la logica condizionale (if...then) ci permette di impostare delle "regole di sicurezza" per evitare che la variabile vada oltre i valori che ci interessano (lo spoiler del codice finale).

**Attività**: La Regola del "Non Sforare"

**Introduzione del Limite Massimo**: aggiungiamo un blocco if...then subito dopo il grafico a barre in forever:

* *if item >= 25 then set item to 25*

**Spiegazione**: se la variabile item diventa maggiore o uguale a 25, la "forziamo" a tornare al valore massimo di 25. Non potrà salire oltre, anche se continuiamo a premere A.

**Introduzione del Limite Minimo**: Aggiungiamo un secondo blocco if...then:

* *if item <= 0 then set item to 0*

**Spiegazione**: se la variabile scende sotto zero (o è uguale a zero), la "forziamo" a rimanere a 0. Non potrà scendere sotto lo zero.

**Conclusione**

Siamo ora pronti per affrontare il programma finale (quello che hai mostrato) perchè unisce tutti questi concetti:

Inizializzazione: on start (sebbene non mostrato, l'inizializzazione a 0 è implicita).

Interazione: on button A/B pressed per cambiare il valore di item (+5 o -5).

Visualizzazione: plot bar graph per mostrare il progresso.

Logica Condizionale: I blocchi if per assicurarsi che il contatore (la variabile item) rimanga sempre tra 0 e 25.

Questa struttura garantisce che il grafico a barre sulla matrice LED non "overflow" o non vada in negativo, mantenendo l'interazione dei pulsanti sempre all'interno del range visibile e utile.

Proviamo a comporre questo programma:

* quando viene premuto il bottone **A** sulla matrice LED si accendono 5 LED.
* quando viene premuto il bottone **B** sulla matrice LED si spengono 5 LED.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/matrice-item.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/matrice-item.gif" style="width: 45%; object-fit: cover;">
</div>
