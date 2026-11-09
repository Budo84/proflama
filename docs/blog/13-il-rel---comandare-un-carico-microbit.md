---
title: "13-Il relè - comandare un carico (micro:bit)"
description: 'Usiamo un modulo relè per accendere e spegnere un carico a bassa tensione con i pulsanti del micro:bit.'
draft: false
date: 2026-11-09
category: Officina-Robotica
class_target: "2, 3"
image: /img/robotica/base-microbit-rele.webp
---

# 13-Il relè - comandare un carico (micro:bit)

**Obiettivo:** Usare un **modulo relè** per accendere e spegnere un carico a bassa tensione, capendo i contatti **COM, NO e NC**.

**Concetti Chiave:**
- Relè: interruttore comandato da un elettromagnete
- Contatti COM, NO (normalmente aperto), NC (normalmente chiuso)
- Moduli attivi bassi
- Sicurezza elettrica

## Fase 1: Teoria 🧠

Il **relè** è un interruttore azionato da una bobina: quando viene attivata, un contatto meccanico scatta con un "click". Il circuito di comando e quello del carico sono **separati**.

- **COM**: contatto comune.
- **NO** (Normally Open): si chiude quando il relè scatta.
- **NC** (Normally Closed): si apre quando il relè scatta.

Molti moduli sono **attivi bassi**: il relè scatta quando **IN** va a livello **basso** (0). Il modulo ha bisogno di circa **5 V** per la bobina, quindi lo alimentiamo con la batteria esterna.

- **Domanda alla classe:** *"Perché usiamo un relè e non colleghiamo il carico direttamente a un pin del micro:bit?"*

## Fase 2: Montaggio 🔌

#### Componenti
* 1x **micro:bit**
* 1x **Scheda di espansione per micro:bit** con connettore edge e breadboard (oppure cavi con coccodrilli)
* 1x **Modulo relè** a 1 canale (5 V)
* 1x **Pacco batterie** 3 × AA (4,5 V) o 4 × AA (6 V) con interruttore
* 1x **Carico a bassa tensione**: lampadina da 6 V con portabatterie, oppure LED con resistore
* Cavi jumper

#### Cablaggio
1. **VCC** del relè → **positivo** della batteria (4,5 V). **GND** → **negativo** della batteria **e** pin **GND** del micro:bit.
2. **IN** → pin **P0**.
3. Carico: batteria del carico **+** → **COM**; **NO** → carico → batteria **-**.

<center>
	<img src="/img/robotica/base-microbit-rele-cablaggio.webp" alt="modulo relè comandato da P0 del micro:bit con una lampadina a bassa tensione" width="300"/>
</center>

::: warning ⚠️ ATTENZIONE
In classe usa **solo carichi a bassa tensione** (batterie fino a 9 V). **Non collegare mai la tensione di rete (230 V)**. Alcuni moduli relè non scattano con il segnale a 3 V del micro:bit: se non senti il click, prova un modulo con ingresso a optoisolatore o aggiungi un transistor.
:::

## Fase 3: Progettazione dello Pseudocodice 📝

- *Premi A* -> attiva il relè (IN a 0)
- *Premi B* -> disattiva il relè (IN a 1)

## Fase 4: Scrittura del Codice 💻

| Sezione | Blocco | Istruzione e Funzione | Dove Inserire |
|---|---|---|---|
| Pins | `digital write pin P0 to 1` | Parte con il relè spento (modulo attivo basso) | All'avvio |
| Input | `quando il pulsante A è premuto` | Evento | Contenitore principale |
| Pins | `digital write pin P0 to 0` | Attiva il relè | Dentro l'evento A |
| Input | `quando il pulsante B è premuto` | Evento | Contenitore principale |
| Pins | `digital write pin P0 to 1` | Disattiva il relè | Dentro l'evento B |

<center>
	<img src="/img/robotica/base-microbit-rele-blocchi.webp" alt="blocchi MakeCode che attivano e disattivano il relè su P0 con i pulsanti A e B" width="400"/>
</center>

**Codice Python equivalente**

```python
from microbit import *

pin0.write_digital(1)   # modulo attivo basso: parte spento

while True:
    if button_a.was_pressed():
        pin0.write_digital(0)   # relè attivo
    if button_b.was_pressed():
        pin0.write_digital(1)   # relè disattivato
    sleep(50)
```

## Fase 5: Verifica 🔍

Premi A: senti il click e la lampadina si accende. Premi B: si spegne. Se il comportamento è invertito, il tuo modulo è "attivo alto": scambia 0 e 1.

::: tip 💡 CONSIGLIO
Sposta il carico dal contatto **NO** al **NC** e osserva cosa cambia.
:::
