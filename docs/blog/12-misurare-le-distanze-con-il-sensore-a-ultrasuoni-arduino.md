---
title: 12-Misurare le distanze con il sensore a ultrasuoni (Arduino)
description: 'Misuriamo la distanza da un ostacolo in centimetri con il sensore HC-SR04, come fanno i sensori di parcheggio.'
draft: false
date: 2026-10-29
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-ultrasuoni.webp
---

# 12-Misurare le distanze con il sensore a ultrasuoni (Arduino)


**Obiettivo:** Misurare una **distanza in centimetri** con il sensore **HC-SR04** e costruire un semplice allarme di prossimità.

**Concetti Chiave:**
- Onde sonore e tempo di volo
- Pin Trig ed Echo
- Funzione `pulseIn()`
- Formula: distanza = tempo × velocità ÷ 2

## Fase 1: Teoria 🧠

Il sensore **HC-SR04** emette un impulso di **ultrasuoni** (che non sentiamo) e misura il tempo che l'eco impiega a tornare indietro dopo aver colpito un ostacolo.

Poiché il suono viaggia a circa **340 m/s** (0,034 cm per microsecondo), la distanza in cm è:

**distanza = tempo (µs) × 0,034 ÷ 2**

Dividiamo per 2 perché il tempo misurato comprende l'andata **e** il ritorno. Il sensore misura bene da circa **2 cm a 400 cm**.

- **Domanda alla classe:** *"Un pipistrello e un sensore di parcheggio usano lo stesso principio. Quale?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Sensore HC-SR04** (4 pin)
* 1x **LED** + 1x **resistore da 220 Ω**
* Cavi jumper

#### Cablaggio
1. **VCC** → **5V**.
2. **Trig** → pin **9**.
3. **Echo** → pin **10**.
4. **GND** → **GND**.
5. LED: pin **8** → 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-ultrasuoni-cablaggio.webp" alt="sensore HC-SR04 con Trig sul pin 9 ed Echo sul pin 10 di Arduino" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> manda un impulso da 10 µs su Trig, misura la durata dell'eco, calcola la distanza, se è meno di 20 cm accendi il LED

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `loop()` | `digitalWrite(trig, HIGH);` | Invia l'impulso per 10 microsecondi |
| `loop()` | `pulseIn(echo, HIGH);` | Misura quanto dura l'eco, in microsecondi |
| `loop()` | `durata * 0.034 / 2` | Converte in centimetri |

```cpp
const int trig = 9;
const int echo = 10;
const int pinLed = 8;

void setup() {
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(pinLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  long durata = pulseIn(echo, HIGH);
  float distanza = durata * 0.034 / 2;

  Serial.print(distanza);
  Serial.println(" cm");

  if (distanza < 20) {
    digitalWrite(pinLed, HIGH);
  } else {
    digitalWrite(pinLed, LOW);
  }
  delay(100);
}
```

## Fase 5: Verifica 🔍

Avvicina e allontana una mano o un libro: nel monitor seriale la distanza cambia e sotto i 20 cm il LED si accende. Prova con un oggetto morbido (stoffa): assorbe il suono e la misura è meno precisa.

::: tip 💡 CONSIGLIO
Fai misurare una distanza nota con un metro (50 cm) e confronta il risultato del sensore: quanto è preciso?
:::

::: info ℹ️ PER ANDARE OLTRE
Aggiungendo un buzzer attivo (lezione sul buzzer) in parallelo al LED si ottiene un sensore di parcheggio.
:::