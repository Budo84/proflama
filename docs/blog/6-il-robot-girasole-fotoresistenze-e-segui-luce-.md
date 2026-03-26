---
title: 6-Il Robot Girasole (Fotoresistenze e Segui-Luce) 🌻🔦
description: 'Scoprire come funzionano i sensori di luce (fotoresistenze), leggere i loro valori e programmare il robot per inseguire una fonte luminosa, come una falena o un girasole'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---

# 6-Il Robot Girasole (Fotoresistenze e Segui-Luce) 🌻🔦

**Obiettivo:** Scoprire come funzionano i sensori di luce (fotoresistenze), leggere i loro valori e programmare il robot per inseguire una fonte luminosa, come una falena o un girasole.

**Concetti Chiave:**

*   Cos'è una fotoresistenza (sensore analogico).
*   Confronto tra due variabili (`Luce Destra` vs `Luce Sinistra`).
*   Controllo differenziale dei motori in base agli input analogici.


### Fase 1: Teoria - Gli "Occhi" per la Luce 👁️

*   **La Fotoresistenza:** i due piccoli componenti sulla parte frontale della scheda del robot (vicino ai fari RGB) si chiamano *fotoresistenze*; sono resistenze speciali che fanno passare più o meno corrente a seconda di quanta luce le colpisce.
*   **Valori Analogici:** A differenza di un pulsante (acceso/spento), le fotoresistenze restituiscono un numero (da 0 a 255 nel nostro caso). Zero significa buio totale, numeri alti indicano molta luce.
*   **Come fa a seguire la luce?** Se punto una torcia a destra del robot, il sensore destro leggerà un valore più alto di quello sinistro. Il "cervello" (il nostro codice) capirà che deve far girare il robot verso destra.


### Fase 2: Il Test del Buio (Lettura dei Sensori) 📊

Prima di muoverci, dobbiamo capire che numeri inviano i due sensori.

| Sezione | Blocco | Istruzione e Funzione |
| :--- | :--- | :--- |
| **Variables** | `Make a Variable` | Crea due variabili: **`Luce_L`** (Sinistra) e **`Luce_R`** (Destra). |
| **Basic** | `forever` | Blocco principale continuo. |
| **Variables** | `set...to` | **`set Luce_L to (Get Light_L value)`** *Prende il blocco di lettura del sensore sinistro dall'estensione MiniCar.* |
| **Variables** | `set...to` | **`set Luce_R to (Get Light_R value)`** *Prende il valore del sensore destro.* |
| **Basic** | `show number` | Mostra prima `Luce_L`, poi usa `pause 500`, poi mostra `Luce_R`. (Serve solo per capire i numeri, poi toglieremo questi blocchi per non rallentare il robot). |



<center>
	<img src="/img/robotica/girasole1.png" alt="girasole1.png" width="300"/>
</center>


**Test in classe:** Scaricate il codice. Coprire con una mano il sensore sinistro e poi quello destro, osservando come cambiano i numeri sul display. *Qual è il valore di base della luce nell'aula? Qual è il valore se punto la torcia dello smartphone?* Segnatevi questi numeri (es. la luce normale è 50, la torcia è 150).


### Fase 3: Azione! (Programmare l'Inseguimento) 🏎️

Ora cancelliamo i blocchi `show number` e `pause` e inseriamo la vera intelligenza. Creiamo le condizioni per muoverci confrontando i due sensori.

| Sezione | Blocco | Istruzione e Funzione |
| :--- | :--- | :--- |
| **Logic** | `if...then...else` | Inseriamo questo grosso blocco sotto ai due `set` nel `forever`. |
| **Logic (Condizione 1)** | `... and ...` | **`if (Luce_L > 100) and (Luce_R > 100) then`** *(Sostituite 100 con il valore della vostra torcia). Se ENTRAMBI i sensori vedono una luce forte, la luce è dritta davanti a noi!* |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 80`** (Vai dritto). |
| **Logic (Condizione 2)** | `else if` | Cliccate sul "+" per aggiungere un "else if". **`if (Luce_L > Luce_R) then`**  *Se la luce a sinistra è maggiore di quella a destra...* |
| **MiniCar** | `motor...` | **`motor = All Direction = Turn_Left speed = 80`** (Girati a sinistra!). |
| **Logic (Condizione 3)** | `else if` | **`if (Luce_R > Luce_L) then`** *Se la luce a destra è maggiore...* |
| **MiniCar** | `motor...` | **`motor = All Direction = Turn_Right speed = 80`** (Girati a destra!). |
| **Logic (Condizione 4)** | `else` | **`else`** *Se non c'è luce forte (condizioni normali)...* |
| **MiniCar** | `motor...` | **`motor = All Direction = Forward speed = 0`** (Fermati e aspetta la torcia!). |


<center>
	<img src="/img/robotica/girasole2.png" alt="girasole2.png" width="300"/>
</center>



### Fase 4: Collaudo col "Cibo Luminoso" 🔦

Mettere i robot a terra. Ogni gruppo (o studente) deve usare la **torcia del proprio smartphone** come "esca" per far muovere il robot.

**Sfide e Debugging:**

*   **Il robot va sempre dritto anche senza torcia:** La soglia (es. 100) è troppo bassa e la normale luce della classe la fa scattare. Aumentate il valore nell'istruzione `if (Luce_L > 100) and (Luce_R > 100)`.
*   **Il robot "trema" tra destra e sinistra:** I due sensori stanno leggendo valori molto simili. Si può risolvere abbassando leggermente la velocità (es. `speed = 60`) per rendere i movimenti più dolci.
*   **Sfida Estrema:** Riuscire ad aggiungere l'uso dei fari RGB? (Es: se gira a sinistra, accende solo il faro sinistro lampeggiante, come una freccia della macchina!).

### Modifica Hardware e Software

I robot associati alla seconda (M_bitRobot) e terza estensione (Tiny Bot) non hanno i sensori di luce, per questo bisogna costruire un piccolo circuito e modificare il codice per la lettura dei segnali provenienti dai sensori.

**Materiale**

* Breadboard o una basetta millefori (richiede saldatore)
* 2 resisteze da $10k\Omega$
* 2 LDR (Light Dependent Resistor)
* cavi di collegamento

### Collegamenti Hardware

**M_bitRobot**

* **Sensore LDR_destro** collegare un capo del sensore a 3.3V.
* **Sensore LDR_destro** collegare l'altro capo del sensore alla **Resistenza** e poi al GND comune.
* Collegare la giunzione **Sensore LDR_destro** e **Resistenza** al Pin 4 a un capo del sensore.
* **Sensore LDR_sinistro** collegare un capo del sensore a 3.3V.
* **Sensore LDR_sinistro** collegare l'altro capo del sensore alla **Resistenza** e poi al GND comune.
* Collegare la giunzione **Sensore LDR_destro** e **Resistenza** al Pin 10 a un capo del sensore.

**Tiny_Bot**

* **Sensore LDR_destro** collegare un capo del sensore a 3.3V.
* **Sensore LDR_destro** collegare l'altro capo del sensore alla **Resistenza** e poi al GND comune.
* Collegare la giunzione **Sensore LDR_destro** e **Resistenza** al Pin 2 a un capo del sensore.
* **Sensore LDR_sinistro** collegare un capo del sensore a 3.3V.
* **Sensore LDR_sinistro** collegare l'altro capo del sensore alla **Resistenza** e poi al GND comune.
* Collegare la giunzione **Sensore LDR_destro** e **Resistenza** al Pin 1 a un capo del sensore.

### Programmazione

A differenza del robot MiniCar che ha dei blocchi specifici per i robot *M_bitRobot* e *Tiny_Bot* dobbiamo sostituire il codice relativo al sensore *LDR* con i rispettivi **PIN** attivi sulla scheda.


<center>
	<img src="/img/sensore-luce_mbitrobot_opt.webp" alt="sensore-luce_mbitrobot_opt.webp" width="400"/>
</center>

<center>
	<img src="/img/sensore_luce_tinybit_opt.webp" alt="sensore_luce_tinybit_opt.webp" width="400"/>
</center>

Con questo codice si può valutare la soglia di attivazione dei sensori. Il resto dei programmi va adattato secondo i blocchi delle estensioni specifiche.




 