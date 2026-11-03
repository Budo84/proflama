---
title: "0-La scheda Arduino UNO R3 - com'è fatta e come si alimenta - (Arduino)"
description: 'Conosciamo Arduino UNO R3: il microcontrollore, le memorie, i pin digitali, analogici e PWM, i pin di alimentazione, i limiti di corrente e i modi per alimentare la scheda.'
draft: false
date: 2026-11-03
category: Arduino
class_target: "2, 3, Tutti"
image: /img/robotica/arduino-teoria-scheda.webp
---

# 0-La scheda Arduino UNO R3 - com'è fatta e come si alimenta - (Arduino)

**Obiettivo:** Conoscere **com'è fatta la scheda Arduino UNO R3**: i componenti principali, le memorie, i **pin** (digitali, analogici, PWM e speciali), i pin di alimentazione, i **limiti di corrente** e i modi corretti per alimentarla.

**Concetti Chiave:**
- Microcontrollore ATmega328P e clock a 16 MHz
- Memorie: Flash, SRAM, EEPROM
- Pin digitali (D0-D13), pin PWM (~) e pin analogici (A0-A5)
- Pin di alimentazione: 5V, 3.3V, GND, VIN, IOREF, RESET, AREF
- Limiti di corrente: cosa può e cosa non può fare un pin
- USB, jack e VIN: come si alimenta la scheda

## Fase 1: Teoria 🧠

**Arduino UNO R3** è una scheda basata sul **microcontrollore ATmega328P**: un piccolo computer racchiuso in un solo chip, che esegue il programma che carichiamo (lo *sketch*), legge gli **ingressi** (pulsanti, sensori) e comanda le **uscite** (LED, buzzer, motori).

| Caratteristica | Valore |
|---|---|
| Microcontrollore | ATmega328P (8 bit) |
| Clock | 16 MHz |
| Tensione di funzionamento | 5 V |
| Alimentazione consigliata (jack o VIN) | 7-12 V (limite 6-20 V) |
| Pin digitali | 14 (D0-D13), di cui 6 con PWM |
| Pin analogici | 6 (A0-A5), convertitore a 10 bit |
| Corrente massima per pin I/O | 20 mA consigliati (40 mA massimo assoluto) |
| Corrente massima totale su tutti i pin | circa 200 mA |
| Corrente massima del pin 3.3V | 50 mA |
| Memoria Flash | 32 KB (0,5 KB occupati dal bootloader) |
| SRAM | 2 KB |
| EEPROM | 1 KB |
| Connessioni | USB tipo B, jack DC da 2,1 mm |

**Le tre memorie** hanno compiti diversi. Un'analogia aiuta a ricordarli:

| Memoria | A cosa serve | Cosa succede allo spegnimento | Analogia |
|---|---|---|---|
| **Flash** (32 KB) | Contiene il programma | Si conserva | Il libro di ricette |
| **SRAM** (2 KB) | Contiene le variabili mentre il programma gira | Si cancella | Il banco di lavoro |
| **EEPROM** (1 KB) | Dati da conservare (ad esempio un punteggio) | Si conserva | Il quaderno degli appunti |

- **Domanda alla classe:** *"Se carichiamo un nuovo programma, cosa succede a quello vecchio? E se scolleghiamo la scheda, che cosa perde Arduino?"*

## Fase 2: Com'è fatta la scheda 🔍

Prendi la scheda in mano (senza collegarla) e cerca questi componenti:

| Componente | A cosa serve | Come riconoscerlo |
|---|---|---|
| **Connettore USB tipo B** | Collega Arduino al computer: carica il programma e alimenta la scheda | Connettore metallico quadrato, di solito in un angolo |
| **Jack DC** | Alimentazione esterna (7-12 V) | Connettore cilindrico nero, vicino all'USB |
| **Regolatore di tensione** | Trasforma la tensione del jack in 5 V stabili | Piccolo componente a tre piedini vicino al jack |
| **ATmega328P** | Il microcontrollore: il "cervello" | Chip nero rettangolare, il più grande della scheda |
| **Quarzo a 16 MHz** | Dà il ritmo (clock) al microcontrollore | Piccolo componente metallico ovale |
| **Pulsante RESET** | Riavvia il programma dall'inizio | Pulsante in un angolo della scheda |
| **LED ON** | Indica che la scheda è alimentata | Piccolo LED verde |
| **LED L** | È collegato al pin D13: si può usare nei programmi | Piccolo LED vicino al pin 13 |
| **LED TX e RX** | Lampeggiano quando la scheda comunica con il computer | Due piccoli LED vicino all'USB |
| **Chip USB-seriale** (ATmega16U2) | Fa da interprete tra USB e microcontrollore | Chip più piccolo vicino al connettore USB |

<center>
	<img src="/img/robotica/arduino-teoria-scheda-anatomia.webp" alt="Arduino UNO R3 con i componenti principali indicati: USB, jack, regolatore, ATmega328P, quarzo, reset e LED" width="500"/>
</center>

::: tip 💡 CONSIGLIO
Molte schede "compatibili" Arduino hanno al posto dell'ATmega16U2 un chip **CH340**: funzionano allo stesso modo, ma sul computer può servire un driver da installare.
:::

## Fase 3: I pin 🔌

I **pin** sono i punti di collegamento con il mondo esterno. Sulla scheda sono raggruppati in file (le *header*).

**Pin digitali (D0-D13).** Possono essere **uscite** (`OUTPUT`: danno 0 V o 5 V) oppure **ingressi** (`INPUT`: leggono se c'è 0 V o 5 V). Il numero seguito dal simbolo **~** indica i pin con **PWM**.

**Pin PWM (~).** Sono **6**: **3, 5, 6, 9, 10, 11**. Con `analogWrite()` (valori da 0 a 255) permettono di regolare la luminosità di un LED o la velocità di un motore.

**Pin analogici (A0-A5).** Leggono una tensione da 0 a 5 V e la trasformano in un numero da **0 a 1023** (convertitore a 10 bit). Se serve, possono funzionare anche come pin digitali (A0-A5 = pin 14-19).

**Funzioni speciali** di alcuni pin:

| Pin | Funzione speciale |
|---|---|
| **D0 (RX)** e **D1 (TX)** | Comunicazione seriale con il computer: da evitare se si usa il monitor seriale |
| **D2** | Interrupt esterno INT0 |
| **D3** | PWM e interrupt esterno INT1 |
| **D10, D11, D12, D13** | Comunicazione SPI (SS, MOSI, MISO, SCK) |
| **D13** | LED integrato sulla scheda |
| **A4 (SDA) e A5 (SCL)** | Comunicazione I2C (per display, sensori, ...) |

**Pin di alimentazione:**

| Pin | Descrizione |
|---|---|
| **5V** | Uscita a 5 V regolati (o ingresso se si alimenta con 5 V esterni) |
| **3.3V** | Uscita a 3,3 V, massimo **50 mA** |
| **GND** | Massa: ce ne sono 3 sulla scheda, tutti collegati tra loro |
| **VIN** | Tensione in ingresso non regolata (7-12 V) oppure uscita se si alimenta dal jack |
| **IOREF** | Indica la tensione di funzionamento dei pin (5 V) |
| **RESET** | Se portato a GND riavvia la scheda |
| **AREF** | Tensione di riferimento per le letture analogiche (`analogReference`) |

<center>
	<img src="/img/robotica/arduino-teoria-pinout.webp" alt="schema dei pin di Arduino UNO R3 con pin digitali, PWM, analogici e di alimentazione" width="500"/>
</center>

## Fase 4: Limiti di corrente e alimentazione ⚡

**Quanta corrente può dare un pin?** Ogni pin I/O può fornire o ricevere al massimo **20 mA** in uso normale (**40 mA** è il limite assoluto, oltre il quale il chip si danneggia). In totale, tutti i pin insieme non devono superare circa **200 mA**. Per questo ai LED serve sempre una resistenza, e motori, relè e strisce LED non si collegano mai direttamente a un pin: si usano un **transistor** o un **driver**.

::: warning ⚠️ ATTENZIONE
Il pin **3.3V** può dare solo **50 mA**, e il pin **5V** è pensato per sensori e piccoli moduli: **non alimentare mai motori** dai pin di Arduino. Per motori e carichi forti usa un'alimentazione separata, collegando insieme i **GND**.
:::

**Come alimentare Arduino:**

| Modo | Tensione | Quando usarlo |
|---|---|---|
| **USB** dal computer | 5 V, circa 500 mA al massimo | Test e programmazione |
| **Jack DC** | 7-12 V (limite 6-20 V) | Pacco batterie o alimentatore: c'è un regolatore integrato |
| **Pin VIN** | 7-12 V | Come il jack, ma senza connettore |
| **Pin 5V** | 5 V regolati esterni | Solo con alimentatori stabilizzati a 5 V |

::: info ℹ️ ATTENZIONE ALL'ALIMENTAZIONE
Con una tensione di ingresso troppo alta (oltre 12 V) il regolatore si scalda molto. Con una tensione troppo bassa (sotto 7 V) la scheda può funzionare in modo instabile. Non collegare mai più di una sorgente di alimentazione alla volta sul pin 5V.
:::

## Fase 5: Attività pratica 💻

**Parte A - Caccia ai pin.** Con la scheda davanti a te, trova e segna su un foglio:
1. i **6 pin PWM** (quelli con il simbolo ~);
2. il pin **D13** e il LED **L** vicino a esso;
3. i pin **A4** e **A5** (I2C);
4. i **tre GND**;
5. i pin **5V**, **3.3V** e **VIN**.

**Parte B - Prova con il LED integrato.** Collega Arduino al computer con il cavo USB, apri l'IDE, scegli *Strumenti → Scheda → Arduino Uno* e la porta corretta, poi carica questo programma:

```cpp
// Il LED integrato è collegato al pin D13 (LED_BUILTIN)
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

Osserva: il LED **L** lampeggia ogni mezzo secondo e, durante il caricamento, i LED **TX** e **RX** si accendono.

**Parte C - Misura con il multimetro (insegnante).** Con la scheda alimentata e il multimetro su **tensione continua**, misura tra **GND** e **5V** (circa 5 V) e tra **GND** e **3.3V** (circa 3,3 V).

## Fase 6: Verifica ✅

1. Quali sono i 6 pin PWM di Arduino UNO? Come si riconoscono sulla scheda?
2. Qual è il valore massimo restituito da `analogRead()`? Perché proprio quello?
3. Quanta corrente può dare al massimo un pin in uso normale? Perché ai LED serve una resistenza?
4. Quale pin si usa per riavviare la scheda dall'esterno?
5. **Vero o falso:** *il pin 3.3V può alimentare un motore da 300 mA.*
6. Su quali pin si collega un dispositivo I2C?

::: details Soluzioni
1. I pin **3, 5, 6, 9, 10, 11**, riconoscibili dal simbolo **~**.
2. **1023**: il convertitore ha 10 bit, cioè 2¹⁰ = 1024 valori da 0 a 1023.
3. **20 mA**. La resistenza limita la corrente: senza di essa il LED assorbe troppo e si brucia, e il pin si danneggia.
4. Il pin **RESET**, portandolo a GND (oppure il pulsante RESET sulla scheda).
5. **Falso**: il pin 3.3V dà al massimo 50 mA, e un motore va alimentato separatamente.
6. **A4 (SDA)** e **A5 (SCL)**.
:::

::: tip 💡 CONSIGLIO
Per ripassare, disegna la scheda sul quaderno e colora con tre colori i pin **digitali**, **PWM** e **analogici**, e con il rosso quelli di **alimentazione**.
:::

::: info ℹ️ PER ANDARE OLTRE
Nelle prossime lezioni useremo questi pin con LED, pulsanti e sensori. Nella lezione sulla sintassi imparerai i comandi per leggerli e comandarli.
:::
