---
title: 4-Primi Passi e Curve (Controllo Motori)
description: 'Comprendere il sistema di trazione a due ruote (guida differenziale), imparare a controllare la velocità e la direzione dei motori e creare una sequenza di movimento (Avanti, Indietro, Destra, Sinistra). Imparare a far ruotare il robot agendo sulla velocità dei singoli motori.'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 4-Primi Passi e Curve (Controllo Motori) 🏎️

**Obiettivo:** Comprendere il sistema di trazione a due ruote (guida differenziale), imparare a controllare la velocità e la direzione dei motori e creare una sequenza di movimento (Avanti, Indietro, Destra, Sinistra). Imparare a far ruotare il robot agendo sulla velocità dei singoli motori.

**Concetti Chiave:**

*   Trazione differenziale (come si curva con due sole ruote motrici).
*   Controllo della velocità tramite PWM.
*   Sequenze temporizzate (l'uso del blocco `pause`).


## Fase 1: Teoria - La Meccanica del Movimento ⚙️

*   **I Due Motori:** Il robot ha due motori indipendenti già integrati nella piastra di base. Non c'è uno sterzo come nelle automobili normali!
*   **Come Curva? (Guida Differenziale):** 

	* Per andare **Avanti**: entrambi i motori girano in avanti alla stessa velocità.

   *   Per **Curvare a Destra**: il motore sinistro gira in avanti, mentre il motore destro si ferma (o gira all'indietro per una curva stretta).
   
*   **Il Cervello dei Motori:** La nostra microbit non dà direttamente la corrente ai motori. Invia istruzioni a un chip che a sua volta usa segnali PWM per dire a un altro componente di far girare i motori. La velocità massima dei motori è di 200RPM (giri al minuto).
   
*   **Energia Critica:** Imotori consumano molta energia. Il robot deve essere alimentato dalle tre batterie AAA (che forniscono 4.5V in totale ) inserite nell'apposito alloggiamento. Senza batterie accese, il robot non si muoverà!
    

## Fase 2: Avanti e Indietro (Il Test di Base) 🛣️

Facciamo avanzare il robot per 2 secondi, poi lo facciamo indietreggiare per 2 secondi e infine lo fermiamo.

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Input** | `on button A pressed` | Usiamo il pulsante A per avviare la sequenza in sicurezza. | Blocco principale. |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 100`** *Diciamo a TUTTI i motori (All) di andare Avanti (Forward) a velocità 100.* | Dentro `on button A`. |
| **Basic** | `pause` | **`pause (ms) 2000`** *Mantiene i motori accesi in quella direzione per 2 secondi.* | Sotto il blocco motore. |
| **MiniCar** | `motor...` | **`motor = All Direction = Backward speed = 100`** *Inverte la marcia (Backward)._*| Sotto la pausa. |
| **Basic** | `pause` | **`pause (ms) 2000`** *Mantiene la retromarcia per 2 secondi.* | Sotto il blocco motore. |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 0`** *Velocità 0 significa STOP. È fondamentale per non far schiantare il robot!* | Alla fine della sequenza. |


<center>
	<img src="/img/robotica/minicarmotor1.png" alt="minicarmotor1.png" width="300"/>
</center>


**Test:** Posizionare i robot a terra (non sui banchi per evitare cadute!), accendere l'interruttore delle batterie e premere A.



## Fase 3: La Danza del Robot (Curvare) 🔄

Ora che sappiamo andare dritti, impariamo a curvare modificando la direzione dei singoli motori.

*"Se una macchina normale usa il volante per girare le ruote, come fa un robot che ha solo due ruote fisse?"*

*   **La Logica delle Curve:**
    *   **Curva a destra:** Motore Sinistro AVANTI, Motore Destro FERMO.
    *   **Rotazione sul posto (destra):** Motore Sinistro AVANTI, Motore Destro INDIETRO. (Il robot ruota sul suo asse centrale).
    *   **Curva a sinistra:** Motore Sinistro FERMO, Motore Destro AVANTI.

Andiamo nella categoria **MiniCar** di MakeCode. Non useremo il blocco generico "Run Forward", ma i blocchi specifici:

*   `motor Left speed [-255 to 255]`
*   `motor Right speed [-255 to 255]`

**Regola d'oro:** Valore **positivo** (es. 150) = La ruota gira in **avanti**.

*   Valore **negativo** (es. -150) = La ruota gira all'**indietro**.
*   Valore **0** = La ruota si **ferma**.

Dobbiamo programmare il robot affinché, alla pressione del **Tasto A**, esegua una coreografia: avanti, rotazione a destra, rotazione a sinistra e inchino finale.

| Movimento | Motore Sinistro (L) | Motore Destro (R) |
| :--- | :--- | :--- |
| **Avanti** | 150 | 150 |
| **Ruota a Destra** | 150 | -150 |
| **Ruota a Sinistra** | -150 | 150 |
| **Indietro** | -150 | -150 |
| **Stop** | 0   | 0   |

### Lo Schema dei comandi (Tabella per i ragazzi):

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
| :--- | :--- | :--- | :--- |
| **Input** | `on button A pressed` | Creiamo una nuova sequenza sul pulsante A. | Blocco principale. |
| **MiniCar** | `motor...` | **`motor = A = Forward speed = 100`** 
|||**`motor = B = Backward speed = 100`** *Il robot ruota su se stesso verso Sinistra.* | Dentro `on button A`. |
| **Basic** | `pause` | **`pause (ms) 500`** *Ruota per mezzo secondo.* | Sotto il blocco motore. |
| **MiniCar**| | **`motor = A = Backward speed = 100`** 
|||**`motor = B = Forward speed = 100`**  *Il robot ruota su se stesso verso Destra.* | Sotto la pausa. |
| **Basic** | `pause` | **`pause (ms) 500`** | Sotto il blocco motore. |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 0`** *STOP finale.* | Alla fine. |


<center>
	<img src="/img/robotica/minicarmotor2.png" alt="minicarmotor2.png" width="300"/>
</center>


**Test:** Premendo A, il robot dovrebbe fare un rapido "zig-zag" ruotando prima a sinistra e poi a destra.



## Fase 4: Sfida e Debugging 🏁


*   **La Sfida del Quadrato:** "Riuscire a programmare il robot in modo che, premendo A+B, percorra un quadrato perfetto sul pavimento e torni al punto di partenza?"
    *   *(Suggerimento: calibrare esattamente i millisecondi del blocco `pause` durante la curva per fare un angolo di 90 gradi).*

**Risoluzione dei problemi (Debugging):**

*   **Il robot non si muove ma il micro:bit è acceso:** Le batterie sono cariche? L'interruttore del robot (Power switch) è posizionato su ON?
    
*   **Il robot gira in tondo invece di andare dritto:** Un motore potrebbe essere bloccato fisicamente o la velocità impostata nel codice potrebbe essere diversa tra destra e sinistra. Assicurarsi di usare `motor = All` per andare dritti.

*   **Il robot va al contrario:** I cavi dei motori potrebbero essere invertiti, ma siccome sono integrati, il problema è nel codice: verificare di aver scelto `Forward` e non `Backward`.