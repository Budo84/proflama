---
title: 10-Il potenziometro e l'ingresso analogico (Arduino)
description: 'Leggiamo il valore di un potenziometro con analogRead e lo usiamo per regolare la luminosità di un LED.'
draft: false
date: 2026-11-05
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-potenziometro.webp
---

# 10-Il potenziometro e l'ingresso analogico (Arduino)

**Obiettivo:** Leggere un **ingresso analogico** con un potenziometro e usare il valore per controllare la luminosità di un LED.

**Concetti Chiave:**
- Partitore di tensione
- Ingresso analogico: `analogRead()` restituisce da 0 a 1023
- Funzione `map()` per cambiare scala
- Monitor seriale per vedere i valori

## Fase 1: Teoria 🧠

Il **potenziometro** è un resistore variabile con tre pin: due estremi e un cursore centrale. Collegando gli estremi a 5V e GND, il cursore dà una tensione che va da **0 V a 5 V** secondo la posizione della manopola.

Arduino misura questa tensione con il **convertitore analogico-digitale** (10 bit): `analogRead()` restituisce un numero da **0** (0 V) a **1023** (5 V). Gli ingressi analogici sono i pin **A0-A5**.

Per usare il valore come luminosità (PWM, da 0 a 255) serve cambiare scala: lo fa `map(valore, 0, 1023, 0, 255)`.

- **Domanda alla classe:** *"Perché i numeri vanno da 0 a 1023 e non da 0 a 1000?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Potenziometro da 10 kΩ**
* 1x **LED** + 1x **resistore da 220 Ω**
* Cavi jumper maschio-maschio

#### Cablaggio
1. Pin esterno sinistro del potenziometro → **GND**.
2. Pin esterno destro → **5V**.
3. Pin **centrale** (cursore) → **A0**.
4. LED: pin **9** (pin PWM) → resistore 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-potenziometro-cablaggio.webp" alt="potenziometro collegato ad A0 e LED sul pin 9 di Arduino" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> avvia il monitor seriale, pin 9 come uscita
- *Per sempre* -> leggi A0, trasformalo da 0-1023 a 0-255, usalo per la luminosità del LED e stampalo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `Serial.begin(9600);` | Avvia la comunicazione con il computer |
| `loop()` | `analogRead(A0)` | Legge un valore da 0 a 1023 |
| `loop()` | `map(v, 0, 1023, 0, 255)` | Cambia la scala del valore |
| `loop()` | `analogWrite(9, luce);` | Regola la luminosità del LED |

```cpp
const int pinPot = A0;
const int pinLed = 9;

void setup() {
  pinMode(pinLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int valore = analogRead(pinPot);
  int luce = map(valore, 0, 1023, 0, 255);
  analogWrite(pinLed, luce);
  Serial.println(valore);
  delay(50);
}
```

## Fase 5: Verifica 🔍

Ruotando la manopola il LED passa da spento a tutta luce. Apri il **Monitor seriale** (lente in alto a destra nell'IDE, 9600 baud) e osserva i numeri tra 0 e 1023.

::: tip 💡 CONSIGLIO
Se la luce cambia al contrario di come ti aspetti, hai scambiato i due pin esterni del potenziometro: invertili oppure usa `map(valore, 0, 1023, 255, 0)`.
:::

::: info ℹ️ PER ANDARE OLTRE
Lo stesso schema (cursore su un ingresso analogico) serve per il **joystick**, la **fotoresistenza** e molti altri sensori.
:::


<center>
	<img src="/img/robotica/base-arduino-potenziometro.webp" alt="base-arduino-potenziometro.webp" width="300"/>
</center>


<center>
	<img src="/img/robotica/base-arduino-potenziometro-cablaggio.webp" alt="base-arduino-potenziometro-cablaggio.webp" width="300"/>
</center>
