---
title: 4-Il Partitore di Tensione (Il Potenziometro)
description: 'Fino ad ora abbiamo usato l''elettricità come un interruttore Tutto acceso o Tutto spento. Ma nella vita reale vogliamo regolare le cose il volume della radio, la luminosità dello schermo, la velocità di un ventilatore. Per fare questo usiamo il Potenziometro (una resistenza variabile)'
draft: false
date: 2026-01-27
category: Microbit
class_target: "2, 3, Tutti"
image: /img/robotica/potenziometro2.png
---

# 4-Il Partitore di Tensione (Il Potenziometro)

### INTRODUZIONE TEORICA

**Come dosare l'elettricità?**

Fino ad ora abbiamo usato l'elettricità come un interruttore: **Tutto acceso** o **Tutto spento**.
Ma nella vita reale vogliamo regolare le cose: il volume della radio, la luminosità dello schermo, la velocità di un ventilatore.

Per fare questo usiamo il **Potenziometro** (una resistenza variabile).

Immaginate una striscia di materiale resistente e un contatto mobile.

1. **Terminali 1 e 2 (Estremi):** Sono collegati al positivo (3V) e al negativo (GND).
2. **Il Cursore o Tergicristallo (Centrale):** È un contatto che scorre sulla striscia quando giriamo la manopola.
* Se il cursore è vicino al 3V, legge 3 Volt.
* Se è vicino al GND, legge 0 Volt.
* Se è a metà, legge 1.5 Volt.
Questo meccanismo di divisione del voltaggio si chiama **Partitore di Tensione**.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/robotica/potenziometro1.png" style="width: 45%; object-fit: cover;">
     <img src="/img/robotica/potenziometro2.png" style="width: 45%; object-fit: cover;">
</div>


### MONTAGGIO DEL CIRCUITO (Tinkercad)

#### 1. Prepara i Componenti

Trascina sul tavolo di lavoro:

* 1x **Micro:bit**
* 1x **Breadboard** (Mini)
* 1x **Potenziometro** (quello blu con la manopola bianca).
	* *Nota:* Cliccaci sopra e imposta Resistenza a **10 kΩ** (10 kilo-ohm).
* 1x **LED** (Scegli un colore, es. Blu).
* 1x **Resistenza** (per il LED).
	* *Nota:* Imposta a **220 Ω** (ohm).

<center>
	<img src="/img/robotica/potenziometro3.png" alt="windows" width="300"/>
</center>

#### 2. Il Cablaggio (Segui con attenzione!)

Il potenziometro ha 3 gambe in fila. Dobbiamo collegarle tutte.

**Fase A: Alimentare il Potenziometro (Gli estremi)**

1. Inserisci il Potenziometro sulla Breadboard.
2. Collega la **Gamba Sinistra (Terminale 1)** al **GND** della Micro:bit (puoi usare la linea blu della breadboard se hai portato il GND lì).
3. Collega la **Gamba Destra (Terminale 2)** al pin **3V** della Micro:bit.
	* *Info:* Se inverti questi due fili, la manopola funzionerà al contrario, ma non si rompe nulla.


**Fase B: Il Segnale (Il Centrale)**

1. Collega la **Gamba Centrale (Morsetto)** direttamente al **Pin P0** della Micro:bit.
	* *Questo è il filo che "legge" la posizione della manopola.*

**Fase C: L'Uscita (Il LED esterno)**
Vogliamo controllare un LED esterno per vedere l'effetto dimmer.

1. Collega il **Pin P1** della Micro:bit a una gamba della resistenza da 220 .
2. Collega l'altra gamba della resistenza alla **Gamba Lunga (+)** del LED.
3. Collega la **Gamba Corta (-)** del LED al **GND**.

**Schema Mentale per gli studenti:**

* Input (Manopola)  entra nel Pin **P0**.
* Output (Luce)  esce dal Pin **P1**.

<center>
	<img src="/img/robotica/potenziometro4.png" alt="windows" width="350"/>
</center>


### IL CODICE A BLOCCHI

Dobbiamo leggere il valore della manopola e usarlo per regolare la luminosità del LED.

* La manopola (P0) ci dà un numero da **0 a 1023**.
* La luminosità del LED (P1) accetta un numero da **0 a 1023**.
* È perfetto! Possiamo passare il numero direttamente.

**Istruzioni per l'Editor Codice:**

1. Tieni solo il blocco **"Per sempre"**.
2. Vai su *Variabili* e crea una variabile chiamata **Livello**.
3. **Leggi la manopola:**
	* Prendi imposta [Livello] su ....
	* Al posto dello 0, inserisci il blocco leggi pin analogico P0 (dal menu viola *Ingresso*).


4. **Visualizza sullo schermo (Feedback 1):**
	* Inserisci traccia grafico a barre di [Livello] fino a [1023] (dal menu *Uscita* o *LED*).


5. **Controlla il LED esterno (Feedback 2):**
	* *Attenzione:* Qui serve il blocco giusto. Vai nel menu **Pin** (o *Uscita* avanzata).
	* Cerca il blocco **"scrivi pin analogico [P1] a [1023]"** (o *analog write*).
	* Trascina la variabile **Livello** al posto del numero 1023.

<center>
	<img src="/img/robotica/potenziometro5.png" alt="windows" width="400"/>
</center>

**Il Codice finale deve apparire così:**



### SIMULAZIONE E VERIFICA

#### 1. Avvia la Simulazione

* Clicca sul tasto **Avvia simulazione**.
* **Azione:** Clicca con il mouse sul Potenziometro blu. Apparirà un cerchio intorno alla manopola bianca. Clicca sul pallino e trascinalo per ruotare.

<video src="/img/robotica/potenziometro6.mp4" autoplay loop muted playsinline width="100%"></video>

#### 2. Checklist di funzionamento

Fai controllare agli studenti:

1. **Schermo Micro:bit:** Mentre giri la manopola, i LED rossi della matrice si riempiono? (Come le tacche del volume sul telefono).
2. **LED Esterno (Blu):**
	* Manopola al minimo  LED spento.
	* Manopola a metà  LED luce media.
	* Manopola al massimo  LED luce fortissima.



#### 3. Risoluzione Problemi comuni

* **Il LED esterno si accende solo tutto o niente:** Hai usato il blocco "Scrittura **Digitale**" (0 o 1) invece di "Scrittura **Analogica**" (0-1023). Cambia il blocco nel codice.
* **Il LED esterno non si accende mai:** Controlla se il LED è girato al contrario (Gamba lunga/corta scambiate) o se manca il filo di GND.

#### 4. Sfida Rapida (Per chi finisce prima)

"Riuscite a fare in modo che il LED esterno si comporti al contrario?" (Manopola al massimo = LED spento).

* *Soluzione Matematica:* Nel blocco di scrittura analogica P1, usa il blocco verde di sottrazione: [1023] - [Livello].