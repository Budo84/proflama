---
title: 11-I Sensi del Robot (Input vs Output)
description: 'Distinguere tra inviare comandi (Output) e leggere dati (Input) e far comunicare il robot fisico con lo schermo del computer.'
draft: false
date: 2026-03-09
category: Mbot
class_target: "Elementari, Tutti"
image: /img/mbot/mbot.png
---

# 11-I Sensi del Robot (Input vs Output)

**Obiettivo:** Distinguere tra inviare comandi (Output) e leggere dati (Input) e far comunicare il robot fisico con lo schermo del computer.

* **Teoria:** Noi esseri umani abbiamo occhi (vista) e orecchie (udito) con cui il nostro cervello riceve informazioni. Il robot usa invece i sensori: il Sensore Ultrasuoni (i suoi "Occhi") può misurare le distanze. 

* **Input:** Il mondo entra nel computer (leggere i dati del sensore).
 
* **Output:** Il computer agisce sul mondo (inviare comandi ai motori o far parlare un personaggio a schermo). Per far comunicare il robot (Dispositivo) con il Panda (Sprite), dobbiamo creare una Variabile: immaginala come una scatola in cui il computer conserva un valore. Questa scatola speciale può essere letta e condivisa sia dai Dispositivi che dagli Sprite.


* **Pratica:**

1. Collegare mBot al computer.

2. Assicurarsi che mBlock sia impostato sulla modalità **"Dal vivo" (Live)** : in questo modo mBot rimane in comunicazione costante con il programma per fare i test in tempo reale.
 
3. Andare nella categoria "Variabili" e creare una nuova variabile chiamata `Distanza`.

4. I bambini mettono la mano davanti al robot e vedono il numero nel fumetto del Panda cambiare sullo schermo.

* **Il Codice:** *Servono due programmi separati che partiranno insieme cliccando la bandiera verde.*

1. Codice per mBot (Vai sulla scheda "Dispositivi" e seleziona mBot ): Il robot legge il sensore continuamente e infila il numero nella scatola della variabile.

* [Quando si clicca su bandiera verde] 
* [Per sempre] 
  * [Porta la variabile (Distanza) a (Sensore ultrasuoni porta 3 distanza(cm))]


<center>
	<img src="/img/mbot/ultrasuoni1.png" alt="ultrasuoni1.png" width="300"/>
</center>


2. Codice per il Panda (Vai sulla scheda "Sprite" e seleziona il Panda ): Il Panda guarda dentro la scatola della variabile e dice il numero ad alta voce.


* [Quando si clicca su bandiera verde] 
* [Per sempre] 
  * [Dire (Distanza)]


<center>
	<img src="/img/mbot/ultrasuoni2.png" alt="ultrasuoni2.png" width="300"/>
</center>

 
    
**Attività:** I bambini mettono la mano davanti al robot e vedono il numero nel fumetto del Panda cambiare.
