---
title: 3-Il LED, la resistenza e il verso giusto (Arduino)
description: 'Accendiamo un LED classico con anodo e catodo, calcolando la resistenza che lo protegge dal bruciarsi.'
draft: false
date: 2026-10-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-led-cablaggio.webp
---

# 3-Il LED, la resistenza e il verso giusto (Arduino)

**Obiettivo:** Collegare un **LED** nel verso corretto (anodo e catodo), calcolare la **resistenza di protezione** e farlo lampeggiare con Arduino.

**Concetti Chiave:**
- Il LED è un diodo: la corrente passa in un solo verso
- Anodo (+, gamba lunga) e catodo (-, gamba corta)
- Resistenza in serie per limitare la corrente
- Uscita digitale: HIGH / LOW

## Fase 1: Teoria 🧠

Il **LED** (Light Emitting Diode) è un componente che emette luce quando è attraversato da corrente, ma solo in **un verso**:

- **Anodo (+)**: la gamba più **lunga**. Va verso il positivo.
- **Catodo (-)**: la gamba più **corta**, dal lato in cui il bordo plastico è **smussato**. Va verso GND.

Un LED non limita da solo la corrente: se lo colleghiamo direttamente a 5 V, ne passa troppa e si **brucia** in un istante. Serve una **resistenza in serie**. Per calcolarla:

**R = (V alimentazione - V del LED) ÷ I desiderata**

Un LED rosso ha una caduta di circa 2 V e lavora bene con 10-15 mA. Con Arduino a 5 V: R = (5 - 2) ÷ 0,015 = 200 Ω. Si sceglie il valore commerciale più vicino per eccesso: **220 Ω**.

- **Domanda alla classe:** *"Cosa succede alla luminosità se al posto di 220 Ω metto un resistore da 1 kΩ? E se lo tolgo del tutto?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **LED** rosso da 5 mm
* 1x **Resistore da 220 Ω** (rosso-rosso-marrone)
* 2x Cavi jumper maschio-maschio

#### Cablaggio
1. Collega il pin digitale **8** di Arduino a una riga della breadboard.
2. Sulla stessa riga infila un'estremità del resistore da 220 Ω.
3. L'altra estremità del resistore va sulla riga dove inserisci l'**anodo** (gamba lunga) del LED.
4. Il **catodo** (gamba corta) del LED va sul binario **-**, collegato al pin **GND** di Arduino.

<center>
	<img src="/img/robotica/base-arduino-led-cablaggio.webp" alt="LED con resistenza da 220 ohm collegato al pin 8 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non collegare mai un LED senza resistenza, e controlla il verso: se anodo e catodo sono invertiti il LED non si accende (di solito non si rompe, ma non funziona).
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> imposta il pin 8 come uscita
- *Per sempre* -> accendi il pin 8, aspetta 1 secondo, spegni il pin 8, aspetta 1 secondo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(8, OUTPUT);` | Dichiara il pin 8 come uscita |
| `loop()` | `digitalWrite(8, HIGH);` | Manda 5 V al pin: il LED si accende |
| `loop()` | `delay(1000);` | Aspetta 1000 millisecondi |
| `loop()` | `digitalWrite(8, LOW);` | Porta il pin a 0 V: il LED si spegne |
| `loop()` | `delay(1000);` | Aspetta ancora un secondo |

```cpp
const int pinLed = 8;

void setup() {
  pinMode(pinLed, OUTPUT);
}

void loop() {
  digitalWrite(pinLed, HIGH);
  delay(1000);
  digitalWrite(pinLed, LOW);
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Carica il programma: il LED deve accendersi e spegnersi ogni secondo. Se non si accende, controlla nell'ordine: il verso del LED, che il resistore sia sulla stessa riga del cavo e dell'anodo, il pin usato nel codice.

::: tip 💡 CONSIGLIO
Prova a cambiare il resistore: con 1 kΩ il LED fa meno luce, con 100 Ω ne fa di più ma la corrente supera il valore consigliato. Qual è il compromesso migliore?
:::
<center>
	<img src="/img/robotica/base-arduino-led-cablaggio.webp" alt="base-arduino-led-cablaggio.webp" width="300"/>
</center>
