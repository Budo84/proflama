---
title: Base-microbit-01-led-resistenza
description: 'Colleghiamo un LED classico al micro:bit con la resistenza giusta e lo facciamo lampeggiare con MakeCode.'
draft: false
date: 2026-10-08
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-led-cablaggio.webp
---

# Base-microbit-01-led-resistenza
**Obiettivo:** Collegare un **LED esterno** al micro:bit con la **resistenza di protezione** e farlo lampeggiare con MakeCode.

**Concetti Chiave:**
- Anodo (gamba lunga) e catodo (gamba corta)
- Resistenza in serie, calcolata per i 3 V del micro:bit
- Uscita digitale sul pin P0
- Ciclo "per sempre"

## Fase 1: Teoria 🧠

Il **LED** emette luce se la corrente lo attraversa nel verso giusto: l'**anodo** (gamba lunga) verso il positivo, il **catodo** (gamba corta) verso GND. Senza una resistenza in serie la corrente è troppo alta e il LED si brucia.

Il micro:bit fornisce **3 V** sui suoi pin. Per un LED rosso (circa 2 V) e una corrente di pochi mA basta una resistenza da **330 Ω**: R = (3 - 2) ÷ 0,003 ≈ 330 Ω. Il LED farà meno luce di uno acceso a 5 V, ed è normale.

- **Domanda alla classe:** *"Perché per lo stesso LED usiamo una resistenza da 330 Ω con il micro:bit e 220 Ω con Arduino?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit** (V1 o V2)
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **LED** rosso da 5 mm
* 1x **Resistore da 330 Ω** (arancio-arancio-marrone)
* Cavi jumper

#### Cablaggio
1. Pin **P0** del micro:bit → resistore da 330 Ω.
2. L'altra estremità del resistore → **anodo** del LED (gamba lunga).
3. **Catodo** del LED → pin **GND** del micro:bit.

<center>
	<img src="/img/robotica/base-microbit-led-cablaggio.webp" alt="LED con resistore da 330 ohm collegato al pin P0 e a GND del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
I pin del micro:bit lavorano a **3 V** e sopportano correnti molto piccole: non collegare mai direttamente motori o carichi che assorbono molto. Controlla il verso del LED prima di collegarlo.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> accendi P0, aspetta un secondo, spegni P0, aspetta un secondo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Loop | `per sempre` | Ripete il codice all'infinito | Contenitore principale |
| Pins | `digital write pin P0 to 1` | Accende il LED | Dentro "per sempre" |
| Basic | `pause (ms) 1000` | Aspetta un secondo | Dopo l'accensione |
| Pins | `digital write pin P0 to 0` | Spegne il LED | Dopo la pausa |
| Basic | `pause (ms) 1000` | Aspetta un altro secondo | Dopo lo spegnimento |

<center>
	<img src="/img/robotica/base-microbit-led-blocchi.webp" alt="blocchi MakeCode che accendono e spengono il pin P0 ogni secondo" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

while True:
    pin0.write_digital(1)
    sleep(1000)
    pin0.write_digital(0)
    sleep(1000)
```

## Fase 5: Verifica 🔍

Scarica il programma sul micro:bit: il LED deve accendersi e spegnersi ogni secondo. Se non si accende, controlla il verso del LED e che i cavi siano sul pin giusto.

::: tip 💡 CONSIGLIO
Cambia i tempi di pausa da 1000 a 200: il LED lampeggia più veloce. Che valore serve perché sembri sempre acceso?
:::
<center>
	<img src="/img/robotica/base-microbit-led-blocchi.webp" alt="base-microbit-led-blocchi.webp" width="300"/>
</center>

<center>
	<img src="/img/robotica/base-microbit-led-cablaggio.webp" alt="base-microbit-led-cablaggio.webp" width="300"/>
</center>

<center>
	<img src="/img/robotica/base-microbit-led.webp" alt="base-microbit-led.webp" width="300"/>
</center>
