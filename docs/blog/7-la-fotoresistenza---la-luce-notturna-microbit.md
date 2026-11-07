---
title: "7-La fotoresistenza - la luce notturna (micro:bit)"
description: 'Misuriamo la luce con una fotoresistenza e accendiamo un LED esterno quando è buio.'
draft: false
date: 2026-11-07
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-fotoresistenza.webp
---

# 7-La fotoresistenza - la luce notturna (micro:bit)

**Obiettivo:** Misurare la luce con una **fotoresistenza (LDR)** in un partitore di tensione e costruire una **luce notturna automatica**.

**Concetti Chiave:**
- Resistenza che dipende dalla luce
- Partitore di tensione con resistore fisso
- Soglia di intervento
- Lettura analogica su P0

## Fase 1: Teoria 🧠

La **fotoresistenza** (LDR) cambia resistenza con la luce: molto alta al buio, molto bassa con la luce. Non ha polarità.

Per far leggere la luce al micro:bit la mettiamo in serie con un resistore fisso da **10 kΩ**: il punto in mezzo è collegato a **P0**. Con più luce la LDR scende di resistenza e la tensione su P0 **sale**, con meno luce **scende**.

- **Domanda alla classe:** *"Cosa succederebbe alla lettura se scambiassimo di posto la fotoresistenza e il resistore da 10 kΩ?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Fotoresistenza (LDR)**
* 1x **Resistore da 10 kΩ**
* 1x **LED** + 1x **resistore da 330 Ω**
* Cavi jumper

#### Cablaggio
1. **LDR** tra **3V** e il punto centrale.
2. **Resistore 10 kΩ** tra il punto centrale e **GND**.
3. Punto centrale → **P0**.
4. LED: **P1** → resistore 330 Ω → anodo, catodo → **GND**.

<center>
	<img src="/img/robotica/base-microbit-fotoresistenza-cablaggio.webp" alt="fotoresistenza e resistore da 10 kiloohm su P0 e LED su P1 del micro:bit" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> leggi P0; se è sotto la soglia accendi P1, altrimenti spegnilo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Loop | `per sempre` | Ripete la misura | Contenitore principale |
| Logic | `se analog read pin P0 < 300 allora` | Confronta la luce con la soglia | Dentro "per sempre" |
| Pins | `digital write pin P1 to 1 / 0` | Accende o spegne il LED | Nei due rami |

<center>
	<img src="/img/robotica/base-microbit-fotoresistenza-blocchi.webp" alt="blocchi MakeCode che accendono il LED su P1 quando la lettura di P0 è sotto 300" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

SOGLIA = 300   # da tarare

while True:
    luce = pin0.read_analog()
    if luce < SOGLIA:
        pin1.write_digital(1)
    else:
        pin1.write_digital(0)
    sleep(100)
```

## Fase 5: Verifica 🔍

Copri la fotoresistenza con la mano: il LED si accende. Scopri: si spegne. Per tarare la soglia mostra il valore di `analog read pin P0` con `show number` in luce e al buio e scegli un valore a metà.

::: tip 💡 CONSIGLIO
Il valore giusto dipende dalla luce dell'aula e dalla fotoresistenza usata: ogni gruppo può trovare la propria soglia.
:::