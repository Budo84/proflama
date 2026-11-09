---
title: "10-Il termometro con il sensore TMP36 (micro:bit)"
description: 'Misuriamo la temperatura ambiente in gradi Celsius con il sensore TMP36 collegato a un ingresso analogico del micro:bit.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-temperatura.webp
---

# 10-Il termometro con il sensore TMP36 (micro:bit)

**Obiettivo:** Costruire un **termometro** con il sensore **TMP36**, convertendo la lettura analogica in gradi Celsius.

**Concetti Chiave:**
- Sensore di temperatura analogico: 10 mV per grado
- Offset di 500 mV del TMP36
- Conversione lettura → tensione → temperatura
- Differenza con il sensore di temperatura interno del micro:bit

## Fase 1: Teoria 🧠

Il **TMP36** è un sensore analogico a tre piedini che funziona anche con **3 V**: va bene per il micro:bit. La tensione in uscita cresce di **10 mV per ogni grado**, partendo da 500 mV a 0 °C. A 25 °C l'uscita vale 750 mV.

Per ottenere la temperatura:

1. `analog read pin P0` restituisce un numero da 0 a 1023 (circa 0-3,3 V);
2. tensione in volt = lettura × 3,3 ÷ 1023;
3. **temperatura in °C = (tensione - 0,5) × 100**.

Il micro:bit ha già un sensore di temperatura interno, ma misura quella del **processore**, che è più alta di quella dell'aria.

- **Domanda alla classe:** *"Perché la temperatura del processore del micro:bit non è una buona misura per la temperatura dell'aula?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Sensore TMP36** (contenitore nero a mezzaluna)
* 3x Cavi jumper

#### Cablaggio
Con il lato **piatto** rivolto verso di te e i piedini in basso, da sinistra a destra:
1. **+Vs** → **3V**
2. **Vout** → **P0**
3. **GND** → **GND**

<center>
	<img src="/img/robotica/base-microbit-temperatura-cablaggio.webp" alt="sensore TMP36 con i tre piedini collegati a 3V, P0 e GND del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se inverti 3V e GND il sensore si scalda e si rovina: controlla il verso del lato piatto. L'**LM35** ha lo stesso aspetto ma ha bisogno di almeno 4 V e di una formula diversa, quindi non va bene con il micro:bit alimentato a 3 V.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> leggi P0, converti in volt, converti in °C, mostra la temperatura arrotondata, aspetta 2 secondi

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Loop | `per sempre` | Ripete la misura | Contenitore principale |
| Variables | `imposta tensione a (analog read pin P0 × 3.3 ÷ 1023)` | Calcola la tensione in volt | Dentro "per sempre" |
| Variables | `imposta temperatura a ((tensione - 0.5) × 100)` | Calcola i gradi | Dopo la tensione |
| Basic | `show number (round temperatura)` | Mostra la temperatura | Dopo il calcolo |
| Basic | `pause (ms) 2000` | Aspetta due secondi | Alla fine |

<center>
	<img src="/img/robotica/base-microbit-temperatura-blocchi.webp" alt="blocchi MakeCode che convertono la lettura analogica di P0 in gradi Celsius" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

while True:
    lettura = pin0.read_analog()
    tensione = lettura * 3.3 / 1023
    temperatura = (tensione - 0.5) * 100
    display.scroll(str(round(temperatura)), delay=80, wait=False)
    sleep(2000)
```

## Fase 5: Verifica 🔍

Dopo qualche secondo il display mostra più o meno la temperatura dell'aula. Stringi il sensore tra le dita: il valore sale di qualche grado.

::: tip 💡 CONSIGLIO
Confronta la lettura con un termometro di riferimento e fai calcolare alla classe l'errore: una differenza di 1-2 gradi è normale.
:::

::: info ℹ️ PER ANDARE OLTRE
Prova a mostrare in confronto `temperature` (sensore interno) e la misura del TMP36: la differenza dà un'idea di quanto si scalda il processore.
:::
