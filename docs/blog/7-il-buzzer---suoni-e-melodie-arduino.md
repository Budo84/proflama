---
title: 7-Il buzzer - suoni e melodie (Arduino)
description: 'Differenza tra buzzer attivo e passivo, e come far suonare note e melodie con la funzione tone().'
draft: false
date: 2026-10-22
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-buzzer.webp
---

# 7-Il buzzer - suoni e melodie (Arduino)

**Obiettivo:** Far suonare un **buzzer passivo** con la funzione `tone()` solo mentre teniamo premuto un **pulsante**.

**Concetti Chiave:**
- Buzzer attivo (nota fissa) e passivo (nota comandata)
- Frequenza del suono in Hertz
- Funzioni `tone()` e `noTone()`
- Pulsante con `INPUT_PULLUP`: premuto = LOW

## Fase 1: Teoria 🧠

Il **buzzer** trasforma un segnale elettrico in suono. Ne esistono due tipi, quasi identici all'aspetto:

- **Buzzer attivo**: contiene un oscillatore, suona una nota fissa appena riceve corrente. Il corpo è chiuso sotto, di solito ha il segno **+** sopra.
- **Buzzer passivo**: è come un piccolo altoparlante, suona la nota che gli diamo come **frequenza**. Con lui possiamo fare melodie.

La **frequenza** (in Hertz) è quante volte al secondo vibra l'aria: più è alta, più la nota è acuta. Il La centrale vale 440 Hz.

In questa lezione usiamo un buzzer **passivo** e lo comandiamo con un **pulsante**: la funzione `tone(pin, frequenza)` fa partire il suono, `noTone(pin)` lo ferma.

Il pulsante lo colleghiamo tra il pin **D7** e **GND**, senza resistore esterno, usando il **pull-up interno** con `INPUT_PULLUP`. Con questo collegamento il pin legge **HIGH** a riposo e **LOW** quando il pulsante è premuto.

- **Domanda alla classe:** *"Come possiamo capire se un buzzer è attivo o passivo senza guardare la scatola?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Buzzer passivo**
* 1x **Pulsante** a 4 zampe
* 4x Cavi jumper maschio-maschio

#### Cablaggio
1. Collega la gamba **+** del buzzer (la più lunga o quella marcata) al pin digitale **D4**.
2. Collega l'altra gamba del buzzer al binario **-** e al pin **GND**.
3. Monta il pulsante a cavallo dell'incavo centrale della breadboard: un lato → pin **D7**; l'altro lato → binario **-** (**GND**).

<center>
	<img src="/img/robotica/base-arduino-buzzer-cablaggio.webp" alt="buzzer passivo sul pin D4 e pulsante sul pin D7 con l'altro lato a GND su breadboard con Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se il buzzer è **attivo** il collegamento è lo stesso, ma suonerà sempre la sua nota fissa: `tone()` non cambia il suono. Il buzzer assorbe una corrente vicina al limite di un pin di Arduino: non collegare più buzzer allo stesso pin.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> pin 4 come uscita, pin 7 come ingresso con pull-up
- *Per sempre* -> se il pulsante è premuto suona a 1000 Hz, altrimenti stai in silenzio

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(4, OUTPUT);` | Il pin 4 pilota il buzzer |
| `setup()` | `pinMode(7, INPUT_PULLUP);` | Il pin 7 legge il pulsante con pull-up interno |
| `loop()` | `digitalRead(7) == LOW` | Vero quando il pulsante è premuto |
| `loop()` | `tone(4, 1000);` | Il buzzer suona a 1000 Hz |
| `loop()` | `noTone(4);` | Ferma il suono |

**Il buzzer suona finché tieni premuto il pulsante**

```cpp
// Buzzer passivo sul pin D4, pulsante sul pin D7 (l'altro lato va a GND)
const int pinBuzzer = 4;
const int pinPulsante = 7;

void setup() {
  pinMode(pinBuzzer, OUTPUT);
  pinMode(pinPulsante, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(pinPulsante) == LOW) {
    // Pulsante premuto: il buzzer suona a 1000 Hz
    tone(pinBuzzer, 1000);
  } else {
    // Pulsante rilasciato: il buzzer tace
    noTone(pinBuzzer);
  }
}
```

**Sfida 1: premi il pulsante e suona la scala musicale (Do, Re, Mi, Fa, Sol, La, Si, Do)**

```cpp
const int pinBuzzer = 4;
const int pinPulsante = 7;
int note[] = {262, 294, 330, 349, 392, 440, 494, 523};

void setup() {
  pinMode(pinPulsante, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(pinPulsante) == LOW) {
    for (int i = 0; i < 8; i++) {
      tone(pinBuzzer, note[i], 400);
      delay(500);
    }
  }
}
```

**Sfida finale: la melodia (Fra Martino) con note e durate**

```cpp
// Buzzer passivo sul pin D4, pulsante sul pin D7 (l'altro lato va a GND)
const int pinBuzzer = 4;
const int pinPulsante = 7;

// Frequenze delle note (Hz)
const int SOL3 = 196;
const int DO = 262;
const int RE = 294;
const int MI = 330;
const int FA = 349;
const int SOL = 392;
const int LA = 440;

// Melodia: ogni nota ha una durata (2 = metà, 4 = quarto, 8 = ottavo)
int melodia[] = {DO, RE, MI, DO,  DO, RE, MI, DO,
                 MI, FA, SOL,     MI, FA, SOL,
                 SOL, LA, SOL, FA, MI, DO,  SOL, LA, SOL, FA, MI, DO,
                 DO, SOL3, DO,    DO, SOL3, DO};
int durate[]  = {4, 4, 4, 4,  4, 4, 4, 4,
                 4, 4, 2,     4, 4, 2,
                 8, 8, 8, 8, 4, 4,  8, 8, 8, 8, 4, 4,
                 4, 4, 2,     4, 4, 2};
const int NUM_NOTE = sizeof(melodia) / sizeof(melodia[0]);

void setup() {
  pinMode(pinPulsante, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(pinPulsante) == LOW) {
    for (int i = 0; i < NUM_NOTE; i++) {
      int durataNota = 1000 / durate[i];       // 4 = 250 ms, 2 = 500 ms, 8 = 125 ms
      tone(pinBuzzer, melodia[i], durataNota);
      delay(durataNota * 1.3);                 // piccola pausa tra le note
      noTone(pinBuzzer);
    }
    delay(500);
  }
}
```

## Fase 5: Verifica 🔍

Tieni premuto il pulsante: senti un suono continuo a 1000 Hz. Rilascialo: silenzio. Se il suono parte da solo, controlla che il pulsante abbia un lato su D7 e l'altro su GND. Se non suona mai, controlla il verso del buzzer e il pin D4. Nella sfida finale premi il pulsante e ascolti **Fra Martino**: se una nota sembra stonata, controlla la frequenza corrispondente nell'elenco delle note.

::: tip 💡 CONSIGLIO
Nella melodia la **durata** di ogni nota è 1000 diviso il valore nell'array: 4 = quarto (250 ms), 2 = metà (500 ms), 8 = ottavo (125 ms). Cambia i valori per fare una melodia più veloce o più lenta, oppure scrivi la tua canzone preferita.

Cambia `1000` in `500` e poi in `2000`: la nota diventa più grave o più acuta. Per la scala musicale ecco le frequenze: Do 262, Re 294, Mi 330, Fa 349, Sol 392, La 440, Si 494, Do 523.
:::

::: info ℹ️ PER ANDARE OLTRE
Il pulsante può essere letto anche con una resistenza di **pull-down** esterna (10 kΩ verso GND e l'altro lato a 5V): in quel caso premuto = HIGH. Lo trovi nella lezione sul pulsante. Con il collegamento a GND di questa lezione, invece, serve `INPUT_PULLUP` e il confronto con `LOW`.
:::
