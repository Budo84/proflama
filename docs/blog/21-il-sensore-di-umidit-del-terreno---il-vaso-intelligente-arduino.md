---
title: 21-Il sensore di umidità del terreno - il vaso intelligente (Arduino)
description: 'Misuriamo l''''umidità della terra di una pianta e accendiamo un LED quando serve annaffiare.'
draft: false
date: 2026-11-07
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-umidita.webp
---

# 21-Il sensore di umidità del terreno - il vaso intelligente (Arduino)

**Obiettivo:** Misurare l'**umidità del terreno** con un sensore analogico e segnalare con un LED quando la pianta ha **sete**.

**Concetti Chiave:**
- Sensore resistivo: più acqua, più conduce
- Lettura analogica e taratura (secco / bagnato)
- Conversione in percentuale con `map()`
- Durata dei sensori: alimentarli solo quando si misura

## Fase 1: Teoria 🧠

Il sensore di umidità è formato da due sonde da infilare nella terra. L'acqua nel terreno **conduce la corrente**: più il terreno è bagnato, meno resistenza c'è tra le sonde.

Il modulo ha tre pin: **VCC**, **GND** e **AO** (uscita analogica). Nella maggior parte dei sensori resistivi il valore **scende** quando la terra è più umida: tipicamente circa **1000** in aria o nella terra secca e **400-300** nella terra molto bagnata. Cambia da sensore a sensore, quindi bisogna **tararlo**.

Le sonde resistive si **corrodono** perché passa corrente nell'acqua: per questo le alimentiamo da un pin digitale solo **quando misuriamo**.

- **Domanda alla classe:** *"Perché un sensore fatto di metallo, lasciato sempre acceso nella terra bagnata, dura poco?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Modulo sensore di umidità del terreno** (con sonda a due piste)
* 1x **LED** + 1x **resistore da 220 Ω**
* Cavi jumper
* Un vaso con della terra e un bicchiere d'acqua

#### Cablaggio
1. **VCC** del sensore → pin digitale **7** (alimentazione solo durante la misura).
2. **GND** → **GND**.
3. **AO** → **A0**.
4. LED: pin **8** → 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-umidita-cablaggio.webp" alt="sensore di umidità del terreno con VCC sul pin 7, AO su A0 e LED sul pin 8" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Non immergere in acqua la parte elettronica del sensore: devono stare nella terra solo le due piste. Non lasciare il sensore alimentato in continuo.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> accendi il sensore dal pin 7, aspetta 100 ms, leggi A0, spegni il sensore; se la terra è asciutta accendi il LED

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `loop()` | `digitalWrite(7, HIGH);` | Alimenta il sensore |
| `loop()` | `analogRead(A0)` | Legge l'umidità: alto = secco |
| `loop()` | `map(v, SECCO, BAGNATO, 0, 100)` | Converte in percentuale |
| `loop()` | `digitalWrite(7, LOW);` | Spegne il sensore |

```cpp
const int pinAlim = 7;
const int pinSensore = A0;
const int pinLed = 8;

const int SECCO = 1000;    // valore letto in aria / terra secca (da tarare)
const int BAGNATO = 350;   // valore letto nella terra bagnata (da tarare)
const int SOGLIA_PERCENTUALE = 30;

void setup() {
  pinMode(pinAlim, OUTPUT);
  pinMode(pinLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(pinAlim, HIGH);
  delay(100);
  int lettura = analogRead(pinSensore);
  digitalWrite(pinAlim, LOW);

  int percentuale = map(lettura, SECCO, BAGNATO, 0, 100);
  percentuale = constrain(percentuale, 0, 100);

  Serial.print("Lettura: ");
  Serial.print(lettura);
  Serial.print("  Umidita: ");
  Serial.print(percentuale);
  Serial.println(" %");

  if (percentuale < SOGLIA_PERCENTUALE) {
    digitalWrite(pinLed, HIGH);   // serve acqua!
  } else {
    digitalWrite(pinLed, LOW);
  }
  delay(2000);
}
```

## Fase 5: Verifica 🔍

Prima di tutto **tara** il sensore: leggi il valore con le sonde in aria (secco) e con le sonde in un bicchiere d'acqua (bagnato) e aggiorna `SECCO` e `BAGNATO`. Poi infilalo in un vaso: il LED si accende quando la terra è asciutta e si spegne dopo l'annaffiatura.

::: tip 💡 CONSIGLIO
Mettete a confronto due vasi con terra più o meno bagnata e disegnate un grafico delle letture nel tempo: quanto ci mette un vaso ad asciugarsi?
:::

::: info ℹ️ PER ANDARE OLTRE
Esistono sensori **capacitivi**, più costosi ma che non si corrodono perché non toccano l'acqua con parti metalliche. Funzionano con lo stesso codice, ma con valori di taratura diversi.
:::