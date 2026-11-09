---
title: "9-Il sensore di umidità del terreno - il vaso intelligente (micro:bit)"
description: ''
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-umidita.webp
---

# 9-Il sensore di umidità del terreno - il vaso intelligente (micro:bit)

**Obiettivo:** Misurare l'**umidità del terreno** con un sensore analogico e segnalare sul display se la pianta ha **sete**.

**Concetti Chiave:**
- Sensore resistivo: più acqua, più conduce
- Lettura analogica e taratura (secco / bagnato)
- Conversione in percentuale con `map`
- Durata dei sensori resistivi

## Fase 1: Teoria 🧠

Il sensore di umidità ha due sonde da infilare nella terra. L'acqua nel terreno **conduce la corrente**: più il terreno è bagnato, meno resistenza c'è tra le sonde.

Il modulo ha tre pin: **VCC**, **GND** e **AO** (uscita analogica). Nella maggior parte dei sensori il valore **scende** quando la terra è più umida. Cambia da sensore a sensore (e con la tensione di alimentazione), quindi bisogna **tararlo**: leggere il valore in aria (secco) e in un bicchiere d'acqua (bagnato).

Le sonde resistive si **corrodono** perché la corrente passa nell'acqua: conviene tenerle alimentate solo quando serve.

- **Domanda alla classe:** *"Perché un sensore fatto di metallo, lasciato sempre acceso nella terra bagnata, dura poco?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Modulo sensore di umidità del terreno**
* Cavi jumper
* Un vaso con della terra e un bicchiere d'acqua

#### Cablaggio
1. **VCC** → **3V**.
2. **GND** → **GND**.
3. **AO** → **P0**.

<center>
	<img src="/img/robotica/base-microbit-umidita-cablaggio.webp" alt="sensore di umidità del terreno con VCC a 3V, AO su P0 e GND del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non immergere in acqua la parte elettronica: devono stare nella terra solo le due piste. Per far durare le sonde scollega il filo **VCC** quando non misuri, oppure usa un sensore **capacitivo**, che non si corrode.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> leggi P0, converti in percentuale, mostra una barra; se è sotto il 30% mostra un'icona triste, altrimenti felice

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Loop | `per sempre` | Ripete la misura | Contenitore principale |
| Variables | `imposta umidita a (map (analog read pin P0) from SECCO to BAGNATO … 0 to 100)` | Converte in percentuale | Dentro "per sempre" |
| Logic | `se umidita < 30 allora` | Terra troppo asciutta | Dopo il calcolo |
| Basic | `show icon` | Triste se asciutta, felice se bagnata | Nei due rami |

<center>
	<img src="/img/robotica/base-microbit-umidita-blocchi.webp" alt="blocchi MakeCode che convertono la lettura di P0 in percentuale di umidità e mostrano un'icona" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

SECCO = 800     # lettura in aria / terra secca (da tarare)
BAGNATO = 350   # lettura nell'acqua (da tarare)

while True:
    lettura = pin0.read_analog()
    umidita = (lettura - SECCO) * 100 / (BAGNATO - SECCO)
    umidita = max(0, min(100, umidita))
    if umidita < 30:
        display.show(Image.SAD)
    else:
        display.show(Image.HAPPY)
    sleep(2000)
```

## Fase 5: Verifica 🔍

Prima **tara** il sensore: mostra `analog read pin P0` con le sonde in aria e poi in un bicchiere d'acqua, e aggiorna `SECCO` e `BAGNATO`. Poi infilalo in un vaso: l'icona triste compare quando la terra è asciutta e passa a quella felice dopo l'annaffiatura.

::: tip 💡 CONSIGLIO
Mettete a confronto due vasi con terra più o meno bagnata e disegnate un grafico delle letture nel tempo.
:::
