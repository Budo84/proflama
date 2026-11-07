---
title: "8-Il buzzer passivo - note e melodie (micro:bit)"
description: 'Colleghiamo un buzzer passivo al micro:bit e facciamo suonare note e una semplice melodia.'
draft: false
date: 2026-11-07
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-buzzer.webp
---

# 8-Il buzzer passivo - note e melodie (micro:bit)

**Obiettivo:** Collegare un **buzzer passivo** al micro:bit e far suonare **note e melodie** con i blocchi musicali.

**Concetti Chiave:**
- Frequenza e nota musicale
- Buzzer passivo e buzzer attivo
- Blocchi Music di MakeCode
- Pin P0 come uscita audio

## Fase 1: Teoria 🧠

Il **buzzer passivo** suona la nota di cui gli forniamo la **frequenza**. Il micro:bit ha dei blocchi musicali che mandano il segnale sul pin **P0** (di default).

Il **buzzer attivo** invece contiene un oscillatore e suona sempre la stessa nota quando riceve corrente: con quello basta `digital write`, come per un LED.

Sul **micro:bit V2** c'è anche un altoparlante integrato: per sentire solo il buzzer esterno si può disattivare con il blocco `set built-in speaker off`.

- **Domanda alla classe:** *"Come potremmo capire se un buzzer è attivo o passivo senza leggere la confezione?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Buzzer passivo**
* Cavi jumper

#### Cablaggio
1. **+** del buzzer (gamba più lunga o marcata) → **P0**.
2. L'altra gamba → **GND**.

<center>
	<img src="/img/robotica/base-microbit-buzzer-cablaggio.webp" alt="buzzer passivo collegato a P0 e GND del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se usi un buzzer attivo collegalo allo stesso modo ma usa `digital write pin P0 to 1`: una nota fissa, senza melodia.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Quando premi A* -> suona Do, Re, Mi, Fa, Sol
- *Quando premi B* -> suona una melodia a scelta

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Input | `quando il pulsante A è premuto` | Avvia la sequenza | Contenitore principale |
| Music | `play tone Middle C for 1 beat` | Suona una nota | Dentro il blocco evento |
| Music | `set built-in speaker off` | Spegne l'altoparlante interno della V2 | All'avvio |

<center>
	<img src="/img/robotica/base-microbit-buzzer-blocchi.webp" alt="blocchi MakeCode che suonano cinque note quando si preme il pulsante A" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *
import music

# su micro:bit V2: speaker.off() spegne l'altoparlante interno
while True:
    if button_a.was_pressed():
        for nota in [262, 294, 330, 349, 392]:   # Do, Re, Mi, Fa, Sol
            music.pitch(nota, 400, pin0)
            sleep(100)
```

## Fase 5: Verifica 🔍

Premi A: senti cinque note che salgono. Se non senti niente controlla il verso del buzzer e che il blocco musicale usi il pin P0.

::: tip 💡 CONSIGLIO
Fai comporre alla classe una breve melodia (ad esempio le prime note di una canzone nota) e inseriscila in un secondo evento sul pulsante B.
:::
