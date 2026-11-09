---
title: "11-Il transistor di potenza NPN TIP120 (micro:bit)"
description: 'Usiamo un transistor di potenza NPN TIP120 per pilotare carichi a 12 V con il micro:bit, regolandone la potenza con i pulsanti A e B.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-transistor-potenza.webp
---

# 11-Il transistor di potenza NPN TIP120 (micro:bit)

**Obiettivo:** Usare un **transistor di potenza NPN (TIP120)** come interruttore per comandare un carico a 12 V con il micro:bit e **regolarne la potenza** con i pulsanti A e B.

**Concetti Chiave:**
- Il transistor come interruttore comandato
- Base, collettore, emettitore
- Resistore di base
- Diodo di protezione (flyback)
- Alimentazione separata con massa in comune
- PWM con `analog write` (0-1023)

## Fase 1: Teoria 🧠

Un pin della scheda può dare pochi milliampere: troppo poco per una striscia LED a 12 V, una pompa o un motore potente. Il **transistor di potenza** fa da **interruttore**: una piccola corrente sulla **Base** controlla una corrente molto più grande che passa tra **Collettore** ed **Emettitore**, alimentata da un **alimentatore separato**.

Il **TIP120** è un transistor **NPN Darlington** (due transistor in uno): ha un guadagno altissimo (circa 1000), quindi bastano pochi mA sulla base per far passare anche **alcuni ampere** (massimo 5 A, 60 V). Ha tre piedini e una **linguetta metallica** che è collegata al collettore. Guardando il lato con la scritta, da sinistra a destra: **B**ase, **C**ollettore, **E**mettitore.

Come funziona come interruttore:

- base a **0 V** → il transistor è **spento**, il carico non riceve corrente;
- base a livello **alto** (tramite un resistore da 1 kΩ) → il transistor è **acceso** e il carico si alimenta.

Dando alla base un segnale **PWM** si regola anche la quantità di energia al carico: luminosità di una striscia LED, velocità di un motore.

Un transistor Darlington lascia cadere circa **1-2 V** tra collettore ed emettitore: sul carico arriva un po' meno tensione e il transistor si **scalda**. Oltre circa **1 A** serve un **dissipatore** metallico.

Il micro:bit fornisce al massimo **3 V** su un pin e pochissima corrente: con il resistore da 1 kΩ la base riceve circa 1 mA, che grazie al guadagno del Darlington basta per carichi fino a circa **1 A**. Per carichi più grandi o per il minimo riscaldamento è meglio un MOSFET a livello logico.

- **Domanda alla classe:** *"Il micro:bit dà solo 3 V e pochissima corrente. Perché il transistor riesce comunque ad accendere un carico a 12 V?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Transistor di potenza NPN TIP120**
* 1x **Resistore da 1 kΩ**
* 1x **Diodo 1N4007**
* 1x **Carico a 12 V** (striscia LED monocolore, lampadina, motore o ventola)
* 1x **Alimentatore 12 V** (o pacco batterie adatto al carico)
* Cavi jumper

#### Cablaggio
Con il lato scritto del TIP120 rivolto verso di te, da sinistra a destra: **B – C – E**.
1. Pin **P0** → resistore **1 kΩ** → **Base (B)**.
2. **Emettitore (E)** → **GND** del micro:bit **e** negativo dell'alimentatore.
3. Carico: positivo dell'alimentatore → carico → **Collettore (C)**.
4. **Diodo 1N4007** in parallelo al carico: striscia (catodo) verso il positivo dell'alimentatore.

<center>
	<img src="/img/robotica/base-microbit-transistor-potenza-cablaggio.webp" alt="TIP120 con resistore di base sul pin P0, carico a 12 volt e diodo di protezione" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Controlla il verso dei piedini del TIP120 prima di alimentare: se scambi collettore ed emettitore il carico non funziona o il transistor si danneggia. Il **negativo dell'alimentatore** deve essere collegato anche al **GND della scheda**. Non superare i 5 A e usa un dissipatore sopra 1 A. Per carichi con induttanza (motori, pompe, relè) metti **sempre** il diodo 1N4007 in parallelo al carico, con la **striscia** verso il positivo. Non collegare mai i 12 V ai pin del micro:bit.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Premi A* -> aumenta la potenza di un gradino
- *Premi B* -> diminuisci la potenza di un gradino
- *Per sempre* -> applica la potenza al pin P0 e mostrala come grafico a barre

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Variables | `imposta potenza a 0` | Parte con il carico spento | All'avvio |
| Input | `quando il pulsante A è premuto` | Evento | Contenitore principale |
| Variables | `cambia potenza di 128` | Aumenta di un gradino (limite 1023) | Dentro l'evento A |
| Input | `quando il pulsante B è premuto` | Evento | Contenitore principale |
| Variables | `cambia potenza di -128` | Diminuisce di un gradino (limite 0) | Dentro l'evento B |
| Loop | `per sempre` | Aggiorna l'uscita | Contenitore principale |
| Pins | `analog write pin P0 to potenza` | Regola il carico con il PWM | Dentro "per sempre" |
| LED | `plot bar graph of potenza up to 1023` | Mostra la potenza sul display | Dopo il PWM |

<center>
	<img src="/img/robotica/base-microbit-transistor-potenza-blocchi.webp" alt="blocchi MakeCode che regolano la potenza sul pin P0 con i pulsanti A e B" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

potenza = 0   # da 0 a 1023

while True:
    if button_a.was_pressed():
        potenza = min(1023, potenza + 128)
    if button_b.was_pressed():
        potenza = max(0, potenza - 128)
    pin0.write_analog(potenza)
    # mostra il livello come numero di LED accesi (0-25)
    display.clear()
    for i in range(round(potenza * 25 / 1023)):
        display.set_pixel(i % 5, i // 5, 9)
    sleep(50)
```

## Fase 5: Verifica 🔍

Premi A più volte: il carico si accende e aumenta gradualmente fino al massimo. Premi B: diminuisce. Controlla con cautela il TIP120: se scalda molto riduci il carico o aggiungi un dissipatore.

::: tip 💡 CONSIGLIO
Se la striscia LED non raggiunge la luminosità massima, è normale: il micro:bit pilota la base con soli 3 V e il Darlington perde 1-2 V. Prova a ridurre il resistore di base a 470 Ω e verifica che la scheda non si scaldi.
:::

::: info ℹ️ PER ANDARE OLTRE
Con questo circuito il motore o la ventola girano in un solo verso. Per invertire il verso usa un ponte H (lezione sull'L293D).
:::
