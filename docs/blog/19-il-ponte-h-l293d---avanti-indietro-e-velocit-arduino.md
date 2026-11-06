---
title: "19-Il ponte H L293D - avanti, indietro e velocità (Arduino)"
description: 'Comandiamo il verso di rotazione e la velocità di un motore DC con il driver L293D.'
draft: false
date: 2026-11-06
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-ponte-h.webp
---

# 19-Il ponte H L293D - avanti, indietro e velocità (Arduino)

**Obiettivo:** Far girare un motore DC **in entrambi i versi** e regolarne la velocità con il driver **L293D** (ponte H).

**Concetti Chiave:**
- Ponte H: inversione della polarità sul motore
- Pin di direzione e pin di enable (PWM)
- Alimentazione separata di logica e motori
- Massa in comune

## Fase 1: Teoria 🧠

Per far girare un motore al contrario bisogna **invertire i due fili**. Il **ponte H** lo fa elettronicamente con quattro interruttori disposti a forma di H. Il chip **L293D** ne contiene due (può pilotare **2 motori**) e sopporta circa **600 mA per canale**.

Per un motore usiamo tre pin:

- **1A** e **2A**: decidono il verso. 1A alto e 2A basso = avanti; il contrario = indietro; uguali = fermo.
- **EN1,2** (enable): attiva il canale; se gli diamo un segnale PWM regoliamo anche la **velocità**.

Il chip ha **due alimentazioni**: **VCC1** (pin 16) per la logica a 5 V, **VCC2** (pin 8) per i motori.

- **Domanda alla classe:** *"Cosa succede se entrambi i pin 1A e 2A sono a HIGH? E se sono entrambi a LOW?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **L293D** (16 pin)
* 1x **Motorino DC** da 3-6 V
* Cavi jumper
* Pacco batterie 4,5-6 V (opzionale per motori più grandi)

#### Cablaggio
Con la **tacca** del chip rivolta verso l'alto, i pin partono da **sinistra in alto** (pin 1) e scendono, poi risalgono a destra (pin 16).

1. **Pin 16** (VCC1) → **5V**. **Pin 8** (VCC2) → **5V** (o batteria per motori più forti).
2. **Pin 4, 5, 12, 13** → **GND**.
3. **Pin 1** (EN1,2) → Arduino pin **9** (PWM).
4. **Pin 2** (1A) → Arduino pin **7**. **Pin 7** (2A) → Arduino pin **8**.
5. **Pin 3** (1Y) e **pin 6** (2Y) → i due fili del motore.

<center>
	<img src="/img/robotica/base-arduino-ponte-h-cablaggio.webp" alt="chip L293D con motore DC collegato ai pin 7, 8 e 9 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Se usi una batteria esterna per i motori, il suo **negativo** deve essere collegato al **GND di Arduino**, altrimenti il circuito non funziona. Non superare i 36 V né i 600 mA per canale.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> avanti a velocità piena, fermo, indietro a metà velocità, fermo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `pinMode(...)` | I pin 7, 8, 9 sono uscite |
| `loop()` | `digitalWrite(7, HIGH); digitalWrite(8, LOW);` | Verso avanti |
| `loop()` | `digitalWrite(7, LOW); digitalWrite(8, HIGH);` | Verso indietro |
| `loop()` | `analogWrite(9, valore);` | Velocità da 0 a 255 |

```cpp
const int pinEN = 9;   // PWM: velocità
const int pinA1 = 7;   // direzione
const int pinA2 = 8;

void avanti(int velocita) {
  digitalWrite(pinA1, HIGH);
  digitalWrite(pinA2, LOW);
  analogWrite(pinEN, velocita);
}

void indietro(int velocita) {
  digitalWrite(pinA1, LOW);
  digitalWrite(pinA2, HIGH);
  analogWrite(pinEN, velocita);
}

void ferma() {
  analogWrite(pinEN, 0);
}

void setup() {
  pinMode(pinEN, OUTPUT);
  pinMode(pinA1, OUTPUT);
  pinMode(pinA2, OUTPUT);
}

void loop() {
  avanti(255);
  delay(2000);
  ferma();
  delay(1000);
  indietro(128);
  delay(2000);
  ferma();
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Il motore gira in un verso, si ferma, gira nell'altro a velocità minore. Se i versi sono scambiati rispetto a quello che volevi, inverti i due fili del motore: non serve toccare il codice.

::: tip 💡 CONSIGLIO
Se hai un secondo motore usa l'altro lato del chip (pin 9, 10, 15): questa è la base per muovere un piccolo robot a due ruote.
:::
