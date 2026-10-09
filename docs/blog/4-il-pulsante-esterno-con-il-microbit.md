---
title: 4-Il pulsante esterno con il micro:bit
description: 'Leggiamo un pulsante esterno con un pin del micro:bit e il pull-up interno, e lo usiamo per accendere un LED.'
draft: false
date: 2026-10-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-pulsante-cablaggio.webp
---

# 4-Il pulsante esterno con il micro:bit

**Obiettivo:** Leggere un **pulsante esterno** con un ingresso digitale e usarlo per accendere un LED, sfruttando il **pull-up** interno del micro:bit.

**Concetti Chiave:**
- Ingresso digitale
- Pull-up: pin alto quando il pulsante non è premuto
- Logica inversa: premuto = 0
- Condizione se / altrimenti

## Fase 1: Teoria 🧠

Un pin lasciato scollegato è **fluttuante** e legge valori casuali. Il micro:bit ha dentro un **pull-up** attivabile via software: tiene il pin a livello alto (1) quando non è collegato a niente.

Se mettiamo il pulsante tra il pin e **GND**, quando lo premiamo il pin viene portato a **0**. La logica è **inversa**: **premuto = 0**, rilasciato = 1.

- **Domanda alla classe:** *"Perché non serve una resistenza esterna da 10 kΩ come con Arduino?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Pulsante** a 4 zampe
* 1x **LED** + 1x **resistore da 330 Ω**
* Cavi jumper

#### Cablaggio
1. Pulsante a cavallo dell'incavo della breadboard: un lato → pin **P1**, l'altro lato → **GND**.
2. LED: **P0** → resistore 330 Ω → anodo, catodo → **GND**.

<center>
	<img src="/img/robotica/base-microbit-pulsante-cablaggio.webp" alt="pulsante tra P1 e GND e LED con resistenza su P0 del micro:bit" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> attiva il pull-up su P1
- *Per sempre* -> se P1 legge 0 accendi P0, altrimenti spegnilo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Pins | `set pull pin P1 to up` | Attiva il pull-up interno | Dentro "all'avvio" |
| Logic | `se ... allora ... altrimenti` | Sceglie cosa fare | Dentro "per sempre" |
| Pins | `digital read pin P1 = 0` | Vero quando il pulsante è premuto | Nella condizione |
| Pins | `digital write pin P0 to 1 / 0` | Accende o spegne il LED | Nei due rami |

<center>
	<img src="/img/robotica/base-microbit-pulsante-blocchi.webp" alt="blocchi MakeCode che leggono il pulsante su P1 e accendono il LED su P0" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

pin1.set_pull(pin1.PULL_UP)

while True:
    if pin1.read_digital() == 0:
        pin0.write_digital(1)
    else:
        pin0.write_digital(0)
```

## Fase 5: Verifica 🔍

Premi il pulsante: il LED si accende e si spegne quando lo rilasci. Se è sempre acceso o sempre spento controlla il collegamento a GND del pulsante.

::: tip 💡 CONSIGLIO
Sfida: aggiungi anche un messaggio sul display del micro:bit, ad esempio una icona felice quando il pulsante è premuto.
:::