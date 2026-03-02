---
title: 6-Comunicare con la Luce (LED RGB)
description: 'Capire come comporre i colori e usare le attese.
'
draft: false
date: 2026-02-25
category: Mbot
class_target: "Elementari, Tutti"
image: /img/mbot/polizia.png
---

# 6-Comunicare con la Luce (LED RGB)


**Obiettivo:** Capire come comporre i colori e usare le attese.

*   **Teoria:**
    *   I LED RGB hanno 3 canali: Red (Rosso), Green (Verde), Blue (Blu).
    *   Se accendo Rosso + Blu = Viola.
    *   Se accendo Rosso + Verde = Giallo.
    *   Se accendo tutto = Bianco.
*   **Pratica:**
    *   Creare le luci della polizia (Lampeggiante) o un semaforo.
*   **Il Codice (Esempio Polizia):**
 
    [Quando si clicca su bandiera verde]
    
    [Per sempre]
    
       [Accendi tutti i LED col colore (Rosso) per (0) sec]
              
       [Attendi (0.2) secondi]
       
       [Accendi tutti i LED col colore (Blu) per (0) sec]
       
       [Attendi (0.2) secondi]

<center>
	<img src="/img/mbot/polizia2.png" alt="polizia2.png" width="300"/>
</center>

*Nota: Senza "Attendi", le luci cambierebbero così velocemente che l'occhio umano vedrebbe un viola fisso.*

<center>
	<img src="/img/mbot/polizia.png" alt="polizia2.png" width="300"/>
</center>


