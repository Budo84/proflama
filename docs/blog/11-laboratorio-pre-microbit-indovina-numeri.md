---
title: 1-La breadboard e la legge di Ohm (Arduino)
description: 'Impariamo a usare la breadboard e scopriamo con il multimetro come si legano tensione, corrente e resistenza.'
draft: false
date: 2026-10-07
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/breadboard.png
---

# 1-La breadboard e la legge di Ohm (Arduino)

**Obiettivo:** Montare un circuito sulla **breadboard** senza saldature e capire il legame tra **tensione, corrente e resistenza** (legge di Ohm).

**Concetti Chiave:**
- Come sono collegati i fori di una breadboard (righe e binari di alimentazione)
- Tensione (V), corrente (A), resistenza (Ω)
- Legge di Ohm: V = R × I
- Leggere il valore di un resistore dalle fasce colorate

## Fase 1: Teoria 🧠

La **breadboard** (basetta sperimentale) permette di montare i circuiti infilando i componenti nei fori, senza saldare. Dentro la basetta alcuni fori sono collegati tra loro da lamelle metalliche:

- le **righe** (di solito 5 fori in verticale, indicati con a-b-c-d-e e f-g-h-i-j) sono collegate tra loro;
- le due righe esterne (con i segni **+** e **-**) sono i **binari di alimentazione**, collegati per tutta la lunghezza;
- tra le due metà c'è un **incavo centrale** che le separa: i chip e i pulsanti si montano a cavallo.

La **tensione** (Volt) è la "spinta" che muove le cariche, la **corrente** (Ampere) è quante cariche passano, la **resistenza** (Ohm, Ω) è quanto il componente si oppone al passaggio. Le tre grandezze sono legate dalla **legge di Ohm**: V = R × I.

- **Domanda alla classe:** *"Se la tensione resta uguale e raddoppio la resistenza, cosa succede alla corrente?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno** + cavo USB
* 1x **Breadboard**
* 1x Multimetro digitale
* 3x **Resistori** da 220 Ω, 1 kΩ e 10 kΩ
* Cavi jumper maschio-maschio

#### Cablaggio
1. Collega il pin **5V** di Arduino al binario **+** della breadboard e il pin **GND** al binario **-**.
2. Infila il resistore da 220 Ω tra il binario **+** e una riga libera, poi collega la stessa riga al binario **-** con un cavo.
3. Con il multimetro in modalità **tensione continua (V⎓)** misura la tensione ai capi del resistore: dovresti leggere circa 5 V.
4. Ripeti con il resistore da 1 kΩ e da 10 kΩ.

<center>
	<img src="/img/robotica/base-arduino-breadboard-cablaggio.webp" alt="breadboard con resistore collegato ai binari 5V e GND di Arduino" width="300"/>
</center>
<center>
" alt="breadboard con resistore collegato ai binari 5V e GND di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non collegare mai direttamente il binario **+** al binario **-** con un cavo: si crea un cortocircuito e Arduino può spegnersi o danneggiarsi.
:::

## Fase 3: Calcolo 📝

Con la legge di Ohm possiamo **prevedere** la corrente prima di misurarla. Con 5 V:

| Resistore | Formula | Corrente prevista |
|---|---|---|
| 220 Ω | I = 5 ÷ 220 | circa **23 mA** |
| 1 kΩ (1000 Ω) | I = 5 ÷ 1000 | **5 mA** |
| 10 kΩ (10000 Ω) | I = 5 ÷ 10000 | **0,5 mA** |

Per il multimetro: per misurare la **corrente** va inserito *in serie* nel circuito (modalità mA), mentre la **tensione** si misura *in parallelo* al componente.

## Fase 4: Lettura dei resistori 🎨

Le fasce colorate sul corpo del resistore indicano il valore. Le prime due fasce sono le cifre, la terza è il moltiplicatore.

| Colore | Cifra | Moltiplicatore |
|---|---|---|
| Nero | 0 | ×1 |
| Marrone | 1 | ×10 |
| Rosso | 2 | ×100 |
| Arancio | 3 | ×1 000 |
| Giallo | 4 | ×10 000 |
| Verde | 5 | ×100 000 |

**Esempi:** rosso-rosso-marrone = 22 × 10 = **220 Ω**; marrone-nero-rosso = 10 × 100 = **1 kΩ**; marrone-nero-arancio = 10 × 1 000 = **10 kΩ**.

## Fase 5: Verifica 🔍

Confronta la corrente che hai calcolato con quella misurata con il multimetro in serie (modalità mA). I valori sono vicini? Le piccole differenze dipendono dalla tolleranza del resistore (di solito ±5%, ultima fascia dorata) e dalla precisione dello strumento.