---
title: 20-Il motore passo-passo 28BYJ-48 (Arduino)
description: ''
draft: false
date: 2026-11-10
category: "Officina-Robotica, Arduino"
class_target: "2, 3, Tutti"
image: /img/robotica/base-arduino-passo-passo.webp
---

# 20-Il motore passo-passo 28BYJ-48 (Arduino)

**Obiettivo:** Comandare un **motore passo-passo** 28BYJ-48 con driver ULN2003 e muoverlo di un numero **preciso di passi**.

**Concetti Chiave:**
- Motore passo-passo: rotazione a scatti precisi
- Bobine eccitate in sequenza
- Driver ULN2003
- Libreria `Stepper`: velocità, passi, verso

## Fase 1: Teoria 🧠

Un **motore passo-passo** non gira in modo continuo: avanza di un piccolo **passo** ogni volta che le sue bobine vengono alimentate nella sequenza giusta. Per questo si può dirgli di muoversi di un numero **preciso** di passi, ed è usato in stampanti 3D e plotter.

Il **28BYJ-48** ha un riduttore: servono circa **2048 passi** per un giro completo (in modalità standard). Non può essere collegato direttamente ad Arduino: usiamo la scheda driver con chip **ULN2003**, che amplifica i segnali e ha quattro LED che mostrano le bobine attive.

La velocità massima è bassa, circa **10-15 giri al minuto**: è un motore forte e preciso, ma lento.

- **Domanda alla classe:** *"In quali macchine a casa o a scuola pensate che sia importante muoversi di una distanza precisa e non solo girare?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **Arduino Uno**
* 1x **Motore passo-passo 28BYJ-48** con scheda driver ULN2003
* Alimentazione a 5V (dal pin 5V di Arduino per le prove, o pacco batterie 4 × AA)
* 6x Cavi jumper maschio-femmina

#### Cablaggio
1. **IN1** del driver → pin **8**.
2. **IN2** → pin **9**.
3. **IN3** → pin **10**.
4. **IN4** → pin **11**.
5. Alimentazione del driver: **+** → **5V**, **-** → **GND**.
6. Il motore si innesta nel connettore bianco del driver, nel verso obbligato.

<center>
	<img src="/img/robotica/base-arduino-passo-passo-cablaggio.webp" alt="motore passo-passo 28BYJ-48 con driver ULN2003 collegato ai pin da 8 a 11 di Arduino" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
Per prove brevi basta il 5V di Arduino, ma per un uso prolungato è meglio un'alimentazione separata (con il GND in comune con Arduino), altrimenti la scheda può riavviarsi.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *All'avvio* -> imposta la velocità a 10 giri al minuto
- *Per sempre* -> un giro in senso orario, pausa, un giro in senso antiorario, pausa

## Fase 4: Scrittura del Codice 💻

| Sezione | Istruzione | Funzione |
|---|---|---|
| inizio | `#include <Stepper.h>` | Carica la libreria |
| inizio | `Stepper motore(2048, 8, 10, 9, 11);` | Passi per giro e pin (nota l'ordine 8, 10, 9, 11) |
| `setup()` | `motore.setSpeed(10);` | Velocità in giri al minuto |
| `loop()` | `motore.step(2048);` | Un giro orario; con `-2048` antiorario |

```cpp
#include <Stepper.h>

const int PASSI_PER_GIRO = 2048;

// L'ordine dei pin per il 28BYJ-48 è IN1, IN3, IN2, IN4
Stepper motore(PASSI_PER_GIRO, 8, 10, 9, 11);

void setup() {
  motore.setSpeed(10);   // giri al minuto (max circa 15)
}

void loop() {
  motore.step(PASSI_PER_GIRO);    // un giro in senso orario
  delay(1000);
  motore.step(-PASSI_PER_GIRO);   // un giro in senso antiorario
  delay(1000);
}
```

## Fase 5: Verifica 🔍

Il motore fa un giro in un verso, si ferma e torna indietro. I LED del driver si accendono in sequenza. Se il motore vibra senza ruotare, quasi sempre l'ordine dei pin è sbagliato: ricontrolla `8, 10, 9, 11` nel codice.

::: tip 💡 CONSIGLIO
Prova mezzo giro (`1024` passi) o un quarto (`512`) e attacca un'asticella o un indicatore di cartoncino: è un ottimo modo per mostrare il controllo preciso dell'angolo.
:::

::: info ℹ️ PER ANDARE OLTRE
La libreria `Stepper` blocca il programma finché il motore non finisce di muoversi. Per fare altre cose nel frattempo si usa una libreria come `AccelStepper`.
:::
