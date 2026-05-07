---
title: 12-Il Parcheggio Smart (Accesso Automatizzato con Conteggio) 🅿️🤖
description: 'Comprendere il controllo angolare di un servo, usare variabili come contatori e gestire la logica "a cascata" (if-then-else if) per realizzare un parcheggio smart.'
draft: false
date: 2026-05-07
category: Microbit
class_target: "1, 2, 3"
image: /img/robotica/parcheggio.webp
---
# 12-Il Parcheggio Smart (Accesso Automatizzato con Conteggio) 🅿️🤖

**Hardware:**  Micro:bit + Microcar, 1x Servo SG90 (sbarra su P10), Sensore Ultrasuoni.

**Obiettivo:** Comprendere il controllo angolare di un servo, usare variabili come contatori e gestire la logica "a cascata" (if-then-else if).

## Fase 1: L'Apertura Meccanica 🏗️🕹️


**Obiettivo:** Far alzare la sbarra quando un'auto (o una mano) si avvicina. Non contiamo ancora.

**Logica (Teoria):** Dobbiamo dire al Micro:bit: "Se vedi qualcosa a meno di 10cm, apri la sbarra per 2 secondi, poi richiudila".

### 🧩 La composizione dei Blocchi (Sprint 1):

1.  **On start (All'avvio):** Inizializziamo il servo in posizione di chiusura.
    *   `servomotore scrivi pin [P10] angolo [90]` (Sbarra abbassata).
2.  **Forever (Per sempre):** Il ciclo di controllo.
    *   Crea la variabile `distanza`.
    *   `imposta [distanza] a (Ultrasonic port (cm))` (Dalla categoria MiniCar).
    *   Inserisci un blocco **`se ... allora ... altrimenti`**:
    *   **Condizione:** **`se [distanza] < [10]`**:
    	*  _(Dentro il "SE" - Sequenza Apertura)_
    		*   `servomotore scrivi pin [P10] angolo [180]` (Sbarra alzata).
    		*   `pausa (ms) [2000]` (Attesa 2 secondi per far passare l'auto).
    		*   `servomotore scrivi pin [P10] angolo [90]` (Sbarra abbassata).
    		*   `pausa (ms) [200]` (Tempo tecnico per il movimento).
    *  _(Dentro "ALTRIMENTI")_
    	*   `servomotore scrivi pin [P10] angolo [90]` (Assicurati che rimanga chiusa se non c'è nessuno).

**Test 1:** Avvicinando la mano al sensore, la sbarra si alza, aspetta e si riabbassa.



## Fase 2: Il Contatore e il "Tutto Pieno" 🔢🚫
 

**Obiettivo:** Introduciamo la variabile `contatore`. La sbarra si apre solo se c'è posto (contatore \< 5). Quando arriva a 5, mostra "PIENO".

### 🧩 La composizione dei Blocchi (Sprint 2):

1.  **On start (All'avvio):**
    *   `servomotore scrivi pin [P10] angolo [90]`
    *   `imposta [contatore] a [0]` (Il parcheggio è vuoto all'inizio).
2.  **Forever (Per sempre):** _Modifichiamo la logica dentro l'if della distanza._
    *   **Se `distanza < 10`**:
        *   Dobbiamo fare un secondo controllo: c'è posto?
        *   Inserisci un blocco **`se [contatore] < [5]`** dentro l'if della distanza.
        	*  _(Dentro il "SE contatore \< 5")_
        		*   Esegui la **Sequenza Apertura** vista nello Sprint 1.
        		*   `pausa (ms) [200]` (Tempo tecnico per il movimento).
        		*   `cambia [contatore] per [1]` (Incrementa di 1).
        		*   `mostra numero (contatore)` (Opzionale: feedback visivo).
        * _(ALTRIMENTI del "SE contatore \< 5")_
        	*   `mostra stringa "PIENO"`
        	*   `servomotore scrivi pin [P10] angolo [90]` (Sbarra ferma, non si apre).

**Test 2:** Avvicinando la mano 5 volte, il numero sale. Alla sesta volta, la sbarra non si alza e il Micro:bit scrive "PIENO".


## Fase 3: Gestire l'Uscita (Tasto A) 🔙🆓


**Obiettivo:** Aggiungere il pulsante A per far uscire le auto. La sbarra si apre, il contatore scende di 1. Non scendiamo sotto lo zero e mostriamo "LIBERO".

### 🧩 La composizione dei Blocchi (Sprint 3):

_Questa parte va inserita all'interno del `forever`, ma in una sezione separata o in un blocco `on button A pressed`._ Usando il codice nella tua foto, l'hai messa nel `forever`, subito dopo i blocchi della distanza.

1.  **Forever (Per sempre):** _(Aggiungiamo la logica dopo la gestione dell'ingresso)_
    *   Inserisci un nuovo blocco **`se ... allora ... altrimenti`**:
    *   **Condizione:** **`se pulsante A premuto`**:
    	*  _(Dentro il "SE pulsante A premuto")_
    		*   Dobbiamo controllare se c'è almeno un'auto dentro per farla uscire.
   		 	*   Inserisci un blocco **`se [contatore] > [0]`** dentro l'if del pulsante A.
    	* _(Dentro il "SE contatore \> 0")_
    		*   Esegui la **Sequenza Apertura** vista nello Sprint 1.
    		*   `pausa (ms) [200]` (Tempo tecnico per il movimento).
    		*   `cambia [contatore] per [-1]` (Decrementa di 1).
    		*   `mostra numero (contatore)` (Opzionale: feedback visivo).
   	* _(ALTRIMENTI del "SE contatore \> 0")_
    	*   `mostra stringa "LIBERO"` (O "VUOTO").
   		*   `servomotore scrivi pin [P10] angolo [90]` (Sbarra ferma).


<center>
	<img src="/img/robotica/parcheggio2.png" alt="parcheggio2.png" width="500"/>
</center>



## Fase 4: Debugging Finale e Problem Solving 🔧

Fai un collaudo completo in classe. Ecco cosa succede solitamente:

*   **Il servo "scotta" o vibra:** L'angolo 180° o 90° è troppo estremo per il meccanismo meccanico della tua sbarra. **Modifica gli angoli nel codice** (es. 160° per aperto e 100° per chiuso).
*   **Doppio conteggio:** Se una macchina ci mette troppo a passare, il sensore la legge due volte. Alza la pausa di apertura (da 2000ms a 3000ms).


