---
title: 13-Il Labirinto Intelligente (L'Algoritmo dello Sguardo)
description: 'Insegnare al robot a scansionare l''ambiente, usare le variabili come "memoria" per ricordare le misurazioni e prendere una decisione complessa confrontando i dati.'
draft: false
date: 2026-04-25
category: Mbot
class_target: "Elementari"
image: /img/robotica/labirinto.webp
---

# 13-Il Labirinto Intelligente (L'Algoritmo dello Sguardo)

**Obiettivo:** Insegnare al robot a scansionare l'ambiente, usare le variabili come "memoria" per ricordare le misurazioni e prendere una decisione complessa confrontando i dati.

## 🧠 Teoria: La "Memoria" del Robot

Come si comporta un esploratore quando arriva a un vicolo cieco? Non gira a caso. Si ferma, guarda a destra, guarda a sinistra e poi decide di andare verso la strada più libera. Per fare questo, il robot ha bisogno di **tre "scatole" magiche (le Variabili)**:

1.  **distanza**: per misurare quanto spazio c'è davanti.
2.  **destra**: per "ricordare" lo spazio visto a destra.
3.  **sinistra**: per "ricordare" lo spazio visto a sinistra.

**Il segreto del tempo:** Se il robot impiega **0.8 secondi** per girare di 90°, quando deve passare da "tutto a destra" a "tutto a sinistra" dovrà girare per **1.6 secondi** (il doppio!), perché deve attraversare il centro.

## 🛠️ Pratica: Il Labirinto a "T"

1.  Costruite un incrocio a forma di "T" usando libri o scatole.
2.  Posizionate mBot nel corridoio che punta verso il muro.
3.  **L'Algoritmo**: Il robot avanzerà finché non trova un ostacolo. A quel punto si fermerà, farà la scansione e sceglierà la via d'uscita più larga.

## 💻 Il Codice: Analisi Passo-Passo

* \[Quando si avvia mBot(mcore)\] 
* \[Attendi (5) secondi\] _(Pausa per posizionare il robot a terra)_ 
* \[Per sempre\] 
	* _(Fase 1: Controllo la strada davanti)_ 
		* \[Imposta la variabile (distanza) a (Sensore ultrasuoni porta 3)\] 
		* \[SE (distanza \< 15) ALLORA\] _(C'è un muro!)_

	  * (Fase 2: Mi fermo e guardo a DESTRA)*
  			* [Ferma il movimento]
  			* [Ruota a destra alla potenza (30) per (0.8) sec]
  			* [Imposta la variabile (destra) a (Sensore ultrasuoni porta 3)]
  
  			* (Fase 3: Guardo a SINISTRA)*
  			* [Ruota a sinistra alla potenza (30) per (1.6) sec] *(Tempo doppio per ruotare di 180°)*
  			* [Imposta la variabile (sinistra) a (Sensore ultrasuoni porta 3)]
  
  			* (Fase 4: Torno al CENTRO e DECIDO)*
  			* [Ruota a destra alla potenza (30) per (0.8) sec] *(Torno a guardare avanti)*
  
  			* [SE (destra > sinistra) ALLORA] *(Lo spazio a destra è maggiore?)*
     			* [Ruota a destra alla potenza (30) per (0.8) sec]
     			* [Vai avanti alla potenza (30)%]
  			* [ALTRIMENTI] *(No, è più grande a sinistra!)*
     			* [Ruota a sinistra alla potenza (30) per (0.8) sec]
     			* [Vai avanti alla potenza (30)%]

		* \[ALTRIMENTI\] _(Strada libera)_ \[Vai avanti alla potenza (30)%\]


<center>
	<img src="/img/robotica/Screenshot_2026-04-24_alle_12_opt.webp" alt="Screenshot_2026-04-24_alle_12_opt.webp" width="300"/>
</center>


## 🚀 Sfida per la classe: Il Vicolo Cieco

"Ragazzi, abbiamo creato un robot intelligentissimo. Ma cosa succede se mBot finisce in un corridoio chiuso dove sia a destra che a sinistra ci sono muri vicini (es. meno di 5 cm)? Provate a ragionare: come potremmo dirgli di tornare indietro?"


<center>
	<img src="/img/robotica/labirinto.webp" alt="labirinto.webp" width="300"/>
</center>

