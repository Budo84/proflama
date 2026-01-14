---
title: 05-Laboratorio-MicroBit-Parte-5
date: 2026-01-14T23:24:00.000+01:00
image: /img/termometro.gif
category: MicroBit
---
## Termometro digitale con avviso "Troppo caldo"

Per realizzare il nostro progetto abbiamo bisogno di introdurre due concetti: l'interazione con il sensore di temperatura integrato nella scheda e la logica condizionale.

### Il Sensore di Temperatura Base

Questo programma si concentra unicamente sulla lettura e visualizzazione del dato proveniente dal sensore integrato del Microbit.

**Concetto Chiave**: acquisizione di Dati da un Sensore
Microbit può leggere valori dall'ambiente circostante. Il blocco temperature (°C) restituisce la temperatura corrente del chip del Microbit in gradi Celsius.

* *on start* 

	* *show string "Temp"*

Visualizza un messaggio all'avvio per indicare che il programma è pronto.


* *forever*
	
	* *set temperatura to temperature (°C)*


**Dichiarazione e Lettura**: dopo aver creato una variabile *temperatura*, ad ogni ciclo, assegna alla variabile il valore letto dal sensore.


* *show number temperatura*


**Visualizzazione**: mostra il valore letto sul display LED 5x5.

*pause (ms) 1000*

**Controllo del Flusso**: attende 1 secondo prima di ripetere la lettura. Questo impedisce al numero di scorrere troppo velocemente.

**Risultato Atteso**: il Micro:bit mostra continuamente sul display la temperatura misurata (es. 23, 24, 23...).

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/termometro-semplice.png" style="width: 60%; object-fit: cover;">
     <img src="/img/microbit/termometro-semplice.gif" style="width: 25%; object-fit: cover;">
</div>


### La Logica Condizionale Semplice (Allarme)
Questo programma si concentra sull'uso della logica if/else per prendere decisioni basate sui dati, simulando la parte di allarme del codice finale.

**Concetto Chiave**: la Decisione (If/Else)

La logica condizionale permette al programma di eseguire azioni diverse in base a una condizione (in questo caso, se la temperatura è alta o bassa rispetto a una soglia).

Assumeremo che la variabile temperatura sia già stata impostata o letta in un blocco forever, come nell'esempio precedente.

* *forever*
	* *set temperatura to temperature (°C)*

Lettura della temperatura attuale (necessaria per il test).

* *if temperatura > 25 then*


**Condizione Allarme**: controlla se il valore di temperatura è maggiore di 25 (la nostra soglia d'allarme temporanea).

* *show string "HOT"*

**Azione Allarme**: 

* **se** la condizione è **vera** (è caldo), scorre il messaggio di allarme.

* **else** **caso alternativo**: viene eseguito solo se la condizione if è falsa (quindi la temperatura è ≤25).

* *show icon (tick)*

**Azione Normale**: Se la condizione è falsa (è fresco), mostra un'icona di "OK".

* *pause (ms) 1000*

Attende 1 secondo e ricomincia il ciclo di controllo.

**Risultato Atteso**: se la temperatura è maggiore di 25 (prova a tenere il Micro:bit in mano), scorre la scritta "HOT".
Se la temperatura è minore o uguale a 25, mostra un'icona di spunta.
Questo progetto introduce la lettura del sensore di temperatura e l'uso della logica condizionale con l'output visivo.


<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/termometro-semplice-allarme.png" style="width: 30%; object-fit: cover;">
     <img src="/img/microbit/termometro-semplice-allarme.gif" style="width: 43%; object-fit: cover;">
</div>


### Progetto Finale: Termometro digitale con avviso "Troppo caldo"

**Ciclo Continuo**: utilizza il blocco *forever* per leggere continuamente la temperatura.

**Lettura**: ottieni il valore del blocco temperatura (in Celsius).

**Logica di Allarme**: Usa la logica se/altrimenti:

* **SE** la temperatura è maggiore di 28 gradi (la soglia di allarme), 
	* **ALLORA**: Mostra un'icona lampeggiante di un fuoco e fai scorrere il testo "ALLARME CALDO!".

* **ALTRIMENTI** (se la temperatura è normale): Mostra semplicemente il valore della temperatura attuale (es. "24C").


**Pulsante Extra**

Puoi usare il Pulsante A per cambiare l'unità di misura e visualizzare la temperatura in Fahrenheit (necessita di un po' di matematica: F=C×1.8+32).

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/termometro.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/termometro.gif" style="width: 30%; object-fit: cover;">
</div>
