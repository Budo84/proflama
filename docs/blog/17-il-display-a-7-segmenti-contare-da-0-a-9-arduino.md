---
title: 17-Il display a 7 segmenti - contare da 0 a 9 (Arduino)
description: 'Accendiamo i segmenti di un display a 7 segmenti per mostrare le cifre da 0 a 9 e costruire un contatore.'
draft: false
date: 2026-11-07
category: "Officina-Robotica, Arduino"
class_target: "2, 3, Tutti"
image: /img/robotica/base-arduino-7segmenti.webp
---

# 17-Il display a 7 segmenti - contare da 0 a 9 (Arduino)

**Obiettivo:** Pilotare un **display a 7 segmenti** per mostrare le cifre da 0 a 9, usando **array** e cicli.

**Concetti Chiave:**
- Sette LED (a, b, c, d, e, f, g) più il punto decimale
- Catodo comune e anodo comune
- Una resistenza per ogni segmento
- Array per memorizzare le cifre

## Fase 1: Teoria 🧠

Il **display a 7 segmenti** contiene sette LED a forma di trattino, chiamati **a, b, c, d, e, f, g**, più un ottavo per il **punto** (dp). Accendendone alcuni formiamo le cifre. Per esempio il **1** accende solo b e c, l'**8** li accende tutti.

I LED hanno un terminale in comune:

- **Catodo comune**: i catodi sono uniti e vanno a **GND**; si accende un segmento dando HIGH al suo pin. È la versione di questa lezione.
- **Anodo comune**: la linea comune va a 5V e la logica è invertita.

Ogni segmento è un LED, quindi ha bisogno di una propria **resistenza da 220 Ω**.

- **Domanda alla classe:** *"Quanti segmenti servono per scrivere il numero 7? E per il 4? Provate a disegnarli alla lavagna."*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Display a 7 segmenti** a catodo comune (1 cifra)
* 8x **Resistori da 220 Ω**
* 10x Cavi jumper maschio-maschio

#### Cablaggio
1. Piedino **comune** (ce ne sono due, uniti) → **GND**.
2. Ogni segmento va collegato a un pin tramite un resistore da 220 Ω:
   - **a** → pin **2**, **b** → pin **3**, **c** → pin **4**, **d** → pin **5**
   - **e** → pin **6**, **f** → pin **7**, **g** → pin **8**
   - **dp** (punto) → pin **9** (facoltativo)

<center>
	<img src="/img/robotica/base-arduino-7segmenti-cablaggio.webp" alt="display a 7 segmenti con otto resistenze collegato ai pin da 2 a 9 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
La disposizione dei piedini cambia da modello a modello. Se un segmento sbagliato si accende, prova ogni piedino con 5V e un resistore da 220 Ω per scoprire a quale segmento corrisponde, poi aggiorna i numeri dei pin nel codice.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> imposta i pin 2-9 come uscite
- *Per sempre* -> per ogni cifra da 0 a 9 accendi i segmenti giusti, aspetta un secondo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| variabile | `int cifre[10][7]` | Tabella: quali segmenti accendere per ogni cifra |
| funzione | `mostra(n)` | Accende i segmenti della cifra n |
| `loop()` | `for (int n = 0; n <= 9; n++)` | Conta da 0 a 9 |

```cpp
// segmenti: a b c d e f g  (1 = acceso)
const int cifre[10][7] = {
  {1,1,1,1,1,1,0},  // 0
  {0,1,1,0,0,0,0},  // 1
  {1,1,0,1,1,0,1},  // 2
  {1,1,1,1,0,0,1},  // 3
  {0,1,1,0,0,1,1},  // 4
  {1,0,1,1,0,1,1},  // 5
  {1,0,1,1,1,1,1},  // 6
  {1,1,1,0,0,0,0},  // 7
  {1,1,1,1,1,1,1},  // 8
  {1,1,1,1,0,1,1}   // 9
};
const int pinSegmenti[7] = {2, 3, 4, 5, 6, 7, 8};

void mostra(int n) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(pinSegmenti[i], cifre[n][i]);
  }
}

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(pinSegmenti[i], OUTPUT);
  }
}

void loop() {
  for (int n = 0; n <= 9; n++) {
    mostra(n);
    delay(1000);
  }
}
```

## Fase 5: Verifica 🔍

Il display conta da 0 a 9 e ricomincia. Se una cifra è sbagliata (per esempio il 6 sembra una b) controlla la riga corrispondente nella tabella `cifre` e il collegamento del segmento.

::: tip 💡 CONSIGLIO
Sfida: collega un pulsante e fai avanzare la cifra a ogni pressione, oppure mostra la cifra delle decine di un valore letto da un sensore.
:::

::: info ℹ️ PER ANDARE OLTRE
Con display a più cifre si usa il **multiplexing**: si accende una cifra per volta molto velocemente. Con un chip come il **74HC595** si risparmiano tanti pin.
:::