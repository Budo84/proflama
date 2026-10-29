---
title: 11-Il display LCD 16x2 con modulo I2C (Arduino)
description: 'Scriviamo testi e valori su un display LCD 16x2 collegato con soli quattro fili grazie al modulo I2C.'
draft: false
date: 2026-10-29
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-lcd.webp
---

# 11-Il display LCD 16x2 con modulo I2C (Arduino)

**Obiettivo:** Collegare un **display LCD 16x2 con adattatore I2C** e scrivere messaggi e valori misurati.

**Concetti Chiave:**
- Comunicazione I2C: SDA e SCL
- Indirizzo I2C del display
- Installare una libreria dall'IDE
- Posizionare il testo: colonna e riga

## Fase 1: Teoria 🧠

Il **display LCD 16x2** mostra **2 righe da 16 caratteri**. Senza adattatore richiede più di 10 fili; con il modulo **I2C** ne bastano **4**: alimentazione (VCC, GND) e due fili dati (**SDA** e **SCL**).

Ogni dispositivo I2C ha un **indirizzo**: sul display è di solito **0x27**, **0x3F** oppure **0x20**. Su Arduino Uno i pin I2C sono **A4 (SDA)** e **A5 (SCL)**.

La libreria **LiquidCrystal I2C** si installa da *Strumenti → Gestione librerie* cercando "LiquidCrystal I2C".

- **Domanda alla classe:** *"Perché usare solo 2 fili dati invece di 8 è un vantaggio quando i progetti crescono?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Display LCD 1602 con modulo I2C**
* 4x Cavi jumper maschio-femmina

#### Cablaggio
1. **GND** → **GND**.
2. **VCC** → **5V**.
3. **SDA** → **A4**.
4. **SCL** → **A5**.
5. Regola con un cacciavite piccolo il trimmer blu sul retro se i caratteri non si vedono.

::: tip 💡 CONSIGLIO
Su Tinkercad seleziona il display e scegli come tipo PCF8574 e indirizzo 0x20.
:::

<center>
	<img src="/img/robotica/base-arduino-lcd-cablaggio.webp" alt="display LCD 16x2 con modulo I2C collegato ad A4 e A5 di Arduino" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> inizializza il display e la retroilluminazione, scrivi "Ciao classe!" sulla riga 1
- *Per sempre* -> scrivi sulla riga 2 i secondi trascorsi

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| inizio | `#include <LiquidCrystal_I2C.h>` | Carica la libreria |
| `setup()` | `lcd.init(); lcd.backlight();` | Avvia il display e accende la luce |
| `loop()` | `lcd.setCursor(col, riga);` | Posiziona il cursore (colonna 0-15, riga 0-1) |
| `loop()` | `lcd.print(...);` | Scrive testo o numeri |

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);   // cambia in 0x3F oppure in 0x20 se non funziona

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Ciao classe!");
}

void loop() {
  lcd.setCursor(0, 1);
  lcd.print("Secondi: ");
  lcd.print(millis() / 1000);
  delay(500);
}
```

## Fase 5: Verifica 🔍

Sul display compare "Ciao classe!" sulla prima riga e il contatore dei secondi sulla seconda. Se vedi solo dei rettangoli pieni, gira il trimmer del contrasto. Se non vedi niente, prova l'indirizzo 0x3F oppure 0x20.

::: tip 💡 CONSIGLIO
Mostra sul display la temperatura dell'LM35 o la distanza dell'HC-SR04: è il modo più semplice per rendere un progetto indipendente dal computer.
:::