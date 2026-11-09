---
title: "12-Il motore in corrente continua e il transistor (micro:bit)"
description: 'Pilotiamo un motorino DC con un transistor e un diodo di protezione, senza collegarlo direttamente al micro:bit.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-motore.webp
---

# 12-Il motore in corrente continua e il transistor (micro:bit)

**Obiettivo:** Comandare un **motore DC** usando un **transistor** come interruttore, con un **diodo** di protezione, e regolarne la velocità con il PWM.

**Concetti Chiave:**
- Perché un pin del micro:bit non può alimentare un motore
- Il transistor come interruttore
- Diodo di protezione
- Velocità con `analog write` (0-1023)

## Fase 1: Teoria 🧠

Un pin del micro:bit può dare solo pochi milliampere, mentre un motorino ne richiede centinaia. Collegarlo direttamente può **danneggiare la scheda**. Usiamo un **transistor NPN** come interruttore: una piccola corrente sulla **Base** permette il passaggio di una corrente molto più grande tra **Collettore** ed **Emettitore**. Il motore è alimentato da una **batteria separata**.

Per proteggere il transistor dal picco di tensione quando il motore si spegne, mettiamo un **diodo 1N4007** in parallelo al motore, con la **striscia** verso il positivo.

- **Domanda alla classe:** *"Perché il transistor lo possiamo comandare con un segnale così piccolo e riesce a far girare un motore?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Motorino DC** da 3-6 V
* 1x **Transistor NPN** (2N2222 o PN2222)
* 1x **Resistore da 1 kΩ**
* 1x **Diodo 1N4007**
* 1x **Pacco batterie** 3 × AA (4,5 V) o 4 × AA (6 V) con interruttore
* Cavi jumper

#### Cablaggio
1. Pin **P0** → resistore **1 kΩ** → **Base** del transistor.
2. **Emettitore** → **GND** del micro:bit e **negativo** della batteria.
3. **Collettore** → un filo del motore. L'altro filo del motore → **positivo** della batteria.
4. **Diodo** in parallelo al motore: striscia (catodo) verso il positivo della batteria.

<center>
	<img src="/img/robotica/base-microbit-motore-cablaggio.webp" alt="motore DC con transistor e diodo comandato dal pin P0 del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
L'ordine dei piedini del transistor cambia da modello a modello (ad esempio PN2222: E-B-C, BC547: C-B-E, guardando il lato piatto): controlla il datasheet. Non alimentare mai il motore dal pin 3V del micro:bit. Il **negativo** della batteria va sempre collegato anche al pin **GND** del micro:bit: tutti i componenti devono avere la massa in comune.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Premi A* -> motore a piena velocità
- *Premi B* -> motore a metà velocità
- *Premi A+B* -> motore fermo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Input | `quando il pulsante A è premuto` | Evento | Contenitore principale |
| Pins | `analog write pin P0 to 1023` | Velocità massima | Dentro l'evento A |
| Input | `quando il pulsante B è premuto` | Evento | Contenitore principale |
| Pins | `analog write pin P0 to 512` | Circa metà velocità | Dentro l'evento B |
| Input | `quando i pulsanti A+B sono premuti` | Evento | Contenitore principale |
| Pins | `analog write pin P0 to 0` | Motore fermo | Dentro l'evento A+B |

<center>
	<img src="/img/robotica/base-microbit-motore-blocchi.webp" alt="blocchi MakeCode che regolano la velocità del motore su P0 con i pulsanti" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        pin0.write_analog(0)       # fermo
    elif button_a.is_pressed():
        pin0.write_analog(1023)    # massima velocità
    elif button_b.is_pressed():
        pin0.write_analog(512)     # metà velocità
    sleep(50)
```

## Fase 5: Verifica 🔍

Premendo A il motore gira veloce, con B più lento, con A+B si ferma. Se non parte con valori bassi è normale: sotto una certa soglia il motore non ha forza sufficiente.

::: tip 💡 CONSIGLIO
Fai provare valori diversi (200, 400, 600…) per scoprire da quale valore il motore comincia a girare.
:::

::: info ℹ️ PER ANDARE OLTRE
Con questo circuito il motore gira in un solo verso. Per invertirlo serve un **ponte H**, come nella prossima lezione.
:::
