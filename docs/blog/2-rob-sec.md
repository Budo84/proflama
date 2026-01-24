---
title: 2-Il Condensatore
draft: false
date: 2026-01-19
image: /img/robotica/condensatore1.png
category: MicroBit
class_target: ["2","3"]
description: Visualizzare la carica e scarica dell'energia elettrica usando i LED della Micro:bit come indicatore di livello.
---
**Obiettivo:** Visualizzare la carica e scarica dell'energia elettrica usando i LED della Micro:bit come indicatore di livello.

---

### INTRODUZIONE TEORICA

**L'analogia dell'acqua**

"Immaginate che l'elettricità sia acqua che scorre in un tubo."

1. **La Batteria:** È la pompa che spinge l'acqua.
2. **La Resistenza:** È un tubo stretto che rallenta il flusso.
3. **Il Condensatore:** È un **Serbatoio** o un palloncino elastico collegato al tubo.

**Cosa succede?**

* Quando apriamo l'acqua (ACCESO), l'acqua non esce subito forte alla fine del tubo. Prima deve **riempire il serbatoio**.
* Quando chiudiamo l'acqua (SPENTO), l'acqua continua a uscire per un po', perché il **serbatoio si sta svuotando**.

In elettronica, il condensatore accumula energia.

### MONTAGGIO DEL CIRCUITO (Tinkercad)

**Tinkercad**

#### 1. Prepara i Componenti (Attenzione ai valori!)

Trascina questi componenti sul tavolo di lavoro e **modifica subito i loro valori** cliccandoci sopra:

* 1x **Micro:bit**
* 1x **Breadboard** (Mini)
* 1x **Condensatore Polarizzato** (Il cilindro nero/grigio). Cliccaci e imposta **Capacità** a **$1000\mu f $** . (Se lo lasci a 1 non vedrai nulla!).
* 1x **Resistenza** (per la carica). Imposta a **$1k\Omega$**.
* 1x **LED** (Rosso).
* 1x **Resistenza** (per il LED). Imposta a **$220\Omega$** .


#### 2. Il Cablaggio

Seguiamo il percorso della corrente:

1. **GND (Terra):** Collega il pin **GND** della Micro:bit alla linea negativa (quella col meno **-**) della breadboard.
2. **Il Condensatore:** Inseriscilo sulla breadboard.
	* La gamba con la striscia bianca (Negativo) va collegata alla linea del meno **(-)**.
	* La gamba senza striscia (Positivo) va su una riga libera (es. riga 10).
3. **La Carica:**
	* Metti la **Resistenza da 1 k$\Omega$** collegata alla gamba Positiva del condensatore.
	* Collega l'altra parte della resistenza al **Pin P0** della Micro:bit. (Filo Verde).
4. **La Misura:**
	* Collega un filo diretto dal **Pin P1** alla gamba Positiva del condensatore. (Filo Verde).
5. **Il Consumo (LED):**
	* Collega la gamba lunga del **LED** alla gamba Positiva del condensatore.
	* Collega la gamba corta del LED alla **Resistenza da $220\Omega$ **.
	* Collega l'altra parte della resistenza da $220\Omega$  alla linea del meno **(-)**.

<center>
	<img src="/img/robotica/condensatore1.png" alt="windows" width="300"/>
</center>


### IL CODICE

Andiamo su "Codice" -> "Blocchi".

**Il Trucco della Calibrazione:** Invece di usare 1023 (il massimo teorico), useremo **700** come valore massimo per il grafico, così i LED si accenderanno tutti anche se il LED rosso ruba un po' di energia.

**Crea questo codice esatto:**

1. Tieni solo il blocco **"Per sempre"**.
2. Crea una Variabile chiamata *Tensione*.

**BLOCCO A: FASE DI CARICA (Rubinetto Aperto)**

* Pin di scrittura digitale P0 in ALTO (Dà corrente).
* Ripeti 50 volte:
* Imposta Tensione su leggi pin analogico P1.
* Traccia grafico a barre di Tensione fino a 700` (Blocco viola nel menu *Uscita* o *Led*).
* Attendi 50 millisecondi (Blocco arancione nel menu *Controllo*).

**BLOCCO B: FASE DI SCARICA (Rubinetto Chiuso)**

* Pin di scrittura digitale P0 in BASSO (Toglie corrente).
* Ripeti 50 volte:
* Imposta Tensione su leggi pin analogico P1.
* Traccia grafico a barre di Tensione fino a 700`.
* Attendi 50 millisecondi.

<center>
	<img src="/img/robotica/condensatore2.png" alt="windows" width="300"/>
</center>

### SIMULAZIONE E SFIDA

#### 1. Avvia la Simulazione

Clicca "Avvia".

* **Osserva i LED della Micro:bit:** Dovresti vederli accendersi riga per riga dal basso verso l'alto (come un bicchiere che si riempie).
* **La Scarica:** Quando sono pieni, inizieranno a spegnersi lentamente, riga per riga, dall'alto verso il basso.
* **Osserva il LED Rosso sulla breadboard:** Si accende e si spegne in dissolvenza (fade in / fade out), sincronizzato con i LED della Micro:bit.

<center>
	<img src="/img/robotica/condensatore.gif" alt="windows" width="300"/>
</center>

#### 2. Risoluzione Problemi (Se non va)

* *Si riempie troppo veloce (non vedo l'animazione):* Hai messo il condensatore a 1000 ? Se è a 1  è istantaneo. Hai messo la resistenza P0 a 1 ?
* *I LED non arrivano in cima:* Nel blocco "grafico a barre", abbassa il numero da 700 a **600**.
* *I LED sono sempre tutti accesi:* Aumenta il numero da 700 a **800**.

#### 3. La Sfida Finale (Per chi finisce prima)

"Ora cambiate il condensatore da 1000  a **100** e riavviate."

* *Domanda:* Cosa succede?
* *Risposta:* Il serbatoio è diventato piccolo! Si riempie e si svuota velocissimamente. L'effetto dissolvenza sparisce quasi del tutto.
