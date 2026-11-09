---
title: 13-Il termometro con il sensore LM35 (Arduino)
description: 'Misuriamo la temperatura in gradi Celsius con il sensore LM35 e un ingresso analogico di Arduino.'
draft: false
date: 2026-11-06
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-temperatura.webp
---

# 13-Il termometro con il sensore LM35 (Arduino)

**Obiettivo:** Costruire un **termometro digitale** con il sensore **LM35**, convertendo la lettura analogica in gradi Celsius e **mostrando la temperatura su un display LCD 16x2**.

**Concetti Chiave:**
- Sensore di temperatura analogico (10 mV per grado)
- Conversione da valore a tensione a temperatura
- Variabili `float` e decimali
- Allarme a soglia
- Mostrare un valore su un display LCD 16x2 I2C

## Fase 1: Teoria 🧠

L'**LM35** è un sensore di temperatura con tre pin. La tensione sul pin centrale è proporzionale alla temperatura: **10 mV per ogni °C**. A 25 °C l'uscita vale 0,25 V.

Con Arduino:

1. `analogRead()` dà un numero da 0 a 1023;
2. lo trasformiamo in tensione: **V = lettura × 5 ÷ 1024**;
3. lo trasformiamo in temperatura: **°C = V × 100**.

Per vedere la temperatura senza il computer usiamo un **display LCD 16x2 con modulo I2C**: ha 4 fili (VCC, GND e i due fili dati **SDA** e **SCL**) e mostra 2 righe da 16 caratteri. Su Arduino Uno i pin I2C sono **A4 (SDA)** e **A5 (SCL)**, quindi non entrano in conflitto con A0 dove è collegato l'LM35. La libreria **LiquidCrystal I2C** si installa da *Strumenti → Gestione librerie*.

- **Domanda alla classe:** *"Perché il valore dei gradi si ottiene moltiplicando per 100 la tensione in volt?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Sensore LM35** (contenitore nero a mezzaluna)
* 1x **Display LCD 1602 con modulo I2C**
* 7x Cavi jumper maschio-maschio

#### Cablaggio
**Sensore LM35** (colonne 2, 3 e 4 della breadboard). Con il lato **piatto** rivolto verso di te e i piedini in basso, da sinistra a destra:
1. **+Vs** → **5V**
2. **Vout** → **A0**
3. **GND** → **GND**

**Display LCD I2C** (inserisci i 4 pin del modulo nelle colonne 20, 21, 22 e 23, da sinistra a destra):
1. **GND** → colonna del GND dell'LM35 (cavo nero dalla colonna 4 alla colonna 20).
2. **VCC** → colonna del 5V dell'LM35 (cavo rosso dalla colonna 3 alla colonna 21).
3. **SDA** → **A4** (cavo blu).
4. **SCL** → **A5** (cavo verde).
5. Se i caratteri non si vedono, regola con un cacciavite piccolo il trimmer blu sul retro del display.

<center>
	<img src="/img/robotica/base-arduino-temperatura-cablaggio.webp" alt="sensore LM35 collegato a 5V, A0 e GND e display LCD I2C collegato ad A4 e A5 di Arduino" width="300"/>
</center>

::: tip 💡 CONSIGLIO
Su Tinkercad seleziona il display e scegli come tipo PCF8574 e indirizzo 0x20.
:::

::: warning ⚠️ ATTENZIONE
Se inverti 5V e GND l'LM35 si scalda molto e si rovina: controlla il verso del lato piatto prima di dare alimentazione. Il sensore **TMP36** ha lo stesso aspetto ma una formula diversa.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> inizializza il display e la retroilluminazione, scrivi "Temperatura:" sulla riga 1
- *Per sempre* -> leggi A0, converti in tensione, converti in °C, stampa la temperatura sul monitor seriale e sulla riga 2 del display, aspetta 1 secondo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `loop()` | `analogRead(A0)` | Legge il valore da 0 a 1023 |
| `loop()` | `lettura * 5.0 / 1024.0` | Converte la lettura in volt |
| `loop()` | `tensione * 100.0` | Converte i volt in °C |
| `setup()` | `lcd.init(); lcd.backlight();` | Avvia il display e accende la luce |
| `loop()` | `lcd.setCursor(0, 1);` | Va all'inizio della seconda riga |
| `loop()` | `lcd.print(temperatura, 1);` | Scrive la temperatura con 1 decimale |

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);   // cambia in 0x3F oppure in 0x20 se non funziona
const int pinSensore = A0;

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Temperatura:");
}

void loop() {
  int lettura = analogRead(pinSensore);
  float tensione = lettura * 5.0 / 1024.0;
  float temperatura = tensione * 100.0;

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" C");

  lcd.setCursor(0, 1);
  lcd.print(temperatura, 1);   // un decimale
  lcd.print((char)223);        // simbolo del grado
  lcd.print("C   ");           // gli spazi cancellano i caratteri vecchi
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Sul display compare "Temperatura:" sulla prima riga e il valore in gradi sulla seconda, aggiornato ogni secondo (lo stesso valore appare anche nel monitor seriale). Dovresti leggere circa la temperatura dell'aula. Stringi il sensore tra le dita per un po': il valore sale di qualche grado. Se vedi solo rettangoli pieni, gira il trimmer del contrasto; se non vedi niente, prova l'indirizzo 0x3F oppure 0x20.

::: tip 💡 CONSIGLIO
Confronta il valore con un termometro di riferimento. Differenze di 1-2 gradi sono normali con questo sensore e una lettura così semplice.
:::

::: info ℹ️ PER ANDARE OLTRE
Per aumentare la precisione si può usare il riferimento interno a 1,1 V con `analogReference(INTERNAL)` e la formula `lettura * 1.1 / 1024.0 * 100`.
:::
