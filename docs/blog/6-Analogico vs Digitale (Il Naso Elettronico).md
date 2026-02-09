---
title: 6-Analogico vs Digitale (Il Naso Elettronico)
description: 'Costruire un sensore di gas funzionante, capire perché servono batterie esterne per i carichi pesanti e imparare a tarare uno strumento scientifico.'
draft: false
date: 2026-02-09
category: Microbit
class_target: "2, 3, Tutti"
image: /img/robotica/gas5.jpg
---

# 6-Analogico vs Digitale (Il Naso Elettronico)

**Obiettivo:** Costruire un sensore di gas funzionante, capire perché servono batterie esterne per i carichi pesanti e imparare a "tarare" uno strumento scientifico.


### INTRODUZIONE TEORICA

**Analogico e "Rumore di Fondo"**

Spiega alla classe:

1. **Il Naso Elettronico:** Oggi usiamo un sensore che si riscalda (come il filamento di un tostapane) per reagire al gas.
2. **Il Problema Energetico:** Scaldare costa fatica! La Micro:bit da sola non ce la fa (è un cervello, non un muscolo). Se proviamo ad alimentarlo solo con la scheda, lei si spegne per protezione.

	* *Soluzione:* Useremo un "Power Bank" esterno (batterie) per i muscoli, e la Micro:bit userà solo un filo per "ascoltare".


3. **Il Problema dello Zero:** L'aria pura non esiste. C'è sempre un po' di resistenza. Quindi il nostro sensore non segnerà mai "0" perfetto. Dovremo usare la matematica per "tararlo" (Calibrazione).


### MONTAGGIO DEL CIRCUITO


#### 1. I Componenti

Trascina sul tavolo di lavoro:

* 1x **Micro:bit**.
* 1x **Breadboard** (Mini).
* 1x **Sensore di Gas** (Quello blu rotondo a 6 gambe).
* 1x **Resistenza** (Imposta a **4.7 kΩ** - Giallo/Viola/Rosso. Se troppo alta prova con **1kΩ**).
* 1x **Batteria 1.5V** (Trascinala e nelle opzioni imposta **Conteggio: 3 batterie**). *Questo ci darà 4.5 Volt.*



<center>
	<img src="/img/robotica/gas.png" alt="gas.png" width="300"/>
</center>


#### 2. Il Cablaggio (Attenzione alla doppia alimentazione!)

Dobbiamo separare i circuiti: le Batterie alimentano la Breadboard, la Micro:bit si collega solo per "spiare".

**Fase A: Alimentare la Breadboard (I Muscoli)**

1. Collega il filo **Rosso (+)** del pacco Batterie alla linea rossa (+) della Breadboard.
2. Collega il filo **Nero (-)** del pacco Batterie alla linea blu (-) della Breadboard.
* *Ora la breadboard è "elettrificata" e potente.*



**Fase B: Collegare la Micro:bit (Il Cervello)**

1. **IMPORTANTE:** Collega il pin **GND** della Micro:bit alla linea blu (-) della Breadboard.
	* *Questo serve per avere un "terreno comune" (Common Ground).*


2. **NON** collegare il pin 3V della Micro:bit. Lascialo vuoto.

**Fase C: Il Sensore (Il Naso)**
Posiziona il sensore a cavallo del canale centrale.

* **I 3 Piedini SOPRA (H1, A1, A2):**
Collega tutti e tre i piedini superiori alla linea rossa (+) della breadboard.
	* *Ora il sensore si sta scaldando con l'energia delle batterie.*


* **I 3 Piedini SOTTO (B1, H2, B2):**

	1. Collega il piedino **Centrale (H2)** alla linea blu (-).
	2. Collega il piedino **Sinistro (B1)** alla Resistenza da 4.7 kΩ. L'altra gamba della resistenza va alla linea blu (-).
	3. Collega un filo dal piedino **Sinistro (B1)** al **Pin P1** della Micro:bit.



**Schema Mentale:**

> Batterie -> Breadboard.

> Sensore -> Breadboard.

> Micro:bit -> Legge solo il piedino B1.


<center>
	<img src="/img/robotica/gas1.png" alt="gas1.png" width="300"/>
</center>



### IL CODICE BASE (Senza Calibrazione)

Per ora leggiamo i valori grezzi per vedere "l'errore".

1. Tieni solo **"Per sempre"**.
2. Crea variabile **`LivelloGas`**.
3. `Imposta [LivelloGas] su [leggi pin analogico P1]`.
4. `Traccia grafico a barre di [LivelloGas] fino a [1023]`.

**Simulazione 1:**

* Avvia.
* Nota che i LED della Micro:bit sono già un po' accesi (es. 1 o 2 righe) anche senza gas.
* Avvicina la nuvola di gas. I LED salgono, ma forse non arrivano fino in cima.
* *Stop Simulazione.*


<center>
	<img src="/img/robotica/gas3.png" alt="gas3.png" width="300"/>
</center>


### LA CALIBRAZIONE (Teoria e Pratica)

#### 📘 Teoria: Perché non leggo 0 e 1023?

Spiega alla lavagna/LIM:

1. **Perché non è 0? (Il Rumore di Fondo):**
Il sensore misura quanto l'elettricità passa nell'aria. Anche senza gas, l'aria non è un muro perfetto, un po' di elettricità passa sempre. Inoltre, il sensore caldo ha una sua resistenza interna.

	* Quel valore iniziale (es. 120) si chiama **Baseline**. Dobbiamo sottrarlo per partire da zero.


2. **Perché non è 1023? (La Saturazione):**
Per arrivare a 1023 (massimo voltaggio), il sensore dovrebbe diventare un super-conduttore perfetto (resistenza zero). Nessun materiale reale lo fa. Arriverà magari a 700 o 800.

	* Dobbiamo dire al codice che il nostro "nuovo massimo" è 750.

Per leggere il valore esatto puoi inserire nel codice *mostra numero* con all'interno la variabile *livello-gas*


<center>
	<img src="/img/robotica/gas4.png" alt="gas4.png" width="300"/>
</center>


#### 🛠️ Pratica: Correggiamo il Codice

Diciamo alla Micro:bit: *"Prendi il valore, togli 120 (così partiamo da zero) e disegna il grafico considerando che il massimo è 750, non 1023"*.

**Modifica il blocco "Grafico a Barre":**

1. Guarda il valore minimo che avevi nella simulazione (es. 120).
2. Guarda il valore massimo col gas (es. 750).
3. Usa il blocco matematica col **MENO (-)**.

Il codice finale sarà:

```text
[PER SEMPRE]
   │
   ├── [Imposta 'LivelloGas' su (leggi pin analogico P1)]
   │
   └── [Traccia grafico a barre di (LivelloGas - 120) fino a (750)]

```

*(Nota: I numeri 120 e 750 vanno cambiati in base a quello che vedono gli studenti nella loro simulazione).*

**Simulazione Finale:**

* Ora, senza gas, i LED sono completamente spenti.
* Col gas al massimo, i LED sono tutti accesi fino all'ultima riga.
* **Missione Compiuta:** Abbiamo calibrato lo strumento come veri ingegneri!


<video src="/img/robotica/gas6.mp4" autoplay loop muted playsinline width="100%"></video>

