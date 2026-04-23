---
title: 7-Il Robot Esploratore 2 (Evita-Ostacoli) 🤖
description: 'Progettare, codificare e calibrare un veicolo a guida autonoma. Comprendere il paradigma Sense Think Act(Senti Pensa Agisci) e il concetto di "Tuning" (calibrazione) dei parametri fisici.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 7-Il Robot Esploratore 2 (Evita-Ostacoli) 🤖

**Obiettivo:** Progettare, codificare e calibrare un veicolo a guida autonoma. Comprendere il paradigma *Sense-Think-Act* (Senti-Pensa-Agisci) e il concetto di *"Tuning"* (calibrazione) dei parametri fisici.

## Fase 1: Brainstorming e Teoria 🧠

*   **Domanda alla classe:** *"Pensate ai robot aspirapolvere (come il Roomba) o alle auto a guida autonoma. Come fanno a decidere quando girare senza l'intervento umano?"*
*   **Il Paradigma S-T-A:** fondamentale della robotica:
    1.  **Sense (Senti):** Il robot acquisisce dati dal mondo fisico. Nel nostro caso, usa la porta a ultrasuoni.
    2.  **Think (Pensa):** Il micro:bit elabora i dati. Qui entra in gioco la Logica Condizionale (`if / else`).
    3.  **Act (Agisci):** Il robot esegue un'azione meccanica. 
    
*   **Nozioni Hardware Avanzate (per i più curiosi):** I motori possono raggiungere una velocità di 200 RPM (giri al minuto). Se andiamo alla massima velocità, l'auto percorrerà troppo spazio prima che il sensore riesca a fare una seconda lettura, causando uno schianto!

## Fase 2: Progettazione dello Pseudocodice  📝

Scrivere su un foglio (o alla lavagna) le "regole" del robot in italiano semplice.

*   **Esercizio Guidato:**
    *   *Cosa facciamo sempre?* -\> Misuriamo la distanza.
    *   *Qual è la nostra distanza di sicurezza?* -\> Decidiamo insieme una soglia, ad esempio 15 cm.
    *   *Regola 1:* SE la distanza è minore di 15 cm, ALLORA frena, fai retromarcia, girati.
    *   *Regola 2:* ALTRIMENTI (la strada è libera), ALLORA vai dritto.

## Fase 3: Scrittura del Codice 💻

Tradurre lo pseudocodice nei blocchi dell'estensione `MiniCar`.

| Sezione | Blocco | Istruzione e Funzione Pedagogica |
| :--- | :--- | :--- |
| **Variables** | `Make Variable` | Crea **`distanza`**. Insegna che i dati sensoriali vanno sempre "salvati" in un contenitore prima di usarli. |
| **Basic** | `forever` | Il ciclo infinito. Un robot autonomo non "dorme" mai. |
| **Variables** | `set...to` | **`set distanza to (Ultrasonic distance)`** |
| **Logic** | `if...then...else` | Inseriamo il blocco decisionale. |
| **Logic** | `0 < 0` | **`if distanza < 15 then`** (La nostra condizione di pericolo). |
| **MiniCar** | `motor...` | **[DENTRO IL SE] `motor = All Direction = Backward speed = 100`** *Perché non giriamo subito?* Se giri mentre sei vicinissimo al muro, la coda del robot urterà l'ostacolo. Prima bisogna indietreggiare! |
| **Basic** | `pause` | **`pause (ms) 400`** (Tempo di retromarcia). |
| **MiniCar** | `motor...` | **`motor = All Direction = Turn_Right speed = 100`** |
| **Basic** | `pause` | **`pause (ms) 300`** (Tempo di rotazione). |
| **MiniCar** | `motor...` | **[DENTRO ALTRIMENTI] `motor = All Direction = Forward speed = 80`** *Perché velocità 80 e non 200?* Per dare il tempo al sensore a ultrasuoni di processare i rimbalzi del suono prima dell'impatto. |


<center>
	<img src="/img/robotica/minicaresp1.png" alt="minicaresp1.png" width="300"/>
</center>


## Fase 4: Collaudo e "Tuning" dei Parametri 🔧

*   **Creare il Recinto:** Usa zaini o libri per creare un labirinto a terra.
*   **Analisi degli Errori (Debugging Attivo):**
    *   *Errore:* Il robot vede il muro, ma sbatte prima di fermarsi.
    *   *Analisi Insieme:* Perché succede? "Prof, va troppo veloce!". Esatto. Chiedi loro di abbassare la `speed` del comando `Forward` a 60, oppure di alzare la soglia di allarme da 15 a 25 cm.
    *   *Errore:* Il robot si ferma, fa retromarcia, ma quando riparte guarda ancora il muro.
    *   *Analisi Insieme:* Non si è girato abbastanza! Chiedi loro di aumentare il tempo del blocco `pause` dopo il comando `Turn_Right` (da 300 ms a 600 ms).

### Fase 5: Estensioni e Chiusura  🚀

Per i gruppi che finiscono prima e hanno calibrato il robot alla perfezione, assegna delle mini-sfide da integrare:

1.  **Feedback Visivo:** Accendere i LED RGB di Verde nell'`else` e di Rosso lampeggiante nell'`if`.
2.  **Panico:** Se la distanza scende improvvisamente sotto i 5 cm (ostacolo mobile, come un piede), far fermare tutto a velocità 0 e riprodurre un suono di allarme (`play tone`).
3. **Autonomia-Condizionata** Esplorare le distanze prima di scegliere dove andare e spostarsi nella direzione dove la distanza rilevata è maggiore.