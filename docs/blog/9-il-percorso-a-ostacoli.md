---
title: 9-Il percorso a ostacoli
description: 'Riuscire a completare un percorso'
draft: false
date: 2026-02-25
category: Mbot
class_target: "Elementari, Tutti"
image: /img/mbot/percorso.png
---

# 9-Il percorso a ostacoli

**Obiettivo:** Riuscire a completare un percorso.

*   **Scenario:**
    *   Preparare un percorso a terra usando nastro adesivo.
    *   Il percorso ha: Un rettilineo (A), una curva a destra (B), un rettilineo corto (C) e una zona di arrivo (D).
    *   Non si può usare il telecomando! Bisogna programmarlo prima.
*   **Svolgimento:**
    1.  Le squadre misurano il percorso.
    2.  Calcolano i tempi (Es: "Per fare il tratto A servono 2 secondi").
    3.  Scrivono il codice.
    4.  **Test:** Provano. Se il robot esce di strada, tornano al PC a correggere i tempi (Debugging).
    5.  **Gara Finale:** Chi arriva alla fine senza uscire dal nastro?

    
*   **Il Codice (Sarà diverso per ogni percorso, ma simile a questo):**
    
   [Quando si clicca su bandiera verde]
    
   [Attendi (2) secondi] *Tempo per togliere le mani dal robot*
    
   [Vai in (avanti) a potenza (50) per (3.5) sec] *Primo rettilineo*
    
   [Gira a (destra) a potenza (50) per (0.65) sec] *Curva*
    
   [Vai in (avanti) a potenza (50) per (2) sec] *Secondo rettilineo*
   
   [Accendi tutti i LED col colore (Verde)] *Arrivo!*
   
   [Ferma il movimento]


<center>
	<img src="/img/mbot/percorso2.png" alt="percorso2.png" width="300"/>
</center>

Provare a far suonare il robot alla fine.


<center>
	<img src="/img/mbot/percorso.png" alt="percorso.png" width="500"/>
</center>
