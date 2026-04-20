---
title: 1-Alla-Scoperta-del-Mini-Robot-Car
description: 'Conoscere l''hardware del Mini Robot Car, comprendere l''alimentazione necessaria e imparare a installare (e gestire) le estensioni personalizzate nell''ambiente MakeCode'
draft: false
date: 2026-02-25
category: Microbit
class_target: "1, 2, 3, Tutti"
image: /img/robotica/minicar.png
---
# 1-Alla-Scoperta-del-Mini-Robot-Car

**Obiettivo:** Conoscere l'hardware del Mini Robot Car, comprendere l'alimentazione necessaria e imparare a installare (e gestire) le estensioni personalizzate nell'ambiente MakeCode.

**Concetti Chiave:**

* Riconoscimento dei componenti hardware esterni (motori, sensori di linea, infrarossi).
* Il concetto di "Estensione" (Libreria) in programmazione.
* Gestione avanzata dell'interfaccia MakeCode .


### Fase 1. Esplorazione dell'Hardware  🔍

Iniziamo esplorando fisicamente il robot e capendo di cosa è capace.

* **Il Cuore del Robot:** Il Mini Robot Car è un'auto multifunzione basata sulla scheda BBC microbit. È equipaggiata con una ricca varietà di sensori e periferiche.


* **I Sensi del Robot:**

	* Due sensori fotosensibili (fotoresistenze).
	* Due fari colorati (LED RGB).
	* Sensori per il tracciamento della linea (Line tracking).
	* Un ricevitore a infrarossi (IR) per il telecomando.
	* Una porta dedicata al sensore a ultrasuoni.

* **Motori e Potenza:** L'auto utilizza due motori , con una velocità di rotazione di **200RPM**.

* **Energia:** Questo passaggio è cruciale. Il robot è alimentato da tre batterie AAA. L'input della porta di alimentazione è di **DC 4.5V** , mentre i sensori operano a **3V**.


<center>
	<img src="/img/robotica/minicar2.png" alt="minicar2.png" width="500"/>
</center>


### Fase 2. Cos'è un'Estensione? 🧩

Per comandare tutti questi nuovi sensori, i blocchi standard di Microbit non bastano.

* **Teoria:** Le estensioni sono moduli di codice funzionali che vengono installati dall'esterno dell'editor MakeCode e aggiungono nuovi blocchi alla Casella degli strumenti (Toolbox). È una collezione di codice che estende le funzionalità del linguaggio di programmazione di base.


### Fase 3. Aggiungere l'Estensione in MakeCode 💻

Adesso passiamo ai computer e prepariamo l'ambiente di lavoro.

| Passo | Istruzione per gli studenti |
| :--- | :--- |
| **1. Aprire le Estensioni** | Nella Casella degli strumenti (Toolbox), scorrete verso il basso e cliccate sulla categoria **Estensioni** (Extensions).|
| **2. La Barra di Ricerca** | Si aprirà una finestra che vi offre uno spazio per cercare le estensioni.|
| **3. Inserire il Link** | Copiate e incollate il seguente link nella casella di ricerca e premete "Invio": 
||`https://github.com/keyestudio2019/MiniCar` per robot Minicar Keyestudio
||`https://github.com/lzty634158/yahboom_mbit_en` per il robot M_bitRobot
|| `https://github.com/YahboomTechnology/Tiny-bitLib` per il robot Tiny Bot.|
| **4. Installazione** | Cliccate sul riquadro che appare nei risultati della ricerca.|
| **5. Verifica** | Dopo aver aggiunto l'estensione, dovreste vedere le nuove categorie apparire nella Casella degli strumenti. I nuovi blocchi sono pronti per essere usati!|

*Nota :* Ogni volta che si creerà un nuovo progetto su MakeCode per questo robot, bisognerà ricaricare l'estensione da capo.