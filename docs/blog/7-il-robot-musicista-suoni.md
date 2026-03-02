---
title: 7-Il Robot Musicista (Suoni)
description: 'Usare il buzzer per creare sequenze sonore.
'
draft: false
date: 2026-02-25
category: Mbot
class_target: "Elementari, Tutti"
image: /img/mbot/musicista.png
---

# 7-Il Robot Musicista (Suoni)

**Obiettivo:** Usare il buzzer per creare sequenze sonore.

*   **Teoria:**
    *   Il robot ha un "Buzzer" (cicalino).
    *   Possiamo scegliere la Nota (Do, Re, Mi...) e la Durata (Battute).
    *   Mezza battuta (0.5) è veloce, una battuta (1.0) è lenta.
*   **Pratica:**
    *   Far suonare "Fra Martino" o una scala semplice.
    *   Associare il suono a un movimento (Il robot canta mentre si muove?). 

*Attenzione: In mBot standard, il blocco "Suona nota per X secondi" ferma il codice finché la nota non finisce. Per farlo muovere E suonare insieme serve una programmazione parallela (due cappelli "Quando clicco bandiera").*

*   **Il Codice (Semplice sequenziale):**
    
    [Quando si clicca su bandiera verde]
    
    [Riproduci nota (C4) per (0.5) battute]
    
    [Vai in (avanti) a potenza (50) per (0.5) sec]
    
    [Riproduci nota (D4) per (0.5) battute]
    
    [Vai in (indietro) a potenza (50) per (0.5) sec]

<center>
	<img src="/img/mbot/musicista2.png" alt="musicista2.png" width="300"/>
</center>    

* **Sfida**: prova ora a unire il programma precedente con questo e a far suonare il robot come la sirena della polizia e fai accendere a ritmo i Led


<center>
	<img src="/img/mbot/musicista.png" alt="musicista.png" width="500"/>
</center>


