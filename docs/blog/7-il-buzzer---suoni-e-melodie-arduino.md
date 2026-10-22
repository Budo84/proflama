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

**Obiettivo:** Distinguere un **buzzer attivo** da uno **passivo** e produrre suoni e semplici melodie con Arduino.

**Concetti Chiave:**
- Buzzer attivo (suona una sola nota) e passivo (suona la nota che gli comandiamo)
- Frequenza del suono in Hertz
- Funzione `tone()` e `noTone()`
- Array di note

## Fase 1: Teoria 🧠

Il **buzzer** trasforma un segnale elettrico in suono. Ne esistono due tipi, quasi identici all'aspetto:

- **Buzzer attivo**: contiene un piccolo oscillatore, suona una nota fissa appena riceve corrente. Il corpo è chiuso sotto, di solito ha il segno **+** sopra.
- **Buzzer passivo**: è come un piccolo altoparlante, suona la nota che gli diamo come **frequenza**. Con lui possiamo fare melodie.

La **frequenza** (in Hertz) è quante volte al secondo vibra l'aria: più è alta, più la nota è acuta. Il La centrale vale 440 Hz.

- **Domanda alla classe:** *"Come possiamo capire se un buzzer è attivo o passivo senza guardare la scatola?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Buzzer passivo** (e, per la prima prova, uno attivo)
* 2x Cavi jumper maschio-maschio

#### Cablaggio
1. Collega la gamba **+** del buzzer (la più lunga o quella marcata) al pin digitale **8**.
2. Collega l'altra gamba al binario **-** e al pin **GND**.
3. Per il buzzer **attivo** usa lo stesso collegamento.

<center>
	<img src="/img/robotica/base-arduino-buzzer-cablaggio.webp" alt="buzzer collegato al pin 8 e a GND di Arduino su breadboard" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Il buzzer assorbe una corrente vicina al limite di un pin di Arduino: non collegare più buzzer allo stesso pin e non tenerlo acceso a lungo senza pause.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Buzzer attivo* -> accendi il pin 8, aspetta, spegni, aspetta
- *Buzzer passivo* -> suona una nota per volta con `tone()` passando pin, frequenza e durata

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `loop()` | `digitalWrite(8, HIGH);` | Buzzer attivo: suona la sua nota |
| `loop()` | `tone(8, 440, 500);` | Buzzer passivo: suona 440 Hz per 500 ms |
| `loop()` | `noTone(8);` | Ferma il suono |

**Buzzer attivo**

```cpp
const int pinBuzzer = 8;

void setup() {
  pinMode(pinBuzzer, OUTPUT);
}

void loop() {
  digitalWrite(pinBuzzer, HIGH);
  delay(300);
  digitalWrite(pinBuzzer, LOW);
  delay(700);
}
```

**Buzzer passivo: scala musicale (Do, Re, Mi, Fa, Sol, La, Si, Do)**

```cpp
const int pinBuzzer = 8;
int note[] = {262, 294, 330, 349, 392, 440, 494, 523};

void setup() {
}

void loop() {
  for (int i = 0; i < 8; i++) {
    tone(pinBuzzer, note[i], 400);
    delay(500);
  }
  delay(2000);
}
```

## Fase 5: Verifica 🔍

Con il buzzer attivo senti un "bip" breve a intervalli. Con il passivo senti la scala che sale. Se il passivo fa sempre lo stesso suono secco, probabilmente è un attivo.

::: tip 💡 CONSIGLIO
Fai comporre alla classe un'altra melodia scrivendo l'elenco di frequenze nell'array: ecco le frequenze della scala (Do 262, Re 294, Mi 330, Fa 349, Sol 392, La 440, Si 494, Do 523).
:::

::: info ℹ️ PER ANDARE OLTRE
Su Arduino Uno `tone()` usa un timer interno: mentre è attivo non funziona il PWM sui pin 3 e 11.
:::
