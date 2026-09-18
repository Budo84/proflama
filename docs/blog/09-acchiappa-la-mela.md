---
title: 09-Acchiappa-la-Mela
description: 'gioco di interazione e velocità'
draft: false
date: 2026-09-18
category: Scratch
class_target: "Elementari, Tutti"
image: /img/scratch-logo.webp
---

# 09-Acchiappa-la-Mela

Questo progetto consoliderà l'uso del movimento e dei cicli, introducendo due concetti essenziali per i giochi: il punteggio (Variabili) e l'interazione (Se... allora).

## Fase 1: Prepariamo la scena (Sfondo e Attori)

Prima di programmare, dobbiamo preparare il "set" del nostro gioco.

**Sfondo**: Scegliete Blue Sky (o un altro sfondo all'aperto).

**Sprite**:

* Eliminate il gatto.

* Scegliete uno sprite che raccoglie, ad esempio Bowl (Ciotola) o un Cesto.

* Scegliete uno sprite da raccogliere, ad esempio Apple (Mela).

<div style="display: flex; justify-content: space-around;">
     <img src="/img/scratch/mela-ciotola2.png" style="width: 30%; object-fit: cover;">
     <img src="/img/scratch/mela-mela3.png" style="width: 20%; object-fit: cover;">
</div>


## Fase 2: Creiamo il Punteggio (Variabile)

Per rendere il gioco divertente, dobbiamo contare quante mele prendiamo. Scratch ha bisogno di una 'scatola' dove conservare questo numero. Questa scatola si chiama Variabile.

**Cosa fare**:

* Andate nel menù Variabili (Arancione scuro).

* Cliccate su Crea una Variabile.

* Scrivete il nome: Punti.

Assicuratevi che sia visibile sullo schermo in alto a sinistra.

**Il Codice dello Stage (Sfondo)**: Dobbiamo dire al gioco di azzerare i punti ogni volta che ricominciamo.

* Blocco: Quando si clicca su bandierina (Situazioni)

* Blocco: Porta [Punti] a 0.

Perché: altrimenti, se si riavvia il gioco, ti ritrovi i punti della partita precedente.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/scratch/mela-sfondo.png" style="width: 35%; object-fit: cover;">
     <img src="/img/scratch/mela-sfondo1.png" style="width: 40%; object-fit: cover;">
</div>

## Fase 3: Programmiamo la Ciotola (Il Giocatore)

**Obiettivo**: La ciotola deve muoversi a destra e sinistra seguendo il mouse, ma deve rimanere incollata al pavimento.

**I blocchi da usare**:

* Quando si clicca su bandierina (Situazioni)

Perché: È l'interruttore di accensione.

* Porta dimensioni a 150%

* Per sempre (Controllo)

Perché: Vogliamo controllare la ciotola per tutto il tempo, non solo per un attimo.

* Vai a x: ... y: ... (Movimento)

* Nello spazio della X inseriamo il blocco azzurro x del mouse (Sensori).

* Nello spazio della Y scriviamo noi il numero -100.

Perché: La X (orizzontale) cambia con la mano del giocatore. La Y (verticale) è bloccata in basso, così la ciotola non vola in cielo.

<center>
	<img src="/img/scratch/mela-ciotola4.png" alt="windows" width="300"/>
</center>

## Fase 4: Programmiamo la Mela (La logica del gioco)

Obiettivo: La mela deve comparire in alto in un punto a caso, cadere giù, e capire se è stata presa o se è caduta a terra.

**I blocchi da usare**:

* Quando si clicca su bandierina (Situazioni)

* Nascondi (Aspetto)

Perché: Non vogliamo vedere la mela ferma all'inizio del gioco.

* Per sempre (Controllo)

Perché: Vogliamo che le mele continuino a cadere all'infinito, una dopo l'altra.

(Dentro il "Per sempre", mettiamo questi blocchi):

* Vai a x: ... y: 180 (Movimento)

* Nello spazio della X mettiamo: numero a caso tra -200 e 200 (Operatori).

Perché: La mela parte dall'alto (y=180) ma ogni volta da un punto diverso a sinistra o destra. I bambini conoscono già questo trucco dai pesci!

* Mostra (Aspetto)

Perché: Ora che è in posizione, la facciamo apparire.

* Ripeti fino a quando... (Controllo)

Questo è il motore della caduta. Dobbiamo dirgli: "Continua a cadere FINCHÉ non succede qualcosa".

* Nello spazio esagonale mettiamo l'operatore O (verde), perché ci sono due motivi per fermarsi:

* Condizione A: sta toccando [Bowl]? (Sensori) -> L'abbiamo presa!

* Condizione B: posizione y < -170 (Operatori + Movimento) -> Ha toccato terra.

* Cambia y di -5 (Movimento) - Da mettere DENTRO il "Ripeti fino a quando"

Perché: Cambiare la Y di un numero negativo fa scendere lo sprite. Più il numero è grande (es. -10), più cade veloce.

(Subito DOPO il blocco "Ripeti fino a quando", controlliamo cosa è successo):

* Se <sta toccando [Bowl]?> allora (Controllo + Sensori)

Perché: Il ciclo di caduta è finito. Ora il computer deve chiedersi: "Perché si è fermata? L'ha presa il giocatore?".

* Avvia riproduzione suono Pop (Suono) - Dentro il SE

Perché: Dà soddisfazione sentire che l'abbiamo presa.

* Cambia [Punti] di 1 (Variabili) - Dentro il SE

Perché: È il premio per il giocatore!

* Attendi [0.5] secondi (Controllo) - Fuori dal SE, alla fine del "Per sempre"

Perché: Diamo un attimo di respiro prima di far cadere la prossima mela, altrimenti diventa troppo difficile.

<center>
	<img src="/img/scratch/mela-mela5.png" alt="windows" width="400"/>
</center>

Immaginate che il blocco Per Sempre sia il motore del gioco. All'interno, il blocco Ripeti fino a quando è la gravità che tira giù la mela. Il blocco Se... Allora è l'arbitro che controlla se avete fatto punto!

<center>
	<img src="/img/scratch/mela-mela.gif" alt="windows" width="300"/>
</center>