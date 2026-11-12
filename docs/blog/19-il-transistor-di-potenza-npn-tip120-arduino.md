---
title: 19-Il transistor di potenza NPN TIP120 (Arduino)
description: 'Usiamo un transistor di potenza NPN TIP120 per pilotare carichi a 12 V come una striscia LED o un motore, regolandone la potenza con il PWM.'
draft: false
date: 2026-11-10
category: "Officina-Robotica, Arduino"
class_target: "2, 3, Tutti"
image: /img/robotica/base-arduino-transistor-potenza.webp
---

# 19-Il transistor di potenza NPN TIP120 (Arduino)

**Obiettivo:** Usare un **transistor di potenza NPN (TIP120)** come interruttore per comandare un carico a 12 V con Arduino e **regolarne la potenza** con il PWM e un potenziometro.

**Concetti Chiave:**
- Il transistor come interruttore comandato
- Base, collettore, emettitore
- Resistore di base
- Diodo di protezione (flyback)
- Alimentazione separata con massa in comune
- Dissipazione del calore

## Fase 1: Teoria 🧠

Un pin della scheda può dare pochi milliampere: troppo poco per una striscia LED a 12 V, una pompa o un motore potente. Il **transistor di potenza** fa da **interruttore**: una piccola corrente sulla **Base** controlla una corrente molto più grande che passa tra **Collettore** ed **Emettitore**, alimentata da un **alimentatore separato**.

Il **TIP120** è un transistor **NPN Darlington** (due transistor in uno): ha un guadagno altissimo (circa 1000), quindi bastano pochi mA sulla base per far passare anche **alcuni ampere** (massimo 5 A, 60 V). Ha tre piedini e una **linguetta metallica** che è collegata al collettore. Guardando il lato con la scritta, da sinistra a destra: **B**ase, **C**ollettore, **E**mettitore.

Come funziona come interruttore:

- base a **0 V** → il transistor è **spento**, il carico non riceve corrente;
- base a livello **alto** (tramite un resistore da 1 kΩ) → il transistor è **acceso** e il carico si alimenta.

Dando alla base un segnale **PWM** si regola anche la quantità di energia al carico: luminosità di una striscia LED, velocità di un motore.

Un transistor Darlington lascia cadere circa **1-2 V** tra collettore ed emettitore: sul carico arriva un po' meno tensione e il transistor si **scalda**. Oltre circa **1 A** serve un **dissipatore** metallico.

- **Domanda alla classe:** *"Perché non colleghiamo la striscia LED direttamente al pin di Arduino? Che cosa potrebbe succedere?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Transistor di potenza NPN TIP120**
* 1x **Resistore da 1 kΩ** (marrone-nero-rosso)
* 1x **Diodo 1N4007**
* 1x **Potenziometro 10 kΩ**
* 1x **Carico a 12 V**: striscia LED monocolore, lampadina, motore o ventola
* 1x **Alimentatore 12 V** (o pacco batterie adatto al carico)
* Cavi jumper

#### Cablaggio
Con il lato scritto del TIP120 rivolto verso di te, da sinistra a destra: **B – C – E**.
1. Pin **9** di Arduino → resistore **1 kΩ** → **Base (B)**.
2. **Emettitore (E)** → **GND** di Arduino **e** negativo dell'alimentatore.
3. Carico: positivo dell'alimentatore → carico → **Collettore (C)**.
4. **Diodo 1N4007** in parallelo al carico: striscia (catodo) verso il positivo dell'alimentatore.
5. Potenziometro: estremi a **5V** e **GND**, cursore su **A0**.

<center>
	<img src="/img/robotica/base-arduino-transistor-potenza-cablaggio.webp" alt="TIP120 con resistore di base sul pin 9, carico a 12 volt e diodo di protezione" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Controlla il verso dei piedini del TIP120 prima di alimentare: se scambi collettore ed emettitore il carico non funziona o il transistor si danneggia. Il **negativo dell'alimentatore** deve essere collegato anche al **GND della scheda**. Non superare i 5 A e usa un dissipatore sopra 1 A. Per carichi con induttanza (motori, pompe, relè) metti **sempre** il diodo 1N4007 in parallelo al carico, con la **striscia** verso il positivo.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> pin 9 come uscita
- *Per sempre* -> leggi il potenziometro su A0, trasformalo in un valore PWM da 0 a 255, scrivilo sul pin 9

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(9, OUTPUT);` | Il pin 9 pilota la base del transistor |
| `loop()` | `analogRead(A0)` | Legge il potenziometro (0-1023) |
| `loop()` | `map(v, 0, 1023, 0, 255)` | Converte nella scala del PWM |
| `loop()` | `analogWrite(9, potenza);` | 0 = spento, 255 = piena potenza |

**Prova 1: acceso e spento**

```cpp
const int pinTransistor = 9;

void setup() {
  pinMode(pinTransistor, OUTPUT);
}

void loop() {
  digitalWrite(pinTransistor, HIGH);   // carico acceso
  delay(2000);
  digitalWrite(pinTransistor, LOW);    // carico spento
  delay(2000);
}
```

**Prova 2: regolatore di potenza con il potenziometro**

```cpp
const int pinTransistor = 9;
const int pinPot = A0;

void setup() {
  pinMode(pinTransistor, OUTPUT);
}

void loop() {
  int valore = analogRead(pinPot);
  int potenza = map(valore, 0, 1023, 0, 255);
  analogWrite(pinTransistor, potenza);
  delay(10);
}
```

## Fase 5: Verifica 🔍

Nella prima prova il carico si accende e si spegne ogni 2 secondi. Nella seconda ruotando il potenziometro la striscia LED (o il motore) varia in modo continuo. Dopo qualche minuto tocca con cautela il TIP120: se è molto caldo, il carico assorbe troppa corrente e serve un dissipatore.

::: tip 💡 CONSIGLIO
Misura con un multimetro la tensione ai capi del carico a piena potenza e confrontala con quella dell'alimentatore: la differenza è la caduta del transistor (circa 1-2 V).
:::

::: info ℹ️ PER ANDARE OLTRE
Esistono anche i **MOSFET a livello logico** (ad esempio IRLZ44N): scaldano molto meno del TIP120 e si comandano con la tensione invece che con la corrente. Il circuito è molto simile, con la differenza che al posto della base c'è il **gate**.
:::
