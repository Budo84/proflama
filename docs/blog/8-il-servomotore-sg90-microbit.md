---
title: "8-Il servomotore SG90 (micro:bit)"
description: 'Controlliamo l''''angolo di un servomotore da 0 a 180 gradi con i pulsanti del micro:bit.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-servo.webp
---

# 8-Il servomotore SG90 (micro:bit)

**Obiettivo:** Collegare un **servomotore** e comandarne l'angolo da 0° a 180° con i pulsanti A e B del micro:bit.

**Concetti Chiave:**
- Differenza tra motore DC e servomotore
- Segnale PWM di posizione
- Alimentazione separata dei motori
- Blocco `servo write`

## Fase 1: Teoria 🧠

Il **servomotore** SG90 si ferma all'**angolo** che gli indichiamo, tra **0° e 180°**. Ha tre fili: **marrone** (GND), **rosso** (alimentazione 4,8-6 V), **arancione** (segnale).

Il micro:bit non può alimentare il servo: la corrente richiesta è troppo alta per il pin 3V. Per questo usiamo un **pacco batterie** (4 × AA = 6 V). Il segnale di controllo, che è a 3 V, è sufficiente.

- **Domanda alla classe:** *"Che differenza c'è tra un motore che gira all'infinito e un servo che si ferma a un angolo scelto?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Servomotore SG90**
* 1x **Pacco batterie** 4 × AA (6 V) o 3 × AA (4,5 V)
* Cavi jumper

#### Cablaggio
1. Filo **rosso** → **positivo** della batteria.
2. Filo **marrone** → **negativo** della batteria **e** pin **GND** del micro:bit.
3. Filo **arancione** → pin **P0**.

<center>
	<img src="/img/robotica/base-microbit-servo-cablaggio.webp" alt="servomotore SG90 con segnale su P0 e alimentazione da batteria esterna" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non alimentare il servo dal pin **3V** del micro:bit. Il **negativo** della batteria va sempre collegato anche al pin **GND** del micro:bit: tutti i componenti devono avere la massa in comune.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Premi A* -> servo a 0°
- *Premi B* -> servo a 180°
- *Premi A+B* -> servo a 90°

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Input | `quando il pulsante A è premuto` | Evento del pulsante | Contenitore principale |
| Pins | `servo write pin P0 to 0` | Porta il servo a 0° | Dentro l'evento A |
| Input | `quando il pulsante B è premuto` | Evento del pulsante | Contenitore principale |
| Pins | `servo write pin P0 to 180` | Porta il servo a 180° | Dentro l'evento B |

<center>
	<img src="/img/robotica/base-microbit-servo-blocchi.webp" alt="blocchi MakeCode che spostano il servo su P0 a 0, 180 e 90 gradi con i pulsanti" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

pin0.set_analog_period(20)   # segnale a 50 Hz

def angolo(a):
    # da 0,5 ms (0°) a 2,5 ms (180°) su un periodo di 20 ms
    pin0.write_analog(int(26 + a * (128 - 26) / 180))

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        angolo(90)
    elif button_a.is_pressed():
        angolo(0)
    elif button_b.is_pressed():
        angolo(180)
    sleep(50)
```

## Fase 5: Verifica 🔍

Premi A: il braccetto va a un estremo; premi B: va all'altro; premi A+B: va al centro. Se il servo vibra a fine corsa, usa angoli leggermente più piccoli (ad esempio 10° e 170°).

::: tip 💡 CONSIGLIO
Attacca una cannuccia o un cartoncino al braccetto per creare una lancetta e rendere l'angolo più visibile.
:::
