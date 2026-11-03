---
title: 00-Sintassi e comandi principali (Arduino)
description: 'mpariamo a scrivere uno sketch: struttura setup e loop, variabili e tipi di dato, operatori, if, switch, for, while, funzioni, array e i comandi fondamentali per leggere e comandare i pin.'
draft: false
date: 2026-11-03
category: Arduino
class_target: "2, 3, Tutti"
image: /img/robotica/arduino-teoria-sintassi.webp
---

# 00-Sintassi e comandi principali (Arduino)

**Obiettivo:** Imparare a **leggere e scrivere uno sketch Arduino**: la struttura del programma, le **variabili**, gli **operatori**, le **strutture di controllo** (`if`, `switch`, `for`, `while`), le **funzioni** e i comandi principali per pin, tempo e monitor seriale.

**Concetti Chiave:**
- Struttura di uno sketch: `setup()` e `loop()`
- Tipi di dato, variabili, costanti e visibilità (scope)
- Operatori aritmetici, di confronto e logici (`=` diverso da `==`)
- Strutture di controllo: `if/else`, `switch`, `for`, `while`
- Funzioni e array
- Comandi: `pinMode`, `digitalWrite`, `digitalRead`, `analogRead`, `analogWrite`, `delay`, `millis`, `Serial`, `map`, `constrain`, `random`

## Fase 1: Teoria - la struttura di uno sketch 🧠

Un programma Arduino si chiama **sketch** e si scrive in un linguaggio basato sul C++. Ha sempre due funzioni obbligatorie:

```cpp
void setup() {
  // eseguita UNA SOLA VOLTA all'accensione o al reset
}

void loop() {
  // eseguita all'infinito, ripetutamente
}
```

- **`setup()`**: serve per le impostazioni iniziali (ad esempio dire se un pin è ingresso o uscita).
- **`loop()`**: contiene il programma vero e proprio, che si ripete all'infinito.

**Regole di scrittura (sintassi):**

| Regola | Esempio |
|---|---|
| Ogni istruzione finisce con **;** | `digitalWrite(13, HIGH);` |
| I blocchi di codice stanno tra **{ }** | `void loop() { ... }` |
| Commento su una riga: **//** | `// accendo il LED` |
| Commento su più righe: **/* ... */** | `/* testo lungo */` |
| Maiuscole e minuscole sono **diverse** | `digitalWrite` è corretto, `DigitalWrite` no |

::: warning ⚠️ ATTENZIONE
Gli errori più comuni dei principianti sono: dimenticare il **;**, dimenticare di chiudere una **}** e scrivere male maiuscole e minuscole. L'IDE segnala l'errore in rosso nella parte bassa della finestra.
:::

- **Domanda alla classe:** *"Cosa succede se in loop() non mettiamo nessun delay()? Quante volte al secondo viene ripetuto?"*

## Fase 2: Variabili e tipi di dato 📦

Una **variabile** è una "scatola con un'etichetta" in cui il programma conserva un valore. Si **dichiara** indicando il tipo e il nome:

```cpp
int ledPin = 13;      // numero intero
float temperatura = 21.5;  // numero con la virgola
bool acceso = true;   // vero o falso
```

| Tipo | Contiene | Intervallo | Esempio |
|---|---|---|---|
| `bool` | vero / falso | `true` o `false` | `bool acceso = false;` |
| `byte` | intero piccolo positivo | 0 ... 255 | `byte luce = 128;` |
| `int` | intero | -32768 ... 32767 | `int contatore = 0;` |
| `unsigned int` | intero positivo | 0 ... 65535 | `unsigned int n = 40000;` |
| `long` | intero grande | circa ±2 miliardi | `long grande = 100000;` |
| `unsigned long` | intero grande positivo | 0 ... circa 4,29 miliardi | `unsigned long t = millis();` |
| `float` | numero con la virgola | circa 6-7 cifre significative | `float v = 3.14;` |
| `char` | un carattere | un simbolo tra apici singoli | `char c = 'A';` |
| `String` | testo | una parola o frase tra virgolette | `String nome = "Ciao";` |

::: info ℹ️ REGOLA PRATICA
Per i pin e i contatori usa `int` o `byte`. Per i tempi misurati con `millis()` usa sempre **`unsigned long`**. La SRAM è solo 2 KB: non sprecarla con tipi troppo grandi.
:::

**Costanti.** Per valori che non cambiano mai (ad esempio il numero di un pin) si usa `const` oppure `#define`:

```cpp
const int LED = 9;     // consigliato: ha un tipo e Arduino controlla gli errori
#define BUTTON 7       // senza tipo e SENZA punto e virgola
```

**Costanti già pronte:** `HIGH` (5 V), `LOW` (0 V), `INPUT`, `OUTPUT`, `INPUT_PULLUP`, `LED_BUILTIN` (pin 13).

**Visibilità (scope).** Una variabile dichiarata **fuori** da tutte le funzioni è **globale** (la vedono tutte). Una dichiarata **dentro** una funzione è **locale** (esiste solo lì dentro).

```cpp
int globale = 0;       // visibile ovunque

void loop() {
  int locale = 5;      // visibile solo dentro loop()
  globale = locale;
}
```

## Fase 3: Operatori ➕

| Tipo | Operatori | Esempio |
|---|---|---|
| Aritmetici | `+  -  *  /  %` | `7 % 3` vale 1 (resto della divisione) |
| Assegnazione | `=  +=  -=  ++  --` | `n++` equivale a `n = n + 1` |
| Confronto | `==  !=  <  >  <=  >=` | `a == 5` |
| Logici | `&&` (AND), `\|\|` (OR), `!` (NOT) | `(a > 3) && (b < 10)` |

::: warning ⚠️ ATTENZIONE: `=` NON È `==`
`=` **assegna** un valore (`x = 5;` mette 5 in x). `==` **confronta** (`x == 5` chiede "x vale 5?"). Scrivere `if (x = 5)` è un errore classico: il programma non confronta, ma assegna!
:::

**Attenzione alla divisione tra interi:** `7 / 2` dà **3**, non 3,5. Per avere il decimale scrivi `7 / 2.0`.

## Fase 4: Strutture di controllo 🔀

### if / else - prendere decisioni

```cpp
if (temperatura > 25) {
  digitalWrite(ventola, HIGH);
} else if (temperatura < 18) {
  digitalWrite(stufa, HIGH);
} else {
  digitalWrite(ventola, LOW);
}
```

### switch - più casi su uno stesso valore

```cpp
switch (modo) {
  case 1:
    digitalWrite(8, HIGH);
    break;          // senza break il programma continua nel caso successivo!
  case 2:
    digitalWrite(9, HIGH);
    break;
  default:
    digitalWrite(8, LOW);
}
```

### for - ripetere un numero noto di volte

```cpp
for (int i = 0; i < 5; i++) {   // parte da 0, continua finché i < 5, aumenta di 1
  digitalWrite(13, HIGH);
  delay(200);
  digitalWrite(13, LOW);
  delay(200);
}                               // il LED lampeggia 5 volte
```

### while - ripetere finché una condizione è vera

```cpp
while (digitalRead(7) == LOW) {
  // resta qui finché il pulsante non viene premuto
}
```

::: tip 💡 CONSIGLIO
Usa `for` quando sai **quante volte** ripetere, `while` quando ripeti **finché succede qualcosa**.
:::

## Fase 5: Funzioni e array 🧩

**Funzioni.** Una funzione è un blocco di codice con un nome, che si può richiamare quando serve. Rende lo sketch più ordinato e senza ripetizioni.

```cpp
void lampeggia(int pin, int volte) {   // void = non restituisce nulla
  for (int i = 0; i < volte; i++) {
    digitalWrite(pin, HIGH);
    delay(200);
    digitalWrite(pin, LOW);
    delay(200);
  }
}

int somma(int a, int b) {              // int = restituisce un intero
  return a + b;
}

void loop() {
  lampeggia(13, 3);                    // chiamata alla funzione
  int s = somma(2, 3);                 // s vale 5
}
```

**Array.** Un array è una "fila di scatole" con lo stesso tipo di dato, numerate a partire da **0**.

```cpp
int leds[] = {2, 3, 4, 5};      // 4 elementi: leds[0] = 2 ... leds[3] = 5

void setup() {
  for (int i = 0; i < 4; i++) {
    pinMode(leds[i], OUTPUT);   // imposta tutti i pin con un ciclo
  }
}
```

::: warning ⚠️ ATTENZIONE
Un array di 4 elementi ha indici da **0 a 3**. Usare `leds[4]` significa leggere fuori dall'array: Arduino non dà errore, ma il risultato è imprevedibile.
:::

## Fase 6: I comandi principali 🛠️

| Comando | Cosa fa | Esempio |
|---|---|---|
| `pinMode(pin, modo)` | Imposta un pin come `INPUT`, `OUTPUT` o `INPUT_PULLUP` | `pinMode(13, OUTPUT);` |
| `digitalWrite(pin, valore)` | Porta un pin a `HIGH` (5 V) o `LOW` (0 V) | `digitalWrite(13, HIGH);` |
| `digitalRead(pin)` | Legge un pin digitale: restituisce `HIGH` o `LOW` | `int s = digitalRead(7);` |
| `analogRead(pin)` | Legge un pin analogico: restituisce **0-1023** | `int v = analogRead(A0);` |
| `analogWrite(pin, valore)` | PWM sui pin ~: valore **0-255** | `analogWrite(9, 128);` |
| `delay(ms)` | Ferma il programma per ms millisecondi | `delay(1000);` |
| `millis()` | Millisecondi trascorsi dall'accensione | `unsigned long t = millis();` |
| `tone(pin, freq)` / `noTone(pin)` | Suono (buzzer) alla frequenza in Hz / lo spegne | `tone(4, 1000);` |
| `map(v, da1, a1, da2, a2)` | Converte un valore da un intervallo a un altro | `map(v, 0, 1023, 0, 255)` |
| `constrain(v, min, max)` | Limita un valore tra un minimo e un massimo | `constrain(x, 0, 255)` |
| `random(min, max)` | Numero casuale da min a max-1 | `random(1, 7)` dà 1...6 |

**Il monitor seriale** permette ad Arduino di "parlare" con il computer: serve per controllare i valori letti dai sensori.

```cpp
void setup() {
  Serial.begin(9600);                 // avvia la comunicazione a 9600 baud
}

void loop() {
  int valore = analogRead(A0);
  Serial.print("Valore: ");           // scrive senza andare a capo
  Serial.println(valore);             // scrive e va a capo
  delay(500);
}
```

Per vederlo: *Strumenti → Monitor seriale* (e scegli 9600 baud).

::: info ℹ️ delay() O millis()?
`delay()` **blocca tutto**: durante l'attesa Arduino non legge i pulsanti e non fa altro. Con `millis()` si controlla il tempo senza fermare il programma, e si possono fare più cose "insieme":

```cpp
unsigned long ultimo = 0;

void loop() {
  if (millis() - ultimo >= 1000) {   // è passato 1 secondo?
    ultimo = millis();
    digitalWrite(13, !digitalRead(13));   // inverte il LED
  }
  // qui si possono leggere pulsanti e sensori senza ritardi
}
```
:::

## Fase 7: Attività pratica 💻

**Esempio completo: pulsante e LED con luminosità regolabile.**

Circuito: LED con resistenza da 220 Ω sul pin 9, potenziometro sul pin A0, pulsante con pull-down da 10 kΩ sul pin 7.

```cpp
const int LED = 9;
const int POT = A0;
const int BTN = 7;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BTN, INPUT);
  Serial.begin(9600);
}

void loop() {
  int lettura = analogRead(POT);                 // 0-1023
  int luce = map(lettura, 0, 1023, 0, 255);      // converte in 0-255

  if (digitalRead(BTN) == HIGH) {                // pulsante premuto
    analogWrite(LED, luce);
  } else {
    analogWrite(LED, 0);
  }

  Serial.println(luce);
  delay(50);
}
```

Prova a **modificare** il programma: cosa succede se togli `map()`? E se usi `constrain(luce, 20, 200)`?

## Fase 8: Verifica ✅

1. Cosa fa la funzione `setup()`? Quante volte viene eseguita?
2. Che differenza c'è tra `=` e `==`?
3. Quale valore massimo restituisce `analogRead()`, e quale valore massimo accetta `analogWrite()`?
4. Quanto vale `7 / 2` con numeri interi? E `7 % 2`?
5. Scrivi un ciclo `for` che accende e spegne il LED sul pin 13 per 10 volte.
6. Perché per i tempi si usa `unsigned long` con `millis()`?
7. **Sfida:** scrivi uno sketch che legge un valore da A0 e accende il LED sul pin 8 solo se il valore supera 512.

::: details Soluzioni
1. Imposta lo sketch (ad esempio i pin) ed è eseguita **una sola volta**, all'accensione o al reset.
2. `=` assegna un valore; `==` confronta due valori.
3. `analogRead()` restituisce fino a **1023**, `analogWrite()` accetta fino a **255**: per passare dall'uno all'altro si usa `map()`.
4. `7 / 2` vale **3** (la parte decimale si perde); `7 % 2` vale **1** (il resto).
5. ```cpp
for (int i = 0; i < 10; i++) {
  digitalWrite(13, HIGH);
  delay(300);
  digitalWrite(13, LOW);
  delay(300);
}
```
6. Perché `millis()` restituisce numeri molto grandi, che un `int` non riesce a contenere.
7. ```cpp
void setup() {
  pinMode(8, OUTPUT);
}

void loop() {
  if (analogRead(A0) > 512) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
}
```
:::

::: tip 💡 IN SINTESI
Uno sketch ha `setup()` (una volta) e `loop()` (sempre). Le **variabili** conservano i dati, gli **operatori** li confrontano e le **strutture di controllo** decidono cosa fare. Con `pinMode`, `digitalWrite/Read` e `analogWrite/Read` si comandano i pin; con `delay` e `millis` si gestisce il tempo; con `Serial` si controllano i valori.
:::