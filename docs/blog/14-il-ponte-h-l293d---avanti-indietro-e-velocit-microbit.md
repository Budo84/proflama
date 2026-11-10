---
title: "14-Il ponte H L293D - avanti, indietro e velocità (micro:bit)"
description: 'Comandiamo il verso di rotazione e la velocità di un motore DC con il driver L293D e i pulsanti del micro:bit.'
draft: false
date: 2026-11-10
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-ponte-h.webp
---

# 14-Il ponte H L293D - avanti, indietro e velocità (micro:bit)

**Obiettivo:** Far girare un motore DC **in entrambi i versi** e regolarne la velocità con il driver **L293D** (ponte H).

**Concetti Chiave:**
- Ponte H: inversione della polarità sul motore
- Pin di direzione e pin di enable (PWM)
- Alimentazione della logica del chip
- Massa in comune

## Fase 1: Teoria 🧠

Per far girare un motore al contrario bisogna **invertire i due fili**. Il **ponte H** lo fa elettronicamente. Il chip **L293D** può pilotare **2 motori** (circa 600 mA per canale).

Per un motore usiamo tre pin:

- **1A** e **2A**: decidono il verso (1A alto e 2A basso = avanti; il contrario = indietro).
- **EN1,2** (enable): attiva il canale; con un segnale PWM regola anche la **velocità**.

Il chip ha due alimentazioni, **VCC1** (logica) e **VCC2** (motori). Entrambe vanno collegate alla batteria, perché **VCC1 richiede almeno 4,5 V**. I segnali a 3 V del micro:bit sono riconosciuti come "alti" dal chip.

- **Domanda alla classe:** *"Cosa succede se 1A e 2A sono entrambi alti? E se sono entrambi bassi?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **L293D** (16 pin)
* 1x **Motorino DC** da 3-6 V
* 1x **Pacco batterie** 4 × AA (6 V)
* Cavi jumper

#### Cablaggio
Con la **tacca** del chip in alto, il pin 1 è in alto a sinistra.
1. **Pin 16** (VCC1) e **pin 8** (VCC2) → **positivo** della batteria.
2. **Pin 4, 5, 12, 13** → **GND** (e negativo della batteria, e GND del micro:bit).
3. **Pin 1** (EN1,2) → **P0**. **Pin 2** (1A) → **P1**. **Pin 7** (2A) → **P2**.
4. **Pin 3** (1Y) e **pin 6** (2Y) → i due fili del motore.

<center>
	<img src="/img/robotica/base-microbit-ponte-h-cablaggio.webp" alt="chip L293D con motore DC collegato ai pin P0, P1 e P2 del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Il **negativo** della batteria va sempre collegato anche al pin **GND** del micro:bit: tutti i componenti devono avere la massa in comune. Non superare i 600 mA per canale.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Premi A* -> avanti a piena velocità
- *Premi B* -> indietro a metà velocità
- *Premi A+B* -> fermo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Input | `quando il pulsante A è premuto` | Evento | Contenitore principale |
| Pins | `digital write pin P1 to 1`, `digital write pin P2 to 0` | Verso avanti | Dentro l'evento A |
| Pins | `analog write pin P0 to 1023` | Velocità piena | Dopo i due verso |
| Input | `quando il pulsante B è premuto` | Evento | Contenitore principale |
| Pins | `digital write pin P1 to 0`, `digital write pin P2 to 1` | Verso indietro | Dentro l'evento B |
| Pins | `analog write pin P0 to 512` | Metà velocità | Dopo i due verso |

<center>
	<img src="/img/robotica/base-microbit-ponte-h-blocchi.webp" alt="blocchi MakeCode che comandano direzione e velocità del motore con L293D su P0, P1 e P2" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

def avanti(v):
    pin1.write_digital(1)
    pin2.write_digital(0)
    pin0.write_analog(v)

def indietro(v):
    pin1.write_digital(0)
    pin2.write_digital(1)
    pin0.write_analog(v)

def ferma():
    pin0.write_analog(0)

while True:
    if button_a.is_pressed() and button_b.is_pressed():
        ferma()
    elif button_a.is_pressed():
        avanti(1023)
    elif button_b.is_pressed():
        indietro(512)
    sleep(50)
```

## Fase 5: Verifica 🔍

A: il motore gira in un verso a piena velocità; B: nel verso opposto a metà velocità; A+B: si ferma. Se i versi sono scambiati rispetto a ciò che volevi, inverti i due fili del motore.

::: tip 💡 CONSIGLIO
Con l'altro lato del chip (pin 9, 10, 15) puoi aggiungere un secondo motore: è la base per un piccolo robot a due ruote.
:::
