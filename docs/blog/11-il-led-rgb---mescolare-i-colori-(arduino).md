---
title: 11-Il LED RGB - mescolare i colori (Arduino)
description: 'Usiamo un LED RGB a catodo comune e il PWM di Arduino per creare tutti i colori della luce.'
draft: false
date: 2026-11-05
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-rgb.webp
---

# 11-Il LED RGB - mescolare i colori (Arduino)

**Obiettivo:** Collegare un **LED RGB** e controllare la luminosità di rosso, verde e blu con il **PWM** per ottenere colori diversi.

**Concetti Chiave:**
- Sintesi additiva: rosso + verde + blu
- Catodo comune e anodo comune
- PWM con `analogWrite()` (valori 0-255)
- Una resistenza per ogni colore

## Fase 1: Teoria 🧠

Un **LED RGB** contiene in un unico involucro tre LED: **R**osso, **G**reen (verde) e **B**lu. Ha 4 gambe: una per colore e una **in comune**, che è la più lunga.

- **Catodo comune**: la gamba lunga va a **GND**. È la versione più usata (e quella di questa lezione).
- **Anodo comune**: la gamba lunga va a **5V** e la logica si inverte.

Per variare la luminosità di ogni colore Arduino usa il **PWM**: accende e spegne il pin velocissimo, e la proporzione di tempo acceso (da 0 a 255) fa percepire una luce più o meno forte. Sono pin PWM sulla Uno i numeri **3, 5, 6, 9, 10, 11** (quelli con il simbolo ~).

Mescolando i tre colori otteniamo: rosso + verde = **giallo**, rosso + blu = **magenta**, verde + blu = **ciano**, tutti e tre = **bianco**.

- **Domanda alla classe:** *"Perché secondo voi un televisore o un monitor, che mostra milioni di colori, usa solo tre colori di base?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **LED RGB** a catodo comune
* 3x **Resistori da 220 Ω**
* 5x Cavi jumper maschio-maschio

#### Cablaggio
1. Infila il LED RGB sulla breadboard: le 4 gambe devono stare su 4 righe diverse.
2. Collega la gamba più **lunga** (catodo comune) al binario **-** e al pin **GND**.
3. Per ogni gamba colorata inserisci un resistore da 220 Ω e collegalo al pin Arduino:
   - **Rosso** → resistore → pin **9**
   - **Verde** → resistore → pin **10**
   - **Blu** → resistore → pin **11**

<center>
	<img src="/img/robotica/base-arduino-rgb-cablaggio.webp" alt="LED RGB con tre resistenze collegato ai pin 9, 10 e 11 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se il tuo LED è ad **anodo comune** collega la gamba lunga a **5V** e nel codice usa `255 - valore`: il LED si accende quando il pin è a 0.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> imposta i pin 9, 10 e 11 come uscite
- *Per sempre* -> mostra rosso, verde, blu, giallo, ciano, magenta, bianco, uno alla volta per 1 secondo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(9, OUTPUT);` | Prepara ogni pin del LED come uscita |
| funzione | `colore(r, g, b)` | Imposta i tre canali con valori da 0 a 255 |
| `colore()` | `analogWrite(pin, valore);` | Regola la luminosità con il PWM |
| `loop()` | `delay(1000);` | Mantiene ogni colore per un secondo |

```cpp
const int pinR = 9;
const int pinG = 10;
const int pinB = 11;

void colore(int r, int g, int b) {
  analogWrite(pinR, r);
  analogWrite(pinG, g);
  analogWrite(pinB, b);
}

void setup() {
  pinMode(pinR, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinB, OUTPUT);
}

void loop() {
  colore(255, 0, 0);     // rosso
  delay(1000);
  colore(0, 255, 0);     // verde
  delay(1000);
  colore(0, 0, 255);     // blu
  delay(1000);
  colore(255, 255, 0);   // giallo
  delay(1000);
  colore(0, 255, 255);   // ciano
  delay(1000);
  colore(255, 0, 255);   // magenta
  delay(1000);
  colore(255, 255, 255); // bianco
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Il LED deve mostrare in sequenza i sette colori. Se il rosso e il verde sono scambiati, hai invertito i due fili: cambia i numeri dei pin nel codice, senza smontare il circuito.

::: tip 💡 CONSIGLIO
Chiedi alla classe di trovare i valori per ottenere **arancione** e **rosa**. Non esiste una ricetta unica: si prova e si regola.
:::

::: info ℹ️ PER ANDARE OLTRE
Il bianco ottenuto con i tre LED non è mai perfetto: i tre colori hanno luminosità diverse. Provare valori come (255, 180, 180) migliora il risultato.
:::