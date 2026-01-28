
<video src="/img/robotica/logica-booleana5.mp4" autoplay loop muted playsinline width="100%"></video>

<video src="/img/robotica/logica-booleana5.mov" autoplay loop muted playsinline width="100%"></video>

<center>
	<img src="/img/robotica/logica-booleana4.png" alt="logica-booleana4.png" width="300"/>
</center>

<video src="/img/robotica/logica-booleana3.mov" autoplay loop muted playsinline width="100%"></video>

<video src="/img/robotica/logica-booleana2.mp4" autoplay loop muted playsinline width="100%"></video>

<center>
	<img src="/img/robotica/logica-booleana1.png" alt="logica-booleana1.png" width="300"/>
</center>

<center>
	<img src="/img/robotica/logica-booleana0bis.png" alt="logica-booleana0bis.png" width="300"/>
</center>

<center>
	<img src="/img/robotica/logica-booleana0.png" alt="logica-booleana0.png" width="300"/>
</center>
---
title: 5-Logica Booleana Fisica (AND e OR senza chip)
description: 'I computer capiscono solo due parole: VERO (1) e FALSO (0). Combinando queste due parole, prendono decisioni complesse usando la "Logica Booleana". Oggi costruiremo due "cervelli elettrici" senza usare nessun microchip, solo interruttori. Logica Booleana AND e OR'
draft: false
date: 2026-01-28
category: Microbit
class_target: "2, 3, Tutti"
image: /img/robotica/logica-booleana0.jpg
---

# 5-Logica Booleana Fisica (AND e OR senza chip)

### INTRODUZIONE TEORICA

**Come ragionano le macchine?**

I computer capiscono solo due parole: **VERO (1)** e **FALSO (0)**.
Combinando queste due parole, prendono decisioni complesse usando la "Logica Booleana".

Oggi costruiremo due "cervelli elettrici" senza usare nessun microchip, solo interruttori.

1. **La Logica AND (Serie):**
	* *Concetto:* Per passare, devono essere abbassati **SIA** il ponte A **SIA** il ponte B.
	* *Esempio:* La cassaforte della banca (servono due chiavi girate insieme per aprirla).
	* *Fisica:* Interruttori messi in fila (Serie).

<center>
	<img src="/img/robotica/logica-booleana0bis.png" alt="windows" width="400"/>
</center>


<center>
	<img src="/img/robotica/logica-booleana.png" alt="logica-booleana.png" width="300"/>
</center>

2. **La Logica OR (Parallelo):**
	* *Concetto:* Per passare, basta che sia abbassato il ponte A **OPPURE** il ponte B.
	* *Esempio:* Il campanello di casa (puoi suonare quello al cancello O quello alla porta).
	* *Fisica:* Interruttori su strade diverse che si riuniscono (Parallelo).


### CIRCUITO 1 - LOGICA "AND" (La Cassaforte)

*In questa lezione la Micro:bit serve SOLO come batteria (Power Bank). Non scriveremo codice per la logica!*

#### 1. Componenti

* 1x **Micro:bit** (usata solo per dare corrente).
* 1x **Breadboard** (Mini).
* 2x **Pulsanti** (Pushbutton).
* 1x **LED** (Rosso).
* 1x **Resistenza** (220 ).

<center>
	<img src="/img/robotica/logica-booleana.png" alt="windows" width="400"/>
</center>

#### 2. Il Cablaggio AND (In Serie)

Dobbiamo costringere la corrente a passare attraverso il primo bottone E POI attraverso il secondo.

1. **Alimentazione Base:**
	* Collega **GND** della Micro:bit alla linea blu **(-)** della breadboard.
	* Collega **3V** della Micro:bit alla linea rossa **(+)** della breadboard.


2. **I Pulsanti (Attenzione alle gambe):**
	* Inserisci il **Pulsante A** sulla breadboard (es. colonne 5-7).
	* Inserisci il **Pulsante B** un po' più in là (es. colonne 15-17).
	* *Nota:* Su Tinkercad i pulsanti collegano le gambe in diagonale (Terminal 1a con 2a). Noi useremo **Terminale 1b** (sinistra) e **Terminale 2b** (destra) per semplicità.


3. **La Catena (Serie):**
	* **Ingresso A:** Collega la linea rossa **(+)** al **Terminale 1b** del Pulsante A.
	* **Il Ponte:** Collega il **Terminale 2b** del Pulsante A al **Terminale 1b** del Pulsante B. *(Questo è il segreto: l'uscita del primo è l'entrata del secondo!)*.
	* **Uscita B:** Collega il **Terminale 2b** del Pulsante B alla gamba lunga del **LED**.


4. **Chiusura:**
	* Collega la gamba corta del LED alla Resistenza (220$\Omega$).
	* Collega l'altra parte della Resistenza alla linea blu **(-)**.

<center>
	<img src="/img/robotica/logica-booleana1.png" alt="windows" width="400"/>
</center>

**Verifica visiva:** Segui col dito. Corrente -> Bottone A -> Filo -> Bottone B -> LED -> Terra. Se stacchi un punto qualsiasi, si ferma tutto.

*Nota: per premere contemporaneamente i pulsanti devi premere il primo tenendo premuto il pulsante shift sulla tastiera e poi premere il secondo*



### CIRCUITO 2 - LOGICA "OR" (Il Campanello)

Ora modifichiamo il circuito senza smontare tutto. Vogliamo che basti premere uno qualsiasi dei due.

#### 1. Modifica il Cablaggio (Parallelo)

Dobbiamo creare due strade separate per la corrente.

1. **Rimuovi** il filo "Ponte" che univa i due bottoni.
2. **Strada A:** Collega il (+) al Pulsante A. L'uscita del Pulsante A va **direttamente** al LED (Gamba Lunga).
3. **Strada B:** Collega il (+) al Pulsante B. L'uscita del Pulsante B va **anch'essa** allo stesso LED (Gamba Lunga).

*In pratica, entrambi i pulsanti prendono energia dal rosso e la portano entrambi alla gamba lunga del LED.*

**Verifica visiva:** La corrente ha un bivio. Può passare sopra (Bottone A) oppure sotto (Bottone B) per arrivare al LED.

<center>
	<img src="/img/robotica/logica-booleana4.png" alt="windows" width="400"/>
</center>


### SIMULAZIONE E SFIDA

Non serve codice speciale (la Micro:bit è sempre accesa), quindi basta cliccare **Avvia Simulazione**.

#### 1. Test della Logica AND (Se hai tenuto il primo circuito)

* Premi tasto A: **Spento**.
* Premi tasto B: **Spento**.
* Premi **Maiusc + Click** (su PC) per tenere premuto A, poi clicca B: **ACCESO!**
	* *Conclusione:* Servono entrambi.

<video src="/img/robotica/logica-booleana2.mp4" autoplay loop muted playsinline width="100%"></video>

#### 2. Test della Logica OR (Se hai fatto la modifica)

* Premi tasto A: **Acceso**.
* Premi tasto B: **Acceso**.
* Premi entrambi: **Acceso**.
	* *Conclusione:* Basta uno qualsiasi.
	
<video src="/img/robotica/logica-booleana5.mp4" autoplay loop muted playsinline width="100%"></video>

#### 3. Domanda Finale

"Ragazzi, le luci di Natale che se ne rompe una si spengono tutte... che logica usano? AND o OR?"

* *Risposta:* **AND** (Sono in serie. Se una si rompe, apre il circuito come un interruttore aperto).
"E le luci di casa?"
* *Risposta:* **OR** (Sono in parallelo).


