---
title: 18-Il motore in corrente continua e il transistor (Arduino)
description: 'Pilotiamo un motorino DC con un transistor e un diodo di protezione, senza collegarlo direttamente ad Arduino.'
draft: false
date: 2026-11-06
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-motore.webp
---

# 18-Il motore in corrente continua e il transistor (Arduino)

**Obiettivo:** Comandare un **motore DC** usando un **transistor** come interruttore, con un **diodo** di protezione, e regolarne la velocità con il PWM.

**Concetti Chiave:**
- Perché un pin di Arduino non può alimentare un motore
- Il transistor come interruttore
- Diodo di ricircolo (flyback)
- Velocità con `analogWrite()`

## Fase 1: Teoria 🧠

Un pin di Arduino può dare al massimo circa **20-40 mA**, mentre un motorino ne richiede anche 200-500. Collegarlo direttamente può **danneggiare la scheda**. Serve un componente intermedio: il **transistor**, che funziona da **interruttore comandato**: una piccola corrente sul pin **Base** permette il passaggio di una corrente molto più grande tra **Collettore** ed **Emettitore**.

Quando il motore si spegne genera un picco di tensione inverso. Per proteggere il transistor si mette un **diodo** (1N4007) in parallelo al motore, con la **striscia** (catodo) verso il positivo.

- **Domanda alla classe:** *"Perché secondo voi un motore, quando lo spegniamo, genera una tensione che può danneggiare il circuito?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Motorino DC** da 3-6 V
* 1x **Transistor NPN** (2N2222 o PN2222)
* 1x **Resistore da 1 kΩ** (base)
* 1x **Diodo 1N4007**
* Cavi jumper

#### Cablaggio
1. Pin Arduino **9** → resistore **1 kΩ** → **Base** del transistor.
2. **Emettitore** del transistor → **GND**.
3. **Collettore** → un filo del motore. L'altro filo del motore → **5V**.
4. **Diodo** in parallelo al motore: striscia (catodo) verso **5V**, l'altro verso il collettore.

<center>
	<img src="/img/robotica/base-arduino-motore-cablaggio.webp" alt="motore DC pilotato da un transistor NPN con diodo di protezione sul pin 9 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
L'ordine dei piedini del transistor cambia da modello a modello (ad esempio PN2222: E-B-C, BC547: C-B-E, guardando il lato piatto): controlla sempre il datasheet. Se usi una batteria esterna, il suo negativo va collegato al **GND di Arduino**.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> motore acceso a piena velocità, pausa, spento, poi aumenta gradualmente la velocità con il PWM

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(9, OUTPUT);` | Il pin 9 pilota la base del transistor |
| `loop()` | `analogWrite(9, 255);` | Velocità massima |
| `loop()` | `analogWrite(9, 128);` | Circa metà velocità |
| `loop()` | `analogWrite(9, 0);` | Motore fermo |

```cpp
const int pinMotore = 9;

void setup() {
  pinMode(pinMotore, OUTPUT);
}

void loop() {
  analogWrite(pinMotore, 255);   // massima velocità
  delay(2000);
  analogWrite(pinMotore, 0);     // fermo
  delay(1000);

  for (int v = 0; v <= 255; v += 5) {   // accelera gradualmente
    analogWrite(pinMotore, v);
    delay(50);
  }
  analogWrite(pinMotore, 0);
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Il motore gira, si ferma e poi accelera gradualmente. Se non parte con valori bassi di PWM è normale: sotto una certa soglia il motore non ha abbastanza forza per partire.

::: tip 💡 CONSIGLIO
Fai ipotizzare alla classe cosa succederebbe togliendo il diodo, e discuti perché in questa lezione non lo si fa mai senza protezione.
:::

::: info ℹ️ PER ANDARE OLTRE
Questo circuito fa girare il motore in **un solo verso**. Per invertirlo serve un **ponte H**, tema della prossima lezione.
:::
