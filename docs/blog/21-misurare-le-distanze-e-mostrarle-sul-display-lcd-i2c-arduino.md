---
title: 21-Misurare le distanze e mostrarle sul display LCD I2C (Arduino)
description: 'Misuriamo la distanza con il sensore a ultrasuoni HC-SR04 e la mostriamo su un display LCD 16x2 I2C e sul monitor seriale: un metro elettronico che funziona anche senza computer.'
draft: false
date: 2026-11-25
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-23-ultrasuoni-lcd-i2c.webp
---

# 21-Misurare le distanze e mostrarle sul display LCD I2C (Arduino)

**Obiettivo:** Costruire un **metro elettronico**: il sensore **HC-SR04** misura la distanza in centimetri e Arduino la scrive sia sul **monitor seriale** sia su un **display LCD 16x2 I2C**.

**Concetti Chiave:**
- Tempo di volo degli ultrasuoni e funzione `pulseIn()`
- Comunicazione I2C: SDA e SCL
- Libreria **LiquidCrystal I2C**
- Scrivere un numero con i decimali e cancellare le cifre vecchie

## Fase 1: Teoria 🧠

Questa lezione unisce due componenti che conosciamo già: il **sensore a ultrasuoni** (lezione 11) e il **display LCD I2C** (lezione 14).

Il sensore **HC-SR04** manda un impulso di ultrasuoni e misura quanto tempo impiega l'eco a tornare. Il suono viaggia a circa **343 m/s**, cioè **0,0343 cm ogni microsecondo**, quindi:

**distanza (cm) = tempo (µs) × 0,0343 ÷ 2**

Si divide per 2 perché il tempo comprende l'andata **e** il ritorno.

Il **display** usa il bus **I2C**: bastano due fili dati, **SDA (A4)** e **SCL (A5)**, più l'alimentazione. Ogni volta che il numero diventa più corto (per esempio da 100,5 a 9,8) le cifre vecchie resterebbero sul display: per questo dopo il numero scriviamo qualche **spazio**, che le cancella.

- **Domanda alla classe:** *"Perché un progetto che mostra i dati su un display è più utile di uno che li manda solo al computer?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Sensore HC-SR04**
* 1x **Display LCD 1602 con modulo I2C**
* 1x **Breadboard**
* Cavi jumper maschio-maschio e maschio-femmina

#### Cablaggio
**Sensore HC-SR04**
1. **VCC** → **5V**.
2. **Trig** → pin **9**.
3. **Echo** → pin **10**.
4. **GND** → **GND**.

**Display LCD I2C**
5. **GND** → **GND**.
6. **VCC** → **5V**.
7. **SDA** → **A4**.
8. **SCL** → **A5**.

Usa le due linee laterali della breadboard per portare **5V** e **GND** a entrambi i componenti.

<center>
	<img src="/img/robotica/base-arduino-23-ultrasuoni-lcd-i2c-cablaggio.webp" alt="Arduino Uno con HC-SR04 su D9 e D10 e display LCD I2C su A4 e A5" width="300"/>
</center>

::: tip 💡 CONSIGLIO
Il circuito è già pronto nel **Generatore circuiti**: apri gli esempi e scegli «Ultrasuoni e display LCD I2C». Nella scheda **Codice** trovi lo stesso programma di questa lezione.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> avvia il monitor seriale, imposta Trig come uscita ed Echo come ingresso, accendi il display e la retroilluminazione
- *Per sempre* -> manda un impulso di 10 µs su Trig, misura la durata dell'eco, calcola la distanza, scrivila sul monitor seriale e sul display ("Distanza:" sulla riga 1, il valore in cm sulla riga 2), aspetta 100 ms

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| inizio | `#include <LiquidCrystal_I2C.h>` | Carica la libreria del display |
| inizio | `LiquidCrystal_I2C lcd(0x27, 16, 2);` | Display all'indirizzo 0x27, 16 colonne e 2 righe |
| `setup()` | `lcd.init(); lcd.backlight();` | Avvia il display e accende la luce |
| `loop()` | `pulseIn(PIN_ECHO, HIGH, 30000);` | Misura l'eco in µs (si ferma dopo 30 ms se non torna nulla) |
| `loop()` | `durata * 0.0343 / 2` | Converte il tempo in centimetri |
| `loop()` | `lcd.print(cm, 1);` | Scrive la distanza con un decimale |
| `loop()` | `lcd.print(" cm   ");` | Scrive l'unità e cancella le cifre vecchie |

```cpp
// Arduino Uno con sensore a ultrasuoni e display LCD

#include <Wire.h>
#include <LiquidCrystal_I2C.h>   // libreria «LiquidCrystal I2C»: Gestione librerie

LiquidCrystal_I2C lcd(0x27, 16, 2);   // indirizzo I2C 0x27 (a volte 0x3F)

const int PIN_TRIG = 9;   // HC-SR04, Trig
const int PIN_ECHO = 10;  // HC-SR04, Echo

void setup() {
  Serial.begin(9600);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  lcd.init();
  lcd.backlight();
}

void loop() {
  // distanza con l'HC-SR04
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long durata = pulseIn(PIN_ECHO, HIGH, 30000);
  float cm = durata * 0.0343 / 2;
  Serial.print("Distanza: "); Serial.print(cm); Serial.println(" cm");
  lcd.setCursor(0, 0);
  lcd.print("Distanza:");
  lcd.setCursor(0, 1);
  lcd.print(cm, 1);
  lcd.print(" cm   ");   // gli spazi cancellano le cifre vecchie
  delay(100);
}
```

## Fase 5: Verifica 🔍

Avvicina e allontana una mano o un libro dal sensore: il valore cambia sia sul display sia nel monitor seriale (9600 baud). Se sul display vedi solo rettangoli pieni gira il trimmer del contrasto sul retro; se non compare nulla prova l'indirizzo **0x3F**. Se la distanza è sempre **0**, l'eco non è tornato entro 30 ms: controlla i fili di Trig ed Echo oppure avvicina l'oggetto (oltre circa 4 m il sensore non misura).

::: tip 💡 CONSIGLIO
Fai misurare una distanza nota con un metro (per esempio 30 cm) e confronta il risultato sul display: di quanto sbaglia?
:::

::: info ℹ️ PER ANDARE OLTRE
Aggiungi un buzzer (lezione 4) che suona sotto i 20 cm e scrivi "ATTENZIONE!" sulla prima riga del display: hai costruito un sensore di parcheggio con schermo.
:::

## Sfida in più 🏆: la misura solo quando premi il pulsante

Ora il display non mostra sempre la distanza: scrive «Premi il tasto» e mostra la misura **solo mentre tieni premuto un pulsante**, come un vero metro elettronico.

#### Cosa aggiungere al montaggio
* 1x **Pulsante**: una gamba al pin **7**, la gamba opposta a **GND**.

<center>
	<img src="/img/robotica/base-arduino-23-ultrasuoni-lcd-i2c-pulsante-cablaggio.webp" alt="Arduino Uno con HC-SR04, display LCD I2C e pulsante tra D7 e GND" width="300"/>
</center>

Non serve la resistenza: con `INPUT_PULLUP` Arduino usa quella interna, quindi il pin legge **HIGH** quando il pulsante è rilasciato e **LOW** quando è premuto.

#### Pseudocodice
- *All'avvio* -> come prima, in più imposta il pulsante con la resistenza interna e scrivi «Premi un tasto»
- *Per sempre* -> misura la distanza e mandala al monitor seriale; **se** il pulsante è premuto scrivi la distanza sul display e aspetta 1 secondo, **altrimenti** scrivi «Premi il tasto» e svuota la seconda riga

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(PIN_PULSANTE, INPUT_PULLUP);` | Pulsante con resistenza interna: premuto = LOW |
| `loop()` | `if (digitalRead(PIN_PULSANTE) == LOW)` | Controlla se il pulsante è premuto |
| `loop()` | `lcd.print("                ");` | 16 spazi: cancellano la seconda riga |

```cpp
// Misuratore di distanza HC-SR04 con LCD I2C e pulsante

#include <Wire.h>
#include <LiquidCrystal_I2C.h>   // libreria «LiquidCrystal I2C»: Gestione librerie

LiquidCrystal_I2C lcd(0x27, 16, 2);   // indirizzo I2C 0x27 (a volte 0x3F)

const int PIN_PULSANTE = 7;  // pulsante tra D7 e GND
const int PIN_TRIG = 9;      // HC-SR04, Trig
const int PIN_ECHO = 10;     // HC-SR04, Echo

void setup() {
  Serial.begin(9600);
  pinMode(PIN_PULSANTE, INPUT_PULLUP);  // premuto = LOW
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  lcd.init();
  lcd.backlight();
  lcd.print("Premi un tasto");
}

void loop() {
  // distanza con l'HC-SR04
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long durata = pulseIn(PIN_ECHO, HIGH, 30000);
  float cm = durata * 0.0343 / 2;
  Serial.print("Distanza: "); Serial.print(cm); Serial.println(" cm");

  if (digitalRead(PIN_PULSANTE) == LOW) {
    lcd.setCursor(0, 0);
    lcd.print("Distanza:      ");
    lcd.setCursor(0, 1);
    lcd.print(cm, 1);
    lcd.print(" cm   ");   // gli spazi cancellano le cifre vecchie
    delay(1000);
  } else {
    lcd.setCursor(0, 0);
    lcd.print("Premi il tasto  ");
    lcd.setCursor(0, 1);
    lcd.print("                ");   // riga 2 vuota
  }
  delay(100);
}
```

**Verifica:** a pulsante rilasciato il display mostra «Premi il tasto»; premendolo compare la distanza, che resta visibile per 1 secondo. Nel monitor seriale la misura continua ad arrivare sempre, anche senza premere.

- **Domanda alla classe:** *"Perché il monitor seriale mostra la distanza anche quando il pulsante non è premuto, mentre il display no?"*
