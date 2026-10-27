---
title: 10-Il sensore PIR - rilevare il movimento (Arduino)
description: 'Rileviamo il passaggio di una persona con il sensore di movimento PIR e accendiamo un LED.'
draft: false
date: 2026-10-27
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-pir.webp
---

# 10-Il sensore PIR - rilevare il movimento (Arduino)


**Obiettivo:** Usare un sensore **PIR** per rilevare il movimento di una persona e costruire un piccolo **allarme**.

**Concetti Chiave:**
- Raggi infrarossi emessi dai corpi caldi
- Sensore digitale: movimento sì / no
- Tempo di riscaldamento del sensore
- Regolazione di sensibilità e durata

## Fase 1: Teoria 🧠

Il sensore **PIR** (Passive InfraRed, HC-SR501) rileva i cambiamenti di **calore** davanti a sé. Ogni corpo emette infrarossi: quando una persona si muove, il sensore vede una variazione e porta l'uscita a **HIGH**.

Non rileva chi sta fermo, e tutto ciò che è a temperatura costante non lo attiva. Ha due trimmer sul retro: **sensibilità** (distanza fino a circa 7 m) e **durata** dell'uscita alta (pochi secondi o minuti).

**Importante:** appena alimentato ha bisogno di **30-60 secondi** di calibrazione: in questo tempo può dare falsi allarmi.

- **Domanda alla classe:** *"Perché una persona ferma davanti al sensore non viene rilevata?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Sensore PIR HC-SR501**
* 1x **LED** + 1x **resistore da 220 Ω**
* Cavi jumper

#### Cablaggio
1. **VCC** → **5V**.
2. **OUT** → pin digitale **2**.
3. **GND** → **GND**.
4. LED: pin **8** → 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-pir-cablaggio.webp" alt="sensore PIR collegato al pin 2 di Arduino e LED sul pin 8" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> aspetta 30 secondi per la calibrazione
- *Per sempre* -> se il sensore è HIGH accendi il LED, altrimenti spegnilo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `delay(30000);` | Attesa di calibrazione del PIR |
| `loop()` | `digitalRead(2)` | HIGH se rileva movimento |

```cpp
const int pinPir = 2;
const int pinLed = 8;

void setup() {
  pinMode(pinPir, INPUT);
  pinMode(pinLed, OUTPUT);
  Serial.begin(9600);
  Serial.println("Calibrazione...");
  delay(30000);
  Serial.println("Pronto");
}

void loop() {
  if (digitalRead(pinPir) == HIGH) {
    digitalWrite(pinLed, HIGH);
    Serial.println("Movimento!");
  } else {
    digitalWrite(pinLed, LOW);
  }
  delay(100);
}
```

## Fase 5: Verifica 🔍

Dopo il messaggio "Pronto", agita una mano davanti al sensore: il LED si accende e rimane acceso per il tempo impostato dal trimmer. Poi si spegne.

::: tip 💡 CONSIGLIO
Prova a girare il trimmer della sensibilità e a misurare a che distanza il sensore rileva una persona che cammina.
:::