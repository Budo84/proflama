---
title: LEZIONE 3: Il Transistor (L'Amplificatore di Potenza)
description: Scrivi qui una breve sintesi per Google (max 160 caratteri)...
draft: false
date: 2026-01-24
category: Microbit
class_target: 2, 3
image: /img/transistor.png
---

# LEZIONE 3: Il Transistor (L'Amplificatore di Potenza)

### INTRODUZIONE TEORICA

**L'analogia Idraulica (Il Rubinetto)**

"La Micro:bit è intelligente, ma debole. Può accendere un piccolo LED, ma se proviamo ad attaccarci un motore potente o una striscia LED, la bruciamo. Ci serve un 'interruttore muscoloso'. Questo è il **Transistor**."

Immaginate un **Rubinetto dell'acqua**:

1. **COLLETTORE (Collector - C):** È il tubo grosso dove arriva l'acqua ad alta pressione (dal muro).
2. **EMETTITORE (Emitter - E):** È dove esce l'acqua (nel lavandino).
3. **BASE (Base - B):** È la manopola.
	* *Il Concetto:* Basta una forza piccolissima (due dita sulla manopola/Base) per far scorrere un fiume d'acqua (tra Collettore ed Emettitore).

<center>
	<img src="img/robotica/transistor.png" alt="windows" width="300"/>
</center>



**In Elettronica:**
Noi useremo la Micro:bit per girare la manopola (Base) delicatamente, e il Transistor farà passare la corrente di una potente batteria da 9V verso un motore.

### MONTAGGIO DEL CIRCUITO (Tinkercad)

#### 1. Prepara i Componenti

Trascina questi componenti sul tavolo di lavoro:

* 1x **Micro:bit**
* 1x **Breadboard** (Mini)
* 1x **Transistor NPN (BJT)**.
	* *Cerca "NPN" nella ricerca componenti.*

* 1x **Motore CC** (Motore a corrente continua, quello giallo o metallico).
* 1x **Batteria 9V**.
* 1x **Resistenza** (Imposta a **1 kΩ**).

<center>
	<img src="img/robotica/transistor2.png" alt="windows" width="300"/>
</center>

#### 2. Il Cablaggio (Attenzione ai Pin del Transistor!)

In Tinkercad, se passi il mouse sui piedini del Transistor, ti dice i nomi: **E** (Emettitore), **B** (Base), **C** (Collettore).

**Fase A: Alimentazione Potente (Circuito del "Gigante")**

1. Posiziona il **Transistor** sulla Breadboard.
2. Posiziona la **Batteria 9V** e il **Motore**.
3. Collega il **Filo Rosso (Positivo)** della Batteria 9V a un morsetto del **Motore**.
4. Collega l'altro morsetto del Motore al **Collettore (C)** del Transistor.
5. Collega l'**Emettitore (E)** del Transistor al **Filo Nero (Negativo)** della Batteria 9V.
	* *Ora abbiamo un circuito potente interrotto dal transistor.*

**Fase B: Il Segnale di Controllo (Circuito del "Bambino")**

1. Collega una **Resistenza da 1 kΩ** al piedino centrale, la **Base (B)** del Transistor.
2. Collega l'altra estremità della resistenza al **Pin P0** della Micro:bit.
	* *La resistenza serve a proteggere il transistor dalla Micro:bit.*


**Fase C: Massa Comune (Common Ground) - IL PASSO CRUCIALE**

Affinché il sistema funzioni, i due circuiti devono condividere lo "scarico" (Ground).

1. Collega il **Filo Nero (Negativo)** della Batteria 9V al pin **GND** della Micro:bit.
	* *Senza questo filo, non funzionerà nulla!*

<center>
	<img src="img/robotica/transistor3.png" alt="windows" width="300"/>
</center>


### IL CODICE (Makecode / Tinkercad)

Dobbiamo dire alla Micro:bit: *"Quando premo A, manda un piccolo segnale alla Base per aprire il rubinetto"*.

**Vai su "Codice" -> "Blocchi" e crea questo:**

1. Cancella "All'avvio" e "Per sempre".
2. Prendi dal menu **Ingresso**: Quando si preme il pulsante A.
3. Dentro metti (dal menu **Uscita**):
	* Pin di scrittura digitale P0 in ALTO (Accendi).
	* Mostra Icona (Sì/Check).
4. Prendi dal menu **Ingresso**: Quando si preme il pulsante B.
5. Dentro metti:
	* Pin di scrittura digitale P0 in BASSO (Spegni).
	* Mostra Icona (No/X).

<center>
	<img src="img/robotica/transistor4.png" alt="windows" width="300"/>
</center>


### SIMULAZIONE E ANALISI

#### 1. Avvia la Simulazione

* Clicca **Avvia**.
* Il motore dovrebbe essere fermo (0 RPM).
* **Clicca il tasto A sulla Micro:bit virtuale:**
* Il Pin P0 invia 3 Volt (deboli).
* Questi 3 Volt colpiscono la Base.
* Il Transistor si "sveglia" e lascia passare i 9 Volt della batteria grande.
* **Il Motore gira veloce!** (dovresti vedere circa 100-300 RPM o più, a seconda del modello motore).


* **Clicca il tasto B:**
* Il Pin P0 va a 0 Volt.
* Il Transistor chiude il rubinetto.
* Il motore si ferma.


<video src="/img/transistor5.mp4" autoplay loop muted playsinline width="100%"></video>

#### 2. Domande per la Classe (Debriefing)

* **Prof:** "Chi sta facendo girare il motore? L'energia viene dalla Micro:bit?"
* **Risposta:** No! L'energia viene dalla Batteria 9V. La Micro:bit sta solo dando l'ordine, come un vigile che dirige il traffico pesante.
* **Prof:** "Cosa succede se stacco il filo nero che unisce la batteria 9V e la Micro:bit (GND)?"
* **Esperimento:** Provate a staccarlo in simulazione.
* **Risultato:** Non funziona più. L'elettricità non ha una strada comune per tornare indietro.

#### 3. Conclusione

Avete costruito un **Amplificatore Digitale**. Con un segnale piccolissimo e sicuro (Microbit), avete controllato un motore potente e separato. È così che funzionano le auto elettriche, i droni e i robot industriali!
