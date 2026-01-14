---
title: 00-MicroBit
date: 2026-01-14T23:13:00.000+01:00
image: /img/microbit-led-coords.png
category: MicroBit
---
## Cos'è Micro:Bit
BBC micro:bit è una piccola scheda elettronica utilizzata per fare coding in modo semplice. Prima di iniziare a descrive i componenti che la compongono facciamo una panoramica sulle tipologie di schede e vediamo qual è il *cervello* che coordina tutto. 

I nostri PC hanno quello che si chiama **microprocessore** (o CPU), un singolo circuito integrato il cui scopo è elaborare i dati forniti da una memoria esterna contenente un programma.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/z80.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/microprocessore.png" style="width: 45%; object-fit: cover;">
</div>

Un altro tipo di scheda elettronica che eleabora i dati è il **microcontrollore**, un circuito integrato come il microprocessore; un computer in scala molto ridotta. Al suo interno c'è tutto il necessario per essere immediatamente operativo. Il microprocessore lo troviamo nei nostri personal computer mentre il microcontrollore ha un campo di applicazione molto più vario: lavatrici, televisori, automobili, Arduino.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/atmega.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/arduino.png" style="width: 45%; object-fit: cover;">
</div>

<center>
	<img src="/img/microbit/microcontrollore.png" alt="windows" width="400"/>
</center>

<center>
	<img src="/img/microbit/cpumicrocont.png" alt="windows" width="600"/>
</center>

Dopo aver compreso la differenza tra **microprocessore** e **microcontrollore** possiamo vedere da vicino cosa coordina la nostra scheda; il micro:bit presenta un chip ancora più evolto denominato **SoC** (*System On Chip*) ovvero un sistema su chip che prevede oltre ad un microcontrollore anche altre connessioni (Bluetooth e radio) e servizi in moo da ridurre l'uso di periferiche esterne limitando spazi e costi. Per le ridotte dimensioni e la presenza di più componenti all'interno di un'unico cicuito integrato i SoC vengono impiegati ad esempio negli smartphone, tablet, smartwatch e nei moderni PC per favorire dimensioni dei prodotti contenute e una maggiore autonomia.

<div style="display: flex; justify-content: space-around;">
     <img src="/img/microbit/soc.png" style="width: 45%; object-fit: cover;">
     <img src="/img/microbit/applem.png" style="width: 45%; object-fit: cover;">
</div>

<center>
	<img src="/img/microbit/soccpu.png" alt="windows" width="600"/>
</center>

<div style="page-break-after: always;"></div>

La scheda **Micro:Bit** è costituita da:

* 25 LED rossi (matrice 5x5);
* 2 pulsanti programmabili (**A** e **B**);
* logo micro:bit sensibile al tocco;
* LED di stato per alimentazione e microfono;
* microfono integrato;
* speaker integrato;
* connessione GPIO;
* pulsante di reset con LED di stato
* 1 sensore di temperatura per rilevare la temperatura ambiente;
* 1 sensore di luce per rilevare le variazioin di luminosità ambientali;
* 1 accelerometro per rilevare il movimento;
* 1 bussola per rilevare la posizione del campo magnetico;
* connessione radio e Bluetooth Low Energy per interagire con altri device.

<center>
	<img src="/img/microbit/microbit-overview-2.png" alt="windows" width="450"/>
</center>

<div style="page-break-after: always;"></div>

<center>
	<img src="/img/microbit/microbit_V1vsV2.png" alt="windows" width="600"/>
</center>

<div style="page-break-after: always;"></div>

## Anatomia di Micro:Bit

### Alimentazione

Il micro:bit può essere alimentato sia dalla Micro USB sia attraverso un pacco batteria in dotazione (2 stilo da 1,5V) che fornisce direttamente una tensione di 3V. 

### LED di stato

Il LED indica lo stato di esecuzione del micro:bit. Acceso fisso indica che la scheda è alimentata correttamente mentre lampeggia durante il caricamento di un programma. Se alimentato a batteria il micro:bit il LED di stato rimane spento per risparmiare energia.

### Reset

Il micro:bit è resettato al termine del caricamento di un programma in memoria ma è previsto un pulsante sul retro della scheda se fosse necessario effettuare un reset manualmente.

### Micro USB

Porta utilizzata per caricare programmi e alimentare la scheda in assenza di un pacco batteria. 

### Matrice LED

Utilizzata come dispositivo di output per privilegiare l'autonomia in alternativa ad un display LCD da collegare esternamente.
La matrice è formata da 25 LED divisi in righe e colonne (5LED x 5LED). Ogni LED è indipendente e può essere acceso singolarmente senza accendere quelli vicini; tutto questo è possibile grazie al software che esegue una scansione periodica di righe e colonne ricercando il LED da attivare.

La posizione di ogni LED si può trovare come in una battaglia navale, incrociando le due coordinate numero di riga e numero di colonna. Il primo LED sarà quello posto in alto a sinistra e corrisponderà al numero di riga 0 e numero di colonna 0.

<center>
	<img src="/img/microbit/microbit-led-coords.png" alt="windows" width="300"/>
</center>

É possibile attribuire una diversa luminosità ad ognuno dei LED con un valore da 0 (spento) a 9 (massima luminosità).

### Pulsanti A e B

Il micro:bit possiede una coppia di pulsanti come dispositivi di input. Ogni pulsante è indipendente e ha la propria resistenza di *pull-up* che fissa un livello logico di riferimento all'ingresso del microcontrollore.

La resistenza di *pull-up* produce un livello logico alto (TRUE o 3V) verso l'ingresso quando il pulsante non è premuto. Nel momento in cui è premuto, il livello logico diviene basso (FALSE o 0V): questo è utile da sapere nei programmi. Si tratta di logica inversa.

Oltre alla presena della resitenza di *pull-up* è previsto anche l'*anti-rimbalzo* cioè non serve inserire nel programma un *delay* per eliminare l'effetto *rimbalzo* del pulsante. Questo viene gestito via software dal micro:bit.

### Connettore GPIO

GPIO è l'acronimo di *General Purpose Input Output*, il termine identifica il connettore a *pettine* del micro:bit che permette la possibilità di espandere le connessioni verso l'esterno consentendo l'utilizzo di accessori.

### Sensori

Sono presenti: il sensore di temperatura collocato direttamente nel core, il magnetometro e un accelerometro entrambi sulla scheda.

Il magnetometro rileva e isura l'intensità di un campo magnetico individuando il campo magnetico terrestre attraverso tre rivelatori disposti su 3 assi perpendicolari. Possiamo definirlo una bussola elettronica. Per far funzionare il magnetometro come una bussola è necessario calibrarlo in modo che riconosca il nord del campo magnetico terrestre.

### Approfondimento

#### Come funziona un sensore magnetico?

Il principio di funzionamento si basa sull'effetto Hall. Applicando ad un conduttore una tensione, gli elettroni lo attraverseranno in modo ordinato seguendo una linea da un polo all'altro del generatore. In presenza di un campo magnetico esterno perpendicolare al conduttore, per esempio ad opera di una calamita, gli elettroni verranno deviati (attratti o respinti a seconda della polarità) accumulandosi in una zona; questo genera uno squilibrio di cariche all'interno del conduttore tra una zona e l'altra generando una differenza di potenziale fra la zona con più elettroni e quella con meno. La differenza di potenziale è piccolissima e viene detta tensione di Hall che rivela la presenza di un campo magnetico esterno. 

<center>
	<img src="/img/microbit/hall.png" alt="windows" width="500"/>
</center>

<div style="page-break-after: always;"></div>

## L'ambiente di sviluppo

Per iniziare a programmare micro:bit dobbiamo connetterci al sito **microbit.org***. Qui troveremo tutte le indicazioni per iniziare a sviluppare le nostre idee.
Sul sito troveremo pagine dedicate alle lezioni, tutorial, esempi e una dedicata alla didattica. Inoltre è possibile scaricare l'ambiente di sviluppo per programmare senza una connessione internet.

#### Cosa utilizza micro:bit

L'ambiente di programmazione **MakeCode** ha un'interfaccia semplice e intuitiva che permette di creare istruzioni in sequenza con un liguaggio detto a blocchi. Sicuramente lo avrete già incontrato imparando a programmare con *Scratch*.

Gli oggetti che compongono il linguaggio sono semplici da manipolare e abbiamo la possibilità di vedere in tempo reale il risultanto attraverso un *simulatore*. 

Una volta sicuri del programma scritto lo potremmo inviare al dispositivo, precedentemente connesso e lavorare in autonomia scollegandolo dal computer.

<center>
	<img src="/img/microbit/interfaccia.png" alt="windows" width="450"/>
</center>

#### I passi principali per programmare ONLINE

1. Collegarsi al sito **microbit.org**.

<center>
	<img src="/img/microbit/sito1.png" alt="windows" width="450"/>
</center>

2. Cliccare su *Let's Code*.

<center>
	<img src="/img/microbit/sito2.png" alt="windows" width="450"/>
</center>

3. Cliccare su *MakeCode Editor*.

<center>
	<img src="/img/microbit/sito3.png" alt="windows" width="450"/>
</center>

4. Selezionare *New Project* oppure il progetto che dovevate completare.

#### I passi principali per programmare ONFFLINE

1. Avviare il programma installato **MakeCode**.

<center>
	<img src="/img/microbit/progoffline.png" alt="windows" width="450"/>
</center>

2. Selezionare *New Project* oppure il progetto che dovevate completare.

Manca solo un ultimo passaggio, caricare il vostro programma sulla scheda. Per fare questo dovrete collegare micro:bit con il cavo usb al computer e dall'interfaccia cliccare su *Download* e il programma verrà caricato sulla memoria della nostra scheda.

<center>
	<img src="/img/microbit/download.png" alt="windows" width="450"/>
</center>

Ora siete pronti per dar "vita" alle vostre idee.
