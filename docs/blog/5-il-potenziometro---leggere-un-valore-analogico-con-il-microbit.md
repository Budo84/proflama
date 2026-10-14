---
title: 5-Il potenziometro - leggere un valore analogico con il micro:bit
description: 'Leggiamo un potenziometro con un ingresso analogico del micro:bit e mostriamo il valore sulla matrice LED.'
draft: false
date: 2026-10-14
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-potenziometro.webp
---

# 5-Il potenziometro - leggere un valore analogico con il micro:bit


**Obiettivo:** Leggere un **potenziometro** con un ingresso analogico e visualizzarne il valore sul display del micro:bit.

**Concetti Chiave:**
- Ingresso analogico: valori da 0 a 1023
- Partitore di tensione
- Grafico a barre sulla matrice LED
- Pin analogici P0, P1, P2

## Fase 1: Teoria 🧠

Il **potenziometro** è un resistore variabile con tre pin. Collegando gli estremi a **3V** e **GND**, il cursore centrale fornisce una tensione da **0 V a 3 V** secondo la posizione della manopola.

Il micro:bit misura la tensione con un **convertitore analogico-digitale**: il blocco `analog read pin P0` restituisce un numero da **0** (0 V) a **1023** (3 V). I pin analogici sono **P0, P1, P2**.

- **Domanda alla classe:** *"Che differenza c'è tra un ingresso digitale e uno analogico?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Potenziometro da 10 kΩ**
* Cavi jumper

#### Cablaggio
1. Pin esterno sinistro → **GND**.
2. Pin esterno destro → **3V**.
3. Pin **centrale** (cursore) → **P0**.

<center>
	<img src="/img/robotica/base-microbit-potenziometro-cablaggio.webp" alt="potenziometro con cursore collegato a P0 del micro:bit" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> leggi P0 e mostra il valore come grafico a barre (massimo 1023)

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Loop | `per sempre` | Ripete la lettura | Contenitore principale |
| Pins | `analog read pin P0` | Legge un valore da 0 a 1023 | Dentro il blocco grafico |
| LED | `plot bar graph of ... up to 1023` | Disegna una barra sulla matrice | Dentro "per sempre" |

<center>
	<img src="/img/robotica/base-microbit-potenziometro-blocchi.webp" alt="blocchi MakeCode che mostrano la lettura analogica di P0 come grafico a barre" width="400"/>
</center>

**Codice Python equivalente (mostra il numero)**

```python
from microbit import *

while True:
    valore = pin0.read_analog()
    display.scroll(valore, delay=60, wait=False)
    sleep(300)
```

## Fase 5: Verifica 🔍

Ruotando la manopola il grafico a barre cresce e cala. Con il Python vedi scorrere il numero. Quando la manopola è tutta a sinistra deve leggere circa 0, tutta a destra circa 1023.

::: tip 💡 CONSIGLIO
Se vuoi che la manopola controlli la luminosità di un LED su P1, collega il LED con la sua resistenza e usa `analog write pin P1 to (analog read pin P0)`.
:::