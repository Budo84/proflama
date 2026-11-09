---
title: 16-Il relè - comandare un carico (Arduino)
description: 'Usiamo un modulo relè come interruttore comandato per accendere e spegnere un carico a bassa tensione.'
draft: false
date: 2026-11-06
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-rele.webp
---

# 16-Il relè - comandare un carico (Arduino)

**Obiettivo:** Usare un **modulo relè** per accendere e spegnere un carico a bassa tensione, capendo i contatti **COM, NO e NC**.

**Concetti Chiave:**
- Relè: interruttore comandato da un elettromagnete
- Contatti COM, NO (normalmente aperto), NC (normalmente chiuso)
- Isolamento tra circuito di comando e di carico
- Sicurezza elettrica

## Fase 1: Teoria 🧠

Il **relè** è un interruttore azionato da una piccola bobina: quando Arduino la attiva, un contatto meccanico scatta con il tipico "click". Il circuito di comando e quello del carico sono **separati**.

I tre contatti del carico:

- **COM**: comune
- **NO** (Normally Open): normalmente **aperto**, si chiude quando il relè scatta
- **NC** (Normally Closed): normalmente **chiuso**, si apre quando il relè scatta

Il modulo ha tre pin di comando: **VCC** (5V), **GND** e **IN** (segnale). Molti moduli sono **attivi bassi**: il relè scatta quando IN va a **LOW**.

- **Domanda alla classe:** *"Perché non possiamo collegare una lampada a 230 V direttamente a un pin di Arduino? E perché con il relè si può?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Modulo relè** a 1 canale (5 V)
* 1x **Carico a bassa tensione**: LED con resistore, oppure lampadina 6 V con portabatterie
* Cavi jumper

#### Cablaggio
1. **VCC** → **5V**, **GND** → **GND**, **IN** → pin **7**.
2. Carico: batteria **+** → **COM**; **NO** → carico (lampadina/LED con resistore) → batteria **-**.

<center>
	<img src="/img/robotica/base-arduino-rele-cablaggio.webp" alt="modulo relè collegato al pin 7 di Arduino con una lampadina a bassa tensione" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
In classe usa **solo carichi a bassa tensione** (batterie fino a 9 V). **Non collegare mai la tensione di rete (230 V)**: è pericolosa e va maneggiata solo da personale qualificato.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Per sempre* -> attiva il relè per 2 secondi, disattivalo per 2 secondi

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `setup()` | `digitalWrite(7, HIGH);` | Parte con il relè spento (se il modulo è attivo basso) |
| `loop()` | `digitalWrite(7, LOW);` | Attiva il relè (modulo attivo basso) |
| `loop()` | `digitalWrite(7, HIGH);` | Disattiva il relè |

```cpp
const int pinRele = 7;

void setup() {
  pinMode(pinRele, OUTPUT);
  digitalWrite(pinRele, HIGH);   // modulo attivo basso: parte spento
}

void loop() {
  digitalWrite(pinRele, LOW);    // relè attivo: si sente il click
  delay(2000);
  digitalWrite(pinRele, HIGH);   // relè disattivato
  delay(2000);
}
```

## Fase 5: Verifica 🔍

Senti il click del relè e la lampadina si accende e si spegne ogni 2 secondi. Se il comportamento è invertito, il tuo modulo è "attivo alto": scambia LOW e HIGH nel codice.

::: tip 💡 CONSIGLIO
Sposta il carico dal contatto **NO** al **NC**: cosa cambia? Fallo notare alla classe.
:::

::: info ℹ️ PER ANDARE OLTRE
Il relè è lento e si consuma con l'uso: non usarlo per regolare la luminosità con il PWM. Per quello serve un transistor (lezione sul motore).
:::
