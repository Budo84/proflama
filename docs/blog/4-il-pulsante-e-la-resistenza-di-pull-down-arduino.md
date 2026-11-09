---
title: 8-Il pulsante e la resistenza di pull-down (Arduino)
description: 'Leggiamo un pulsante con un ingresso digitale e capiamo perché serve una resistenza di pull-down o di pull-up.'
draft: false
date: 2026-10-23
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-pulsante.webp
---

# 8-Il pulsante e la resistenza di pull-down (Arduino)

**Obiettivo:** Leggere lo stato di un **pulsante** con un ingresso digitale e usarlo per accendere un LED, evitando gli ingressi "fluttuanti".

**Concetti Chiave:**
- Ingresso digitale (`digitalRead`)
- Resistenza di pull-down e pull-up
- Condizione `if / else`
- `INPUT_PULLUP`: il pull-up interno di Arduino

## Fase 1: Teoria 🧠

Un **pulsante** chiude il circuito quando lo premiamo. Se però lo colleghiamo solo tra 5V e un pin, quando **non** è premuto il pin non è collegato a niente: si dice che è **fluttuante** e può leggere valori casuali, disturbato anche solo dalla mano vicina.

La soluzione è una resistenza da **10 kΩ** che tiene il pin a livello definito:

- **Pull-down**: il resistore collega il pin a **GND**. Pulsante non premuto = **LOW**, premuto = **HIGH**.
- **Pull-up**: il resistore collega il pin a **5V**. Pulsante non premuto = **HIGH**, premuto = **LOW** (logica inversa).

Arduino ha già dentro un pull-up per ogni pin: con `pinMode(pin, INPUT_PULLUP)` non serve il resistore esterno, basta il pulsante tra il pin e GND.

- **Domanda alla classe:** *"Con il pull-up, il pulsante premuto legge LOW. Perché secondo voi sembra "al contrario" rispetto a quello che ci aspetteremmo?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Pulsante** a 4 zampe
* 1x **LED** + 1x **resistore da 220 Ω**
* 1x **Resistore da 10 kΩ** (marrone-nero-arancio)
* Cavi jumper maschio-maschio

#### Cablaggio
1. Monta il **pulsante** a cavallo dell'incavo centrale della breadboard. Collega i fili ai terminali **in diagonale** (angoli opposti): due terminali dello stesso lato sono già uniti dentro il pulsante e, se li usi, il pulsante risulta sempre premuto (su Tinkercad e nella realtà).
2. Collega un lato del pulsante a **5V**.
3. Dall'altro lato prendi un cavo verso il pin **2** di Arduino e, sulla stessa riga, il resistore da **10 kΩ** verso **GND** (pull-down).
4. Il LED lo colleghi come nella lezione precedente: pin **8** → 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-pulsante-cablaggio.webp" alt="pulsante con resistenza di pull-down da 10 kiloohm sul pin 2 e LED sul pin 8" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se usi il pulsante senza alcun resistore e senza `INPUT_PULLUP`, il LED può accendersi e spegnersi da solo: è il segno di un ingresso fluttuante.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> pin 2 come ingresso, pin 8 come uscita
- *Per sempre* -> se il pulsante è premuto, accendi il LED, altrimenti spegnilo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(2, INPUT);` | Il pin 2 legge il pulsante |
| `loop()` | `digitalRead(2)` | Restituisce HIGH se premuto (con pull-down) |
| `loop()` | `if (...) { } else { }` | Sceglie cosa fare in base allo stato |

**Versione con pull-down esterno**

```cpp
const int pinPulsante = 2;
const int pinLed = 8;

void setup() {
  pinMode(pinPulsante, INPUT);
  pinMode(pinLed, OUTPUT);
}

void loop() {
  if (digitalRead(pinPulsante) == HIGH) {
    digitalWrite(pinLed, HIGH);
  } else {
    digitalWrite(pinLed, LOW);
  }
}
```

**Versione con INPUT_PULLUP (senza resistore da 10 kΩ, pulsante tra pin 2 e GND)**

```cpp
const int pinPulsante = 2;
const int pinLed = 8;

void setup() {
  pinMode(pinPulsante, INPUT_PULLUP);
  pinMode(pinLed, OUTPUT);
}

void loop() {
  if (digitalRead(pinPulsante) == LOW) {   // premuto = LOW
    digitalWrite(pinLed, HIGH);
  } else {
    digitalWrite(pinLed, LOW);
  }
}
```

## Fase 5: Verifica 🔍

Premi il pulsante: il LED si accende finché lo tieni premuto e si spegne quando lo rilasci. Prova poi la seconda versione e verifica che il comportamento sia lo stesso, con un componente in meno.

::: tip 💡 CONSIGLIO
Sfida: fai in modo che ogni pressione **cambi lo stato** del LED (acceso/spento) invece di tenerlo acceso solo mentre premi. Servirà una variabile per ricordare lo stato.
:::

::: info ℹ️ PER ANDARE OLTRE
I pulsanti meccanici producono piccoli "rimbalzi" quando si premono (*debounce*). Con un `delay(20)` dopo il rilevamento si evitano letture doppie.
:::
