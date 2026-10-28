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
- Pulsante con resistenza di pull-down: premuto = HIGH

## Fase 1: Teoria 🧠

Il **buzzer** trasforma un segnale elettrico in suono. Ne esistono due tipi, quasi identici all'aspetto:

- **Buzzer attivo**: contiene un oscillatore, suona una nota fissa appena riceve corrente. Il corpo è chiuso sotto, di solito ha il segno **+** sopra.
- **Buzzer passivo**: è come un piccolo altoparlante, suona la nota che gli diamo come **frequenza**. Con lui possiamo fare melodie.

La **frequenza** (in Hertz) è quante volte al secondo vibra l'aria: più è alta, più la nota è acuta. Il La centrale vale 440 Hz.

In questa lezione usiamo un buzzer **passivo** e lo comandiamo con un **pulsante**: la funzione `tone(pin, frequenza)` fa partire il suono, `noTone(pin)` lo ferma.

Il pulsante lo leggiamo con una resistenza di **pull-down** da 10 kΩ: un lato del pulsante va a **5V**, l'altro lato va al pin **D7** e, tramite il resistore, a **GND**. A riposo il resistore tiene il pin a **LOW**; quando premiamo il pulsante arrivano i 5V e il pin legge **HIGH**.

- **Domanda alla classe:** *"Come possiamo capire se un buzzer è attivo o passivo senza guardare la scatola?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Buzzer passivo**
* 1x **Pulsante** a 4 zampe
* 1x **Resistore da 10 kΩ** (marrone-nero-arancio)
* 6x Cavi jumper maschio-maschio

#### Cablaggio
1. Collega la gamba **+** del buzzer (la più lunga o quella marcata) al pin digitale **D4**.
2. Collega l'altra gamba del buzzer al binario **-** e al pin **GND**.
3. Monta il pulsante a cavallo dell'incavo centrale della breadboard e usa due terminali **in diagonale** (angoli opposti): due terminali dello stesso lato sono già uniti dentro il pulsante.
4. Un terminale del pulsante → **5V** (binario **+**).
5. L'altro terminale → pin **D7** e, sulla stessa riga, il resistore da **10 kΩ** verso il binario **-** (**GND**).

<center>
	<img src="/img/robotica/base-arduino-buzzer-cablaggio.webp" alt="buzzer passivo sul pin D4 e pulsante sul pin D7 con resistenza di pull-down da 10 kiloohm su breadboard con Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se il buzzer è **attivo** il collegamento è lo stesso, ma suonerà sempre la sua nota fissa: `tone()` non cambia il suono. Il buzzer assorbe una corrente vicina al limite di un pin di Arduino: non collegare più buzzer allo stesso pin.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> pin 4 come uscita, pin 7 come ingresso
- *Per sempre* -> se il pulsante è premuto suona a 1000 Hz, altrimenti stai in silenzio

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(4, OUTPUT);` | Il pin 4 pilota il buzzer |
| `setup()` | `pinMode(7, INPUT);` | Il pin 7 legge il pulsante (con pull-down esterno) |
| `loop()` | `digitalRead(7) == HIGH` | Vero quando il pulsante è premuto |
| `loop()` | `tone(4, 1000);` | Il buzzer suona a 1000 Hz |
| `loop()` | `noTone(4);` | Ferma il suono |

**Il buzzer suona finché tieni premuto il pulsante**

```cpp
// Buzzer passivo sul pin D4, pulsante sul pin D7 (5V sul pulsante, resistenza da 10k verso GND)
const int pinBuzzer = 4;
const int pinPulsante = 7;

void setup() {
  pinMode(pinBuzzer, OUTPUT);
  pinMode(pinPulsante, INPUT);
}

void loop() {
  if (digitalRead(pinPulsante) == HIGH) {
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
  pinMode(pinPulsante, INPUT);
}

void loop() {
  if (digitalRead(pinPulsante) == HIGH) {
    for (int i = 0; i < 8; i++) {
      tone(pinBuzzer, note[i], 400);
      delay(500);
    }
  }
}
```

**Sfida finale: la melodia (Fra Martino) con note e durate**

```cpp
// Buzzer passivo sul pin D4, pulsante sul pin D7 (5V sul pulsante, resistenza da 10k verso GND)
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
  pinMode(pinPulsante, INPUT);
}

void loop() {
  if (digitalRead(pinPulsante) == HIGH) {
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

**Sfida finale: la melodia (Jingle Bells) con note e durate**

```cpp
// Melodia: Jingle Bells
// Buzzer passivo su D8, pulsante su D2.
// Per cambiare brano modifica gli array melodia[] e durata[].

const int PIN_BUZZER = 8;
const int PIN_PULSANTE = 2;

// Frequenze delle note in Hz (C4 = do centrale)
#define REST 0
#define NOTE_C4 262
#define NOTE_D4 294
#define NOTE_E4 330
#define NOTE_F4 349
#define NOTE_G4 392

const int TEMPO = 130;   // battiti al minuto (una semiminima = 4 unità)

int melodia[] = {
  NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_G4,
  NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_F4, NOTE_F4, NOTE_F4, NOTE_F4,
  NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_D4, NOTE_D4, NOTE_E4,
  NOTE_D4, NOTE_G4
};
// durate in unità (semicrome): 4 = semiminima, 2 = croma, 8 = minima
int durata[] = {
  4, 4, 8, 4, 4, 8, 4, 4, 6, 2, 16, 4, 4, 6, 2, 4,
  4, 4, 2, 2, 4, 4, 4, 4, 8, 8
};

void setup() {
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_PULSANTE, INPUT_PULLUP);
}

void suona() {
  int totale = sizeof(melodia) / sizeof(melodia[0]);
  for (int i = 0; i < totale; i++) {
    long ms = (long)durata[i] * 15000 / TEMPO;   // durata della nota in millisecondi
    if (melodia[i] > 0) tone(PIN_BUZZER, melodia[i], ms * 9 / 10);
    delay(ms);
  }
  noTone(PIN_BUZZER);
}

void loop() {
  if (digitalRead(PIN_PULSANTE) == LOW) {   // pulsante premuto
    suona();
  }
}
```

## Fase 5: Verifica 🔍

Tieni premuto il pulsante: senti un suono continuo a 1000 Hz. Rilascialo: silenzio. Se il suono parte da solo o non parte mai, controlla che un terminale del pulsante vada a 5V e che il resistore da 10 kΩ colleghi D7 a GND. Se non suona mai, controlla il verso del buzzer e il pin D4. Nella sfida finale premi il pulsante e ascolti **Fra Martino**: se una nota sembra stonata, controlla la frequenza corrispondente nell'elenco delle note.

::: tip 💡 CONSIGLIO
Nella melodia la **durata** di ogni nota è 1000 diviso il valore nell'array: 4 = quarto (250 ms), 2 = metà (500 ms), 8 = ottavo (125 ms). Cambia i valori per fare una melodia più veloce o più lenta, oppure scrivi la tua canzone preferita.

Cambia `1000` in `500` e poi in `2000`: la nota diventa più grave o più acuta. Per la scala musicale ecco le frequenze: Do 262, Re 294, Mi 330, Fa 349, Sol 392, La 440, Si 494, Do 523.
:::

::: info ℹ️ PER ANDARE OLTRE
Si può leggere il pulsante anche **senza** resistore esterno: basta collegarlo tra D7 e GND e scrivere `pinMode(7, INPUT_PULLUP);` con `digitalRead(7) == LOW` come condizione. Attenzione: **non** mischiare i due metodi. Con il resistore di pull-down e `INPUT_PULLUP` insieme il pin resta basso e il buzzer suona anche senza premere.
:::