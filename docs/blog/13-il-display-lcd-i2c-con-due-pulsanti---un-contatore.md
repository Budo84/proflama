---
title: 13-Il display LCD I2C con due pulsanti - un contatore
description: 'olleghiamo un display LCD 16x2 I2C e due pulsanti ad Arduino: un pulsante aumenta il contatore, l''''altro lo azzera.'
draft: false
date: 2026-11-04
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-22-lcd-i2c-due-pulsanti.webp
---

# 13-Il display LCD I2C con due pulsanti - un contatore


**Obiettivo:** Costruire un **contatore** con Arduino: un **pulsante** aumenta il numero, l'altro lo **azzera**, e il valore compare su un **display LCD 16x2 I2C**.

**Concetti Chiave:**
- Display LCD con zaino I2C (SDA = A4, SCL = A5)
- Libreria `LiquidCrystal_I2C`
- Pulsanti con `INPUT_PULLUP` (premuto = LOW)
- Variabile contatore e `if`

## Fase 1: Teoria 🧠

Un **contatore** è una variabile che aumenta a ogni evento. Qui l'evento è la pressione di un pulsante e il risultato lo leggiamo su un **display LCD** invece che sul computer.

**I pulsanti.** Ogni pulsante ha un piedino al pin di Arduino e l'altro a **GND**. Con `INPUT_PULLUP` Arduino tiene il pin **alto (HIGH)**; premendo, il pin va a massa e legge **LOW**: **premuto = LOW**.

**Il display.** Ha 2 righe da 16 caratteri e usa solo 4 fili. Su Arduino Uno i pin I2C sono **A4 (SDA)** e **A5 (SCL)**. Serve la libreria **LiquidCrystal I2C**: in *Strumenti → Gestione librerie* cerca il nome e premi **Installa**.

- **Domanda alla classe:** *"Perché dopo ogni pressione il programma fa una piccola pausa (`delay`)? Cosa succederebbe se non ci fosse?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1 Arduino Uno con cavo USB
* 1 breadboard
* 1 display LCD 16x2 con modulo I2C
* 2 pulsanti (a 4 piedini, da breadboard)
* Cavetti jumper

#### Cablaggio
| Componente | Pin di Arduino |
|---|---|
| Display **GND** | **GND** |
| Display **VCC** | **5V** |
| Display **SDA** | **A4** |
| Display **SCL** | **A5** |
| Pulsante 1 (aumenta) | **D2** e, in diagonale, **GND** |
| Pulsante 2 (azzera) | **D3** e, in diagonale, **GND** |

Non servono resistenze: usiamo la resistenza interna di Arduino (`INPUT_PULLUP`).

<center>
	<img src="/img/robotica/base-arduino-22-lcd-i2c-due-pulsanti-cablaggio.webp" alt="Arduino Uno con display LCD I2C su A4 e A5 e due pulsanti su D2 e D3 con GND" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Nei pulsanti a 4 piedini i due piedini **sullo stesso lato** sono già collegati tra loro: usa due piedini **in diagonale**. Se lo schermo è acceso ma senza scritte regola il **trimmer del contrasto** sul retro; se non risponde prova l'indirizzo `0x3F`.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- Avviare il display e scrivere "Contatore:" nella riga 0 e il numero 0 nella riga 1.
- Ripetere per sempre:
- Se il pulsante 1 è premuto (LOW): aumentare il contatore di 1 e riscriverlo.
- Se il pulsante 2 è premuto (LOW): azzerare il contatore e riscriverlo.
- Dopo ogni pressione attendere 250 ms.

## Fase 4: Scrittura del Codice 💻

| Comando | Cosa fa |
|---|---|
| `LiquidCrystal_I2C lcd(0x27, 16, 2)` | Crea il display: indirizzo, colonne, righe |
| `lcd.init()` e `lcd.backlight()` | Avviano il display e accendono la luce di fondo |
| `lcd.setCursor(col, riga)` | Sposta il punto di scrittura |
| `lcd.print(valore)` | Scrive un testo o un numero |
| `pinMode(pin, INPUT_PULLUP)` | Ingresso con resistenza interna: premuto = LOW |
| `conteggio = conteggio + 1` | Aumenta il contatore di 1 |

**Programma completo**

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);   // indirizzo I2C 0x27 (a volte 0x3F)

const int PIN_PIU = 2;      // pulsante 1: aumenta
const int PIN_AZZERA = 3;   // pulsante 2: azzera

int conteggio = 0;

void setup() {
  pinMode(PIN_PIU, INPUT_PULLUP);      // premuto = LOW
  pinMode(PIN_AZZERA, INPUT_PULLUP);   // premuto = LOW
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Contatore:");
  lcd.setCursor(0, 1);
  lcd.print(conteggio);
}

void loop() {
  if (digitalRead(PIN_PIU) == LOW) {
    conteggio = conteggio + 1;
    lcd.setCursor(0, 1);
    lcd.print(conteggio);
    lcd.print("    ");          // cancella le cifre vecchie
    delay(250);                 // evita di contare più volte una sola pressione
  }
  if (digitalRead(PIN_AZZERA) == LOW) {
    conteggio = 0;
    lcd.setCursor(0, 1);
    lcd.print(conteggio);
    lcd.print("    ");
    delay(250);
  }
}
```

## Fase 5: Verifica 🔍

1. Premi il pulsante 1 più volte: il numero sale di 1 per ogni pressione? Il pulsante 2 lo azzera?
2. Cosa succede se togli `lcd.print("    ")` e conti fino a 10 e poi azzeri? Perché resta una cifra?
3. Cambia il `delay(250)` in 50 e in 1000: come si comporta il contatore?
4. **Sfida:** fai fermare il contatore a 10 e scrivi "Massimo!" sul display.

::: details Soluzione della sfida
```cpp
if (digitalRead(PIN_PIU) == LOW && conteggio < 10) {
  conteggio = conteggio + 1;
  lcd.setCursor(0, 1);
  lcd.print(conteggio);
  lcd.print("    ");
  if (conteggio == 10) {
    lcd.setCursor(0, 1);
    lcd.print("Massimo!  ");
  }
  delay(250);
}
```
:::

::: tip 💡 CONSIGLIO
Il numero si riscrive sempre nella riga 1: gli spazi finali cancellano le cifre di prima (da 10 a 0 resterebbe uno 0 di troppo).
:::

::: info ℹ️ PER ANDARE OLTRE
Con lo stesso circuito puoi costruire un punteggio per un gioco a due giocatori: un pulsante per ciascuno, e due numeri sul display.
:::

