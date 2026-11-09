---
title: '5-Il sensore PIR - rilevare il movimento (micro:bit)'
description: 'Rileviamo il passaggio di una persona con il sensore PIR e lo segnaliamo sul display del micro:bit.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-pir.webp
---

# 5-Il sensore PIR - rilevare il movimento (micro:bit)

**Obiettivo:** Usare un sensore **PIR** per rilevare il movimento di una persona e segnalarlo con un'icona sul micro:bit.

**Concetti Chiave:**
- Raggi infrarossi emessi dai corpi caldi
- Sensore digitale: movimento sì / no
- Tempo di calibrazione del sensore
- Alimentazione separata a 4,5 V

## Fase 1: Teoria 🧠

Il sensore **PIR** (HC-SR501) rileva i cambiamenti di **calore** davanti a sé: quando una persona si muove, l'uscita **OUT** passa a livello alto (circa 3,3 V). Non rileva chi sta fermo.

Il modulo ha bisogno di almeno **4,5 V** per funzionare, quindi lo alimentiamo con una **batteria esterna**, mentre il segnale OUT, a 3,3 V, può essere letto tranquillamente dal micro:bit. Appena acceso richiede **30-60 secondi** di calibrazione.

- **Domanda alla classe:** *"Perché una persona ferma davanti al sensore non viene rilevata?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Sensore PIR HC-SR501**
* 1x **Pacco batterie** 3 × AA (4,5 V) o 4 × AA (6 V) con interruttore
* Cavi jumper

#### Cablaggio
1. **VCC** del PIR → **positivo** della batteria (4,5 V).
2. **GND** → **GND** del micro:bit e **negativo** della batteria.
3. **OUT** → pin **P0**.

<center>
	<img src="/img/robotica/base-microbit-pir-cablaggio.webp" alt="sensore PIR alimentato da batteria con uscita collegata a P0 del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Il **negativo** della batteria va sempre collegato anche al pin **GND** del micro:bit: tutti i componenti devono avere la massa in comune.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> mostra un'attesa e aspetta 30 secondi per la calibrazione
- *Per sempre* -> se P0 è alto mostra un'icona di allarme, altrimenti cancella lo schermo

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Basic | `all'avvio` + `pause (ms) 30000` | Attesa di calibrazione | Contenitore principale |
| Loop | `per sempre` | Ripete il controllo | Contenitore principale |
| Logic | `se digital read pin P0 = 1 allora` | Movimento rilevato | Dentro "per sempre" |
| Basic | `show icon` / `clear screen` | Segnala o cancella | Nei due rami |

<center>
	<img src="/img/robotica/base-microbit-pir-blocchi.webp" alt="blocchi MakeCode che mostrano un'icona quando il pin P0 del PIR è alto" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

display.scroll("...", wait=False)
sleep(30000)   # calibrazione del PIR
display.clear()

while True:
    if pin0.read_digital() == 1:
        display.show(Image.SURPRISED)
    else:
        display.clear()
    sleep(100)
```

## Fase 5: Verifica 🔍

Dopo l'attesa, agita una mano davanti al sensore: compare l'icona e resta per il tempo impostato dal trimmer del modulo. Poi lo schermo si cancella.

::: tip 💡 CONSIGLIO
Gira i due trimmer sul retro del PIR (sensibilità e durata) e misura a che distanza rileva una persona che cammina.
:::
