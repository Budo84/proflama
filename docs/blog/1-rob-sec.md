---
title: 1-La Legge di Ohm e i Segreti della Breadboard
description: 'Comprendere come limitare il flusso di corrente per proteggere i componenti e imparare a usare la breadboard per prototipare circuiti senza saldature'
draft: false
date: 2026-02-03
category: Microbit
class_target: "2, 3, Tutti"
image: /img/robotica/Led-micro1.png
---

# MODULO 1: LA FISICA CON MICRO:BIT

**MODULO 1: La Fisica dell'Elettronica (Breadboard e Componenti discreti)**

*Obiettivo: Capire cosa succede dentro i fili prima di collegarli a un computer. Uso della Breadboard senza microprocessore.*

* **Teoria:**  
  * **Anatomia della Breadboard:** Come sono collegati i fori (binari di alimentazione verticali, righe orizzontali).  
  * **Resistenza ($R$):** Limitare il flusso. Relazione $V = R * I$. Più alta è la resistenza, meno corrente passa.  
* **Componenti:** Breadboard, Battery Holder (4xAA o 6xAA), **Red LED**, Resistenze varie (220Ω, 1kΩ, 10kΩ).  
* **Attività Pratica:**  
  1. Collegare l'alimentazione ai binari rosso (+) e blu (-) della breadboard.  
  2. Costruire il circuito base: Positivo $\\rightarrow$ Resistenza 220Ω $\\rightarrow$ LED $\\rightarrow$ Negativo. Osservare la luce.  
  3. **L'esperimento:** Sostituire la resistenza da 220Ω con una da 1kΩ e poi da 10kΩ.  
  4. *Domanda:* Perché la luce diminuisce? (Stiamo "strozzando" il tubo dell'acqua).

**Focus:** Usare il coding per controllare e capire i fenomeni fisici.
**Prerequisito:** I kit devono avere la **Sensor Shield V2** montata sulla Micro:bit per facilitare i collegamenti.


## **Focus:** Elettronica analogica su Breadboard (Senza Micro:bit/Arduino)

## Prima Parte

## LEZIONE 1: La Legge di Ohm e i Segreti della Breadboard

**Obiettivo:** Comprendere come limitare il flusso di corrente per proteggere i componenti e imparare a usare la breadboard per prototipare circuiti senza saldature.

### 1. INTRODUZIONE E TEORIA
#### A. Anatomia della Breadboard

* **I Binari di Alimentazione (Verticali):** Ai lati ci sono linee rosse (+) e blu (-). Sotto la plastica, una striscia di metallo collega tutti i buchi dall'alto in basso. Qui collegheremo la batteria per distribuire l'energia a tutto il circuito.
* **Le Righe dei Componenti (Orizzontali):** Al centro, i buchi sono collegati in righe corte (es. riga 1a-1b-1c-1d-1e). **Attenzione:** La riga 1 *non* è collegata alla riga 2. Il solco al centro separa la parte destra da quella sinistra.

<center>
	<img src="/img/robotica/breadboard.png" alt="windows" width="300"/>
</center>

#### B. La Resistenza e la Legge di Ohm

Il LED è delicato. Se lo colleghiamo diretto alla batteria, passa troppa corrente (come aprire una diga su un ruscello) e il LED brucia. Dobbiamo mettere un "freno". Questo freno è la **Resistenza**.

**La Legge di Ohm:**

<center>
**$ V = R * I $**
</center>

Dove:

* **V (Volt):** La spinta della batteria.
* **R (Ohm ):** La potenza del freno (Resistenza).
* **I (Ampere):** La quantità di corrente che passa.

Se la batteria ($V$) resta uguale e aumentiamo il freno ($R$), la corrente ($I$) deve per forza scendere.

* Resistenza Bassa (220$\Omega$ )  Freno leggero  Tanta luce.
* Resistenza Media (1$k\Omega$) Freno medio Poca luce.
* Resistenza Alta (10$k\Omega$)  Freno potente  Luce fioca.

**Esempio Reale:** Immagina di stringere un tubo da giardino.

* Tubo libero = Resistenza zero = Acqua al massimo.
* Tubo schiacciato = Resistenza alta = Esce solo un filo d'acqua.


### 2. ATTIVITÀ PRATICA

**Materiali per Gruppo:** 

* 1 Breadboard
* 1 Battery Holder (con pile) 
* 1 LED Rosso 
* 3 Resistenze (220$\Omega$ [Rosso-Rosso-Marrone], 1k$\Omega$ [Marrone-Nero-Rosso], 10k$\Omega$ [Marrone-Nero-Arancio]) 
* Cavetti Dupont.

#### Passo 1: Dare energia alla Breadboard

1. Collegare il filo **Rosso** della batteria al binario Rosso della breadboard (+).
2. Collegare il filo **Nero** della batteria al binario Blu della breadboard (-).
3. Prendere il LED. La gamba lunga (Anodo) va nella stessa riga del filo rosso.
4. La gamba corta (Catodo) va nella riga del filo nero.

**Quiz:** Se tolgo la resistenza e collego il LED diretto, cosa succede?
* A) Si accende fortissimo e resta acceso.
* B) Si brucia subito.
* C) Non si accende.

**Risposta:** Il LED si accenderà ma comincerà a scaldarsi o addirittura brucerà; c'è troppa corrente nel circuito.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/robotica/Led1.png" style="width: 45%; object-fit: cover;">
     <img src="/img/robotica/Led2.png" style="width: 45%; object-fit: cover;">
</div>


#### Passo 2: Il Circuito di Sicurezza (con 220$\Omega$)

Seguite questo percorso (Circuito Serie):

1. Dal Binario Rosso (+)  Inserire una gamba della Resistenza da **220$\Omega$**.
2. L'altra gamba della Resistenza va in una riga libera al centro (es. riga 10).
3. Prendere il LED. La gamba lunga (Anodo) va nella stessa riga 10 (così tocca la resistenza).
4. La gamba corta (Catodo) va in una riga diversa (es. riga 11).
5. Usare un cavetto nero per collegare la riga 11 al Binario Blu (-).
**Risultato:** Il LED si accende forte.

<center>
	<img src="/img/robotica/Led3.png" alt="windows" width="300"/>
</center>


#### Passo 3: L'Esperimento del "Freno"

1. Staccare la resistenza da 220$\Omega$.
2. Mettere al suo posto quella da **1k$\Omega$**. *Osservazione:* La luce è meno forte?
3. Mettere al suo posto quella da **10k$\Omega$**. *Osservazione:* Il LED è appena acceso, quasi spento.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/robotica/Led4.png" style="width: 45%; object-fit: cover;">
     <img src="/img/robotica/Led5.png" style="width: 45%; object-fit: cover;">
</div>


### 3. ESERCIZI E VERIFICA

**Esercizio sul quaderno:**

1. **Disegna:** Disegna il simbolo del LED (triangolo con freccette) e della Resistenza (zig-zag).

<div style="display: flex; justify-content: space-around;">
     <img src="img/robotica/Led.png" style="width: 11%; object-fit: cover;">
     <img src="/img/robotica/Resistor.png" style="width: 28%; object-fit: cover;">
     <img src="/img/robotica/ddp.png" style="width: 25%; object-fit: cover;">
</div>


2. **Calcola:** Se ho una batteria da 5V e voglio una corrente di 0.02 Ampere, che resistenza serve?
* *Soluzione:* . (La nostra da 220$\Omega$ è quella più vicina!).

# Seconda Parte
## La Legge di Ohm (Controllata dal Codice)

**Obiettivo:** Capire la relazione  usando la Micro:bit come alimentatore programmabile.

### 1. INTRODUZIONE E TEORIA

#### A. La Micro:bit come "Centrale Elettrica"

Invece di usare una batteria che è sempre accesa, useremo i **PIN** della Micro:bit.

* **Pin Digitale (P0):** Possiamo dirgli "Diventa 3 Volt" (ACCESO/1) o "Diventa 0 Volt" (SPENTO/0) scrivendo una riga di codice.
* **VCC e GND sulla Shield:**
* **V (VCC):** È il rubinetto dell'acqua sempre aperto (+).
* **G (GND):** È lo scarico dell'acqua (-).


#### B. Ripasso Legge di Ohm

Oggi proveremo a cambiare la **R** fisicamente per vedere come cambia la **I** (Luce), mantenendo la **V** fissa (la Micro:bit eroga 3.3V).


### 2. ATTIVITÀ PRATICA

**Materiali:** Micro:bit + Shield, Breadboard, LED Rosso, Resistenze (220$\Omega$, 1k$\Omega$, 10k$\Omega$), cavetti F-M (Femmina-Maschio) per collegare Shield a Breadboard.

<center>
	<img src="/img/robotica/Led-micro1.png" alt="windows" width="300"/>
</center>

#### Passo 1: Il Codice (Preparazione)

Prima di costruire, prepariamo il "cervello".

* Blocco All'avvio: *Mostra icona (Smile).*
* Blocco *Per sempre*:
	* *Scrivi Digital Pin P0 a 1* (Accendi corrente)
	* *Pausa 2000 ms*
	* *Scrivi Digital Pin P0 a 0* (Spegni corrente)
	* *Pausa 1000 ms*

<center>
	<img src="/img/robotica/Led-code.png" alt="windows" width="300"/>
</center>

Scaricare il codice sulla Micro:bit.

#### Passo 2: Cablaggio su Breadboard

Colleghiamo la Micro:bit alla breadboard.

1. **GND:** Collegare un cavetto dal pin **G** (Shield) al binario **Blu (-)** della breadboard.
2. **Segnale:** Collegare un cavetto dal pin **0** a una riga della breadboard.
3. **Circuito:**
	* Inserire Resistenza **220$\Omega$**	* Inserire LED (Gamba Lunga).
	* Inserire LED (Gamba Corta).

<center>
	<img src="/img/robotica/Led-Res-micro1.gif" alt="windows" width="300"/>
</center>


#### Passo 3: L'Esperimento

1. Accendere la batteria della Micro:bit.
2. Il LED lampeggia? (2 sec acceso, 1 spento). *Successo! Stiamo controllando il flusso.*
3. **Il Test di Ohm:**
	* Staccare la resistenza da 220$\Omega$.
	* Mettere quella da **1k$\Omega$**. Il LED lampeggia più debole?
	* Mettere quella da **10k$\Omega$**. Il LED è fioco?


<div style="display: flex; justify-content: space-around;">
     <img src="/img/robotica/Led-Res-micro2.gif" style="width: 45%; object-fit: cover;">
     <img src="/img/robotica/Led-Res-micro3.gif" style="width: 45%; object-fit: cover;">
</div>



### 3. ESERCIZI E VERIFICA

**Sfida Coding:**

* Modifica il codice: Fai in modo che il LED si accenda solo quando premi il tasto A.
* *Soluzione:* Se pulsante A premuto -> Scrivi P0 a 1, Altrimenti -> Scrivi P0 a 0.
* *Concetto:* Abbiamo creato un interruttore "smart" che controlla un circuito fisico esterno.