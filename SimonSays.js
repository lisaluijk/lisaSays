// declareren van de variabelen

// knoppen in variabelen stoppen
const startKnop = document.querySelector('#start');
const opnieuwKnop = document.querySelector('#opnieuw');

const rozeKnop = document.querySelector('#roze');
const blauweKnop = document.querySelector('#blauw');
const paarseKnop = document.querySelector('#paars');
const geleKnop = document.querySelector('#geel');

// html element verliezen in variabele stoppen en class toevoegen
const verliezenTekst = document.querySelector('.verloren').classList;
verliezenTekst.add("notShowText");

// scores ophalen uit html
const scoreVeld = document.querySelector('#scoreWaarde');
let score = 0;

const highscoreVeld = document.querySelector('#highscoreWaarde');
let highscore = 0;

// audio's
const rozeAudio = new Audio('audios/roze_audio.mp3');
const blauweAudio = new Audio('audios/blauwe_audio.mp3');
const paarseAudio = new Audio('audios/paarse_audio.mp3');
const geleAudio = new Audio('audios/gele_audio.mp3');

// variabelen voor een nieuwe ronde
let nieuweWaarde = 0;
let nuAfspelen = 0;

// arrays om input te controleren
let spelerVolgorde = [];
let computerVolgorde = [];
let testUitslag = 2;


// fucntionele code

//updaten scores
function verhoogScore() {
    score++;
    scoreVeld.textContent = score;
}

function updateHighcore() {
    highscore = score;
    highscoreVeld.textContent = highscore;
}

function resetScore() {
    score = 0;
    scoreVeld.textContent = score;
}

// laat de volgorde van de array afspelen
// roze =1, blauw =2, paars =3, geel =4
function speelArrayAf(tijd) {
    if (nuAfspelen == 1){
        setTimeout(computerRozeDrukIn, tijd);
    } else if (nuAfspelen == 2){
        setTimeout(computerBlauwDrukIn, tijd);
    } else if (nuAfspelen == 3){
        setTimeout(computerPaarsDrukIn, tijd);
    } else if (nuAfspelen == 4){
        setTimeout(computerGeelDrukIn, tijd);
    }
}

// wat er gebeurt bij een nieuwe ronde
function nieuweRonde() {

    // nieuwe toevoeging aan de reeks (extra knop om te onthouden)
    nieuweWaarde = Math.ceil(Math.random()*4);
    computerVolgorde.push(nieuweWaarde);

    let timer = 0; 

    // speel die volgorde af voor de gebruiker
    for (let i = 0; i < computerVolgorde.length; i++) {
        nuAfspelen = computerVolgorde[i];
        
        timer = timer + 500;
        speelArrayAf(timer);
    }
}

// als de speler nog een keer wil proberen wordt alles hier gereset voor een volgende keer, ook wordt eventueel de highscore aangepast
function opnieuwProberen() {
  
    testUitslag = 2;
    verliezenTekst.remove("showText");
    spelerVolgorde = [];
    computerVolgorde = [];

    if (score > highscore) {
        updateHighcore();
    }
    resetScore();
}

// de functie die het antwoord controleert, wordt aangeroepen nadat de gebruiker een knop in drukt
function controleerAntwoord() {

    // tussendoor controleren
    if (computerVolgorde.length != spelerVolgorde.length) {
        
        // kijken of de volgorde klopt
        for (let i = 0; i < spelerVolgorde.length; i++) {
            if (computerVolgorde[i] === spelerVolgorde[i]) {
                testUitslag = 1;
            } else {
                testUitslag = 0;
            }
        }

        if (testUitslag == 0) {
            verliezenTekst.add("showText");
        }

    } else {
        // dit wordt uitgevoerd als de volledige reeks is ingevuld door de gebruiker
        // arrays controleren
        for (let i = 0; i < spelerVolgorde.length; i++) {

            if (computerVolgorde[i] === spelerVolgorde[i]) {
                testUitslag = 1;
            } else {
                testUitslag = 0;
            }
        }
        // als het goed is score verhogen en anders verloren
        if (testUitslag === 1) {
            verhoogScore();
            spelerVolgorde = [];
            nieuweRonde();
        } else if (testUitslag === 0) {
            verliezenTekst.add("showText");
        }
    }
}

//hier kan ik nog een 1 functie voor maken met een parameter als ik dat wil
// animatie: de knop drukt ook weer uit
function rozeDrukUit() {
    rozeKnop.src = 'images/roze-knop.png';
}

function blauwDrukUit() {
    blauweKnop.src = 'images/blauwe-knop.png';
}

function paarsDrukUit() {
    paarseKnop.src = 'images/paarse-knop.png';
}

function geelDrukUit() {
    geleKnop.src = 'images/gele-knop.png';
}

// computer drukt de knop in 
function computerRozeDrukIn() { 
    rozeKnop.src = 'images/roze-knop-gedrukt.png';
    rozeAudio.play();
    setTimeout(rozeDrukUit, 225);
}

function computerBlauwDrukIn() { 
    blauweKnop.src = 'images/blauwe-knop-gedrukt.png';
    blauweAudio.play();
    setTimeout(blauwDrukUit, 225);
}

function computerPaarsDrukIn() { 
    paarseKnop.src = 'images/paarse-knop-gedrukt.png';
    paarseAudio.play();
    setTimeout(paarsDrukUit, 225);
}

function computerGeelDrukIn() { 
    geleKnop.src = 'images/gele-knop-gedrukt.png';
    geleAudio.play();
    setTimeout(geelDrukUit, 225);
}


//speler drukt de knop in
// roze = 1, blauw = 2, paars = 3, geel = 4
function spelerRozeDrukIn() { 
    rozeKnop.src = 'images/roze-knop-gedrukt.png';
    rozeAudio.play();
    setTimeout(rozeDrukUit, 225);
    spelerVolgorde.push(1);
    controleerAntwoord();
}

function spelerBlauwDrukIn() { 
    blauweKnop.src = 'images/blauwe-knop-gedrukt.png';
    blauweAudio.play();
    setTimeout(blauwDrukUit, 225);
    spelerVolgorde.push(2);
    controleerAntwoord();
}

function spelerPaarsDrukIn() { 
    paarseKnop.src = 'images/paarse-knop-gedrukt.png';
    paarseAudio.play();
    setTimeout(paarsDrukUit, 225);
    spelerVolgorde.push(3);
    controleerAntwoord();
}

function spelerGeelDrukIn() { 
    geleKnop.src = 'images/gele-knop-gedrukt.png';
    geleAudio.play();
    setTimeout(geelDrukUit, 225);
    spelerVolgorde.push(4);
    controleerAntwoord();
}

// mogelijk maken om een knop in te drukken
rozeKnop.addEventListener('click', spelerRozeDrukIn); 
blauweKnop.addEventListener('click', spelerBlauwDrukIn);
paarseKnop.addEventListener('click', spelerPaarsDrukIn);
geleKnop.addEventListener('click', spelerGeelDrukIn);

startKnop.addEventListener('click', nieuweRonde);
opnieuwKnop.addEventListener('click', opnieuwProberen);
