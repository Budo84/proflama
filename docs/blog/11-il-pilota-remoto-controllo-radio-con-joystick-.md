---
title: 11-Il Pilota Remoto (Controllo Radio con Joystick) 🕹️🏎️
description: 'Leggere i valori analogici dei pin X e Y del joystick, creare una "Zona Morta" di sicurezza e far comunicare due Micro:bit usando un canale radio privato.'
draft: false
date: 2026-04-22
category: Microbit
class_target: "1, 2, 3"
image: /img/robotica/minicar-radio.webp
---

# 11-Il Pilota Remoto (Controllo Radio con Joystick) 🕹️🏎️


## Fase 1: Brainstorming e Teoria 🧠

*   **Domanda alla classe:** *"Qual è la differenza tra l'interruttore della luce di casa e la manopola del volume dello stereo?"*

*   **Digitale vs Analogico:** Un pulsante normale (Digitale) dice solo ACCESO (1) o SPENTO (0). Il Joystick è **Analogico**: ci dice *esattamente* in che posizione si trova, restituendo un numero da **0 a 1023**.

*   **Gli Assi:** Il joystick si muove su due linee immaginarie:
    *   **Asse X (Orizzontale):** Destra e Sinistra.
    *   **Asse Y (Verticale):** Su e Giù.
    *   Quando lasciamo la levetta al centro (a riposo), il valore non è 0, ma è esattamente a metà strada: circa **512**.

*   **Il Segreto della "Zona Morta":** Le molle del joystick non sono perfette. Al centro potrebbero leggere 505 o 525. Se dicessimo al robot "Fermati solo se leggi 512", il robot tremerebbe di continuo! Per questo, nel codice, creeremo una "Zona Morta" di sicurezza (tra 400 e 600): in questo spazio, il robot ignorerà i comandi e resterà fermo.



## Fase 2: Il Trasmettitore (Programmare il Joystick)💻


Prendiamo il **primo Micro:bit** (il telecomando). Qui tradurremo i movimenti fisici della levetta, letta attraverso i Pin, in numeri segreti da inviare via radio. _(Nota: verificate lo schema elettrico. Solitamente l'asse X è su **P1** e l'asse Y è su **P2**, o viceversa)._

| Sezione | Blocco | Azione e Funzione |
| :--- | :---: | :--- |
| **Radio** | `on start` | **`radio set group 11`**_(Il canale privato! Ogni gruppo in classe deve avere un numero diverso per non pilotare le macchine degli altri)._ |
| **Basic** | `forever` | Il ciclo di ascolto continuo. |
| **Logic** | `if...` | **`if (analog read pin P4) > 700 then`**_(Se spingo  Su)_  $\to$  **`radio send number 1`** |
| **Logic** | `else if...` | **`else if (analog read pin P4) < 300 then`**_(Se spingo Giù)_  $\to$  **`radio send number 2`** |
| **Logic** | `else if...` | **`else if (analog read pin P3) > 700 then`**_(Se spingo in Destra)_  $\to$  **`radio send number 3`** |
| **Logic** | `else if...` | **`else if (analog read pin P3) < 300 then`**_(Se spingo Sinistra)_  $\to$  **`radio send number 4`** |
| **Logic** | `else` | **`else`**_(La Zona Morta: se il joystick è al centro tra 400 e 600)_  $\to$  **`radio send number 0`** |



<center>
	<img src="/img/robotica/minicar-radio2.png" alt="minicar-radio2.png" width="450"/>
</center>



## Fase 3: Il Ricevitore (Programmare la Mini Car)💻

Mettiamo da parte il telecomando e prendiamo il **secondo Micro:bit** (quello da inserire nel robot). Questo non deve leggere nessun joystick: deve solo "ascoltare" la radio ed eseguire gli ordini!

| Sezione | Blocco | Azione e Funzione |
| :--- | :---: | :--- |
| **Radio** | `on start` | **`radio set group 11`**_(Fondamentale: deve essere identico al numero scelto per il joystick!)_ |
| **Radio** | `on radio received` | **`on radio received receivedNumber`**_(Questo blocco si sveglia solo quando arriva un pacchetto radio)._ |
| **Logic** | `if...` | **`if receivedNumber = 1 then`**  $\to$  `motor All Forward speed 100` |
| **Logic** | `else if...` | **`else if receivedNumber = 2 then`**  $\to$  `motor All Backward speed 100` |
| **Logic** | `else if...` | **`else if receivedNumber = 4 then`**  $\to$  `motor All Turn_Right speed 100` |
| **Logic** | `else if...` | **`else if receivedNumber = 3 then`**  $\to$  `motor All Turn_Left speed 100` |
| **Logic** | `else` | **`else`**  $\to$  `motor All Forward speed 0` (Freno!). |



<center>
	<img src="/img/robotica/minicar-radio3.png" alt="minicar-radio3.png" width="450"/>
</center>



## Fase 4: Collaudo, Cablaggio e "Tuning"  🔧


Questa è la fase dove i ragazzi si trasformano in veri ingegneri e affrontano i problemi del mondo reale.

1.  **Controllo del Cablaggio (Joystick  $\to$  Micro:bit):**
    *   Assicurarsi che il filo del **GND** sia su GND e il **VCC/3V** sia sui 3 Volt.
    *   Verificare che l'asse X (VRx) sia nel pin giusto (es. P3) e l'asse Y (VRy) nel pin giusto (es. P4).
2.  **Debugging Attivo (Problem Solving in Classe):**
    *   _Problema:_ "Prof, spingo in avanti ma la macchina va a sinistra!"
    *   _Causa:_ Assi invertiti! Il filo dell'asse Y è stato collegato al Pin che il codice crede sia l'asse X.
    *   _Soluzione Hardware:_ Scambiate fisicamente i fili di P3 e P4 sul Micro:bit del joystick.
    *   _Problema:_ "Spingo in avanti e la macchina va all'indietro!"
    *   _Causa:_ Il joystick è montato capovolto, oppure la logica dei numeri 3 e 4 è invertita.
    *   _Soluzione Software:_ Sul codice del **Robot**, scambiate le istruzioni `Forward` e `Backward` dentro gli `if` dei numeri 3 e 4.



### 🌟 Bonus didattico a fine lezione:

Fate notare ai ragazzi la pulizia del codice: il Micro:bit sulla macchina  non sa cos'è un joystick e non sa cos'è una "zona morta". Fa solo quello che gli dice il numero in arrivo. È il Micro:bit del telecomando ad essere il vero "Cervello" che fa tutti i calcoli matematici!.