---
title: 6-Misurare le distanze con il sensore a ultrasuoni (micro:bit)
description: 'Misuriamo la distanza da un ostacolo in centimetri con il sensore HC-SR04 collegato al micro:bit.'
draft: false
date: 2026-10-15
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-ultrasuoni.webp
---

# 6-Misurare le distanze con il sensore a ultrasuoni (micro:bit)

**Obiettivo:** Misurare una **distanza in centimetri** con il sensore **HC-SR04** e mostrarla sul micro:bit, proteggendo il pin di ingresso dai 5 V del sensore.

**Concetti Chiave:**
- Onde sonore e tempo di volo
- Pin Trig ed Echo
- Partitore di tensione per abbassare i 5 V a 3 V
- Estensione MakeCode "sonar"

## Fase 1: Teoria 🧠

Il sensore **HC-SR04** emette un impulso di **ultrasuoni** e misura quanto tempo impiega l'eco a tornare. Con la velocità del suono (circa 340 m/s) si ricava la distanza: **distanza = tempo × 0,034 ÷ 2** (in cm, con il tempo in µs). Si divide per 2 perché il tempo comprende andata e ritorno.

Il sensore però funziona a **5 V** e il suo pin **Echo** restituisce un segnale a 5 V, mentre i pin del micro:bit sono pensati per **3 V**. Per proteggerli mettiamo due resistori in serie che dividono la tensione (**partitore**): 1 kΩ tra Echo e il pin del micro:bit e 2 kΩ tra quel pin e GND, così il segnale scende a circa 3,3 V.

- **Domanda alla classe:** *"Perché i due resistori del partitore devono stare tra Echo, il pin del micro:bit e GND, e non in altri punti?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Sensore HC-SR04**
* 1x **Resistore da 1 kΩ** e 1x **Resistore da 2 kΩ**
* 1x **Pacco batterie** 3 × AA (4,5 V) o 4 × AA (6 V) con interruttore
* Cavi jumper

#### Cablaggio
1. **VCC** del sensore → **positivo della batteria** (4,5 V).
2. **GND** del sensore → **GND** del micro:bit e **negativo** della batteria.
3. **Trig** → pin **P1** (il segnale a 3 V del micro:bit è sufficiente).
4. **Echo** → resistore **1 kΩ** → pin **P2**. Dallo stesso punto del pin P2 → resistore **2 kΩ** → **GND**.

<center>
	<img src="/img/robotica/base-microbit-ultrasuoni-cablaggio.webp" alt="sensore HC-SR04 con partitore di tensione sull'Echo collegato a P1 e P2 del micro:bit" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non collegare mai l'Echo direttamente al micro:bit: i 5 V possono danneggiarlo. Il **negativo** della batteria va sempre collegato anche al pin **GND** del micro:bit: tutti i componenti devono avere la massa in comune. Esistono anche sensori **HC-SR04P** che lavorano a 3,3 V e non richiedono il partitore.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> misura la distanza con il sonar e mostrala sul display; sotto i 20 cm mostra un'icona di allarme

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Estensioni | `sonar` | Aggiunge i blocchi per l'HC-SR04: cerca "sonar" nella ricerca pacchetti | Prima di iniziare |
| Loop | `per sempre` | Ripete la misura | Contenitore principale |
| Sonar | `ping trig P1 echo P2 unit cm` | Restituisce la distanza in centimetri | Dentro "show number" |
| Basic | `show number` | Mostra il valore | Dentro "per sempre" |
| Logic | `se distanza < 20 allora` | Allarme di vicinanza | Dopo la misura |

<center>
	<img src="/img/robotica/base-microbit-ultrasuoni-blocchi.webp" alt="blocchi MakeCode che misurano con il sonar su P1 e P2 e mostrano la distanza" width="400"/>
</center>

**Codice Python equivalente (richiede micro:bit V2; su V1 usa i blocchi MakeCode)**

```python
from microbit import *
import machine

pinTrig = pin1
pinEcho = pin2

while True:
    pinTrig.write_digital(0)
    sleep(1)
    pinTrig.write_digital(1)
    sleep(1)
    pinTrig.write_digital(0)
    durata = machine.time_pulse_us(pinEcho, 1)
    if durata > 0:
        distanza_cm = durata * 0.034 / 2
        display.scroll(str(round(distanza_cm)), delay=80, wait=False)
    sleep(300)
```

## Fase 5: Verifica 🔍

Avvicina e allontana una mano davanti al sensore: il numero cambia. Se legge sempre 0 o un valore enorme controlla il partitore su Echo e la massa in comune con la batteria.

::: tip 💡 CONSIGLIO
Fai misurare con un metro una distanza nota (50 cm) e confrontala con il sensore: quanto è preciso? Un oggetto morbido (stoffa) assorbe il suono e peggiora la misura.
:::