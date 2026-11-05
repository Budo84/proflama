---
title: 16-La fotoresistenza - la luce notturna automatica (Arduino)
description: 'Misuriamo la luce con una fotoresistenza e accendiamo un LED al buio con un circuito a partitore di tensione.'
draft: false
date: 2026-11-05
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-arduino-fotoresistenza.webp
---

# 16-La fotoresistenza - la luce notturna automatica (Arduino)

**Obiettivo:** Misurare la quantità di luce con una **fotoresistenza (LDR)** e costruire una **luce notturna automatica**.

**Concetti Chiave:**
- Resistenza che dipende dalla luce
- Partitore di tensione con resistore fisso
- Soglia di intervento
- Taratura con il monitor seriale

## Fase 1: Teoria 🧠

La **fotoresistenza** (LDR) cambia valore secondo la luce: al buio può superare **1 MΩ**, alla luce scende a poche centinaia di ohm. Non ha polarità: si monta in qualsiasi verso.

Arduino non misura le resistenze ma le **tensioni**: per questo mettiamo la LDR in serie con un resistore fisso da **10 kΩ** formando un **partitore di tensione**. Il punto in mezzo è collegato ad **A0**:

- più luce → la LDR scende di resistenza → la tensione su A0 **sale**;
- meno luce → la LDR sale di resistenza → la tensione su A0 **scende**.

Scegliamo poi una **soglia**: sotto quel valore il LED si accende.

- **Domanda alla classe:** *"Perché una luce notturna dovrebbe accendersi da sola? Dove la vedete usata nella vita di tutti i giorni?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Breadboard**
* 1x **Fotoresistenza (LDR)**
* 1x **Resistore da 10 kΩ**
* 1x **LED** + 1x **resistore da 220 Ω**
* Cavi jumper maschio-maschio

#### Cablaggio
1. LDR tra **5V** e una riga libera (punto centrale).
2. Resistore da **10 kΩ** tra lo stesso punto centrale e **GND**.
3. Dal punto centrale un cavo verso **A0**.
4. LED: pin **8** → resistore 220 Ω → anodo, catodo → GND.

<center>
	<img src="/img/robotica/base-arduino-fotoresistenza-cablaggio.webp" alt="fotoresistenza e resistore da 10 kiloohm formano un partitore collegato ad A0" width="300"/>
</center>

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> pin 8 uscita, monitor seriale attivo
- *Per sempre* -> leggi A0; se il valore è sotto la soglia accendi il LED, altrimenti spegnilo

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| `loop()` | `analogRead(A0)` | Legge la luce da 0 (buio) a 1023 (molta luce) |
| `loop()` | `if (luce < soglia)` | Confronta con la soglia scelta |
| `loop()` | `Serial.println(luce);` | Mostra i valori per tarare la soglia |

```cpp
const int pinLdr = A0;
const int pinLed = 8;
const int soglia = 400;   // da tarare con il monitor seriale

void setup() {
  pinMode(pinLed, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int luce = analogRead(pinLdr);
  Serial.println(luce);
  if (luce < soglia) {
    digitalWrite(pinLed, HIGH);
  } else {
    digitalWrite(pinLed, LOW);
  }
  delay(100);
}
```

## Fase 5: Verifica 🔍

Copri la fotoresistenza con la mano: il LED deve accendersi. Scopri: si spegne. Se non funziona bene, guarda i numeri nel monitor seriale con luce e al buio e sposta la soglia a metà tra i due valori.

::: tip 💡 CONSIGLIO
La soglia giusta dipende dall'aula. Fai misurare alla classe il valore con la luce accesa e con la mano sopra, poi calcolare insieme il valore medio da usare.
:::

::: info ℹ️ PER ANDARE OLTRE
Per evitare che il LED lampeggi quando la luce è proprio vicina alla soglia si usano **due soglie** diverse (accensione e spegnimento): si chiama isteresi.
:::