/* jshint esversion: 6 */

// Get the form and input elements for username submission
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const usernameForm = document.getElementById("username-form");
const quizContainer = document.getElementById("quiz-container");

// Get the elements for the quiz questions and answers
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer"); //Timer

let currentQuestionIndex = 0; // Current question index
let score = 0; // Player's score
let username = ""; // Player's username
let countdown; // Variable to hold countdown interval

// Array of questions with their answers and correct answer indication
const questions = [
  {
    question:
      "1-För att avläsa på manometern ett tryck på 1,3 MPa (Megapascal) är det desamma som?",
    answers: [
      { text: " 0,13 bar(e)", correct: false },
      { text: "1,3 bar (e)", correct: false },
      { text: "13 bar(e)", correct: true },
      { text: "0.3 psi", correct: false },
    ],
  },
  {
    question: "6-I vilket värde anges kyleffekten på en anläggning?",
    answers: [
      { text: "KJ/kg", correct: false },
      { text: "KJ", correct: false },
      { text: "kW", correct: true },
      { text: "kNm", correct: false },
    ],
  },
  {
    question:
      "2-Du läser på manometern ett tryck på 10 bar (e), är det desamma som?",
    answers: [
      { text: "1,0 MPa", correct: true },
      { text: "0,1 Mpa", correct: false },
      { text: "10,0 Mpa", correct: false },
      { text: "20.1 psi", correct: false },
    ],
  },
  {
    question:
      "3-För att evakuera en anläggning och läsa av ett upp-mätt tryck på 1 mbar, är det desamma som?",
    answers: [
      { text: "0,5 Pa", correct: false },
      { text: "0,1 Pa", correct: false },
      { text: "100 Pa", correct: true },
      { text: "750 Pa", correct: false },
    ],
  },
  {
    question:
      "4-Du läser på en termometer att temperaturen är 0° C. Är det desamma som?",
    answers: [
      { text: "273 K", correct: true },
      { text: "373 K", correct: false },
      { text: "-273 K", correct: false },
      { text: "0 K", correct: false },
    ],
  },
  {
    question:
      "5- I vilken sort anges den specifika värme-kapaciteten av ett ämne?",
    answers: [
      { text: "kW", correct: false },
      { text: " kJ/s", correct: false },
      { text: "kNm", correct: false },
      { text: "kJ/kg K", correct: true },
    ],
  },
  {
    question:
      "7. I vilken valör(enhet) kan man ange kyleffekten för en anläggning??",
    answers: [
      { text: "kWh", correct: false },
      { text: "kJ/s", correct: true },
      { text: "kNm", correct: false },
      { text: "K", correct: false },
    ],
  },
  {
    question:
      "8. I vilken valör kan man ange kondensoreffekten för en anläggning?",
    answers: [
      { text: "kWh", correct: false },
      { text: "kJ/s", correct: true },
      { text: "kJ/kg K", correct: false },
      { text: "kNm", correct: false },
    ],
  },
  {
    question:
      "9. I vilken valör kan man ange kondensoreffekten för en anläggning?",
    answers: [
      { text: "kJ", correct: false },
      { text: "kNm", correct: false },
      { text: "kW", correct: true },
      { text: "UK", correct: false },
    ],
  },
  {
    question: "10. Vilka av dessa beteckningar används för energi?",
    answers: [
      { text: "kWh", correct: true },
      { text: "kW", correct: false },
      { text: "kJ/s", correct: false },
      { text: "Amper", correct: false },
    ],
  },
  {
    question: "11. Vad är en azeotropisk köldmedieblandning?",
    answers: [
      {
        text: "En köldmediekomposition som kokar vid konstant temperatur",
        correct: true,
      },
      {
        text: "En köldmediekomposition som kokar vid stigande temperatur",
        correct: false,
      },
      {
        text: "En köldmediekomposition som kokar vid fallande temperatur",
        correct: false,
      },
    ],
  },
  {
    question: "12. Vad är en zeotropisk köldmedieblandning?",
    answers: [
      {
        text: "En köldmediekomposition som kokar vid stigande temperatur",
        correct: true,
      },
      {
        text: "En köldmediekomposition som kokar vid konstant temperatur",
        correct: false,
      },
      {
        text: "En köldmediekomposition som kokar vid fallande temperatur",
        correct: false,
      },
    ],
  },
  {
    question: "13. Vad är en azeotropisk köldmedieblandning?",
    answers: [
      {
        text: "En köldmediekomposition som kondenserar vid stigande temperatur",
        correct: false,
      },
      {
        text: "En köldmediekomposition som kondenserar vid konstant temperatur",
        correct: true,
      },
      {
        text: "En köldmediekomposition som kondenserar vid fallande temperatur",
        correct: false,
      },
    ],
  },
  {
    question: "14. Vad är en zeotropisk köldmedieblandning?",
    answers: [
      {
        text: "En köldmediekomposition som kondenserar vid stigande temperatur",
        correct: false,
      },
      {
        text: "En köldmediekomposition som kondenserar vid konstant temperatur",
        correct: false,
      },
      {
        text: "En köldmediekomposition som kondenserar vid fallande temperatur",
        correct: true,
      },
    ],
  },
  {
    question: "15. Vilket av dessa köldmedier är ett zeotropiskt köld-medium?",
    answers: [
      { text: "R507", correct: false },
      { text: "R422D", correct: true },
      { text: "R600a", correct: false },
    ],
  },
  {
    question: "16. Vilket av dessa köldmedier är ett azeotropiskt köld-medium?",
    answers: [
      { text: "R507", correct: true },
      { text: "R407C", correct: false },
      { text: "R290", correct: false },
    ],
  },
  {
    question: "17. Vilket av dessa köldmedier är ett zeotropiskt köld-medium?",
    answers: [
      { text: "R410A", correct: true },
      { text: "R152a", correct: false },
      { text: "R134a", correct: false },
    ],
  },
  {
    question: "18. Varför är köldmediet R410A miljöskadligt?",
    answers: [
      { text: "Eftersom det bryter ner ozonskiktet", correct: false },
      {
        text: "Eftersom det både bryter ned ozonskiktet och har stor växthuseffekt",
        correct: false,
      },
      { text: "På grund av den stora växthuseffekten", correct: true },
    ],
  },
  {
    question:
      "19. Hur kallt är det om du får en vätskespray med R410A på din hud?",
    answers: [
      { text: "Kallare än -52°C", correct: true },
      { text: " Varmare än -52°C", correct: false },
      { text: "Ca -52°C", correct: false },
    ],
  },
  {
    question: "20. Varför är köldmediet R404A mer miljö-belastande än R134a?",
    answers: [
      { text: "Eftersom det bryter ner mer av ozonskiktet", correct: false },
      { text: "Eftersom det är giftigt och frätande", correct: false },
      { text: "Eftersom det har störst växthuseffekt", correct: true },
    ],
  },
  {
    question: "21. Vilken av dessa gaser är en HFC gas?",
    answers: [
      { text: "R507", correct: true },
      { text: "R600a", correct: false },
      { text: "R290", correct: false },
    ],
  },
  {
    question: "22. Vilken av dessa gaser är en HFC gas?",
    answers: [
      { text: "R410A", correct: true },
      { text: "R22", correct: false },
      { text: "R401A", correct: false },
    ],
  },
  {
    question: "23. Vilken av dessa gaser ingår i Kyotoprotokollet?",
    answers: [
      { text: "R408A", correct: false },
      { text: "R22", correct: false },
      { text: "R407C", correct: true },
    ],
  },
  {
    question:
      "24. Vilken grupp köldmedier är det som finns med i F-gasförordningen?",
    answers: [
      { text: "HCFC", correct: false },
      { text: "HFC", correct: true },
      { text: "CFC", correct: false },
    ],
  },
  {
    question: "25. När köldmediet kokar i förångaren sker vad?",
    answers: [
      { text: "Ökar entalpin i köldmediet", correct: true },
      { text: "Minskar entalpin i köldmediet", correct: false },
      { text: "Entalpin är oförändrat i köldmediet", correct: false },
    ],
  },
  {
    question: "26. När köldmediet kondenserar i kondensorn sker vad?",
    answers: [
      { text: "Ökar entalpin i köldmediet", correct: false },
      { text: "Entalpin är oförändrat i köldmediet", correct: false },
      { text: "Minskar entalpin i köldmediet", correct: true },
    ],
  },
  {
    question:
      "27. När flytande köldmedium stryps i termostatiska ex-pansionsventilen vid förångaren sker?",
    answers: [
      { text: "Minskar entalpin i köldmediet", correct: false },
      { text: "Ökar entalpin i köldmediet", correct: false },
      { text: "Entalpin är oförändrat i köldmediet", correct: true },
    ],
  },
  {
    question:
      "28. När gas i sugledningen till kompressorn innehåller vätska, så har vi?",
    answers: [
      { text: "För stor flytande fyllning i anläggningen", correct: false },
      { text: "Otillräcklig överhettning", correct: true },
      { text: "Otillräcklig underkylning", correct: false },
    ],
  },
  {
    question:
      "29. I ett rör på ett R410A-system mäter du att övertrycket är 4,5 bar (e) och temperaturen är + 10°C. Vad är det i röret?",
    answers: [
      { text: "Kokande vätska", correct: false },
      { text: "Överhettad gas", correct: true },
      { text: "Underkyld vätska", correct: false },
    ],
  },
  {
    question:
      "30. I ett rör på ett R134a-system mäter du att övertrycket är 10 bar (e) och temperaturen är + 36°C. Vad är det i röret?",
    answers: [
      { text: "Underkyld vätska", correct: true },
      { text: "Mättad ånga/vätska", correct: false },
      { text: "Överhettad gas", correct: false },
    ],
  },
  {
    question:
      "31. I ett rör på ett R407C-system mäter du att övertryck-et är 2 bar (e) och temperaturen är -4°C. Vad är det i röret?",
    answers: [
      { text: "Underkyld vätska", correct: false },
      { text: "Överhettad gas", correct: true },
      { text: "Mättad ånga/vätska", correct: false },
    ],
  },
  {
    question:
      "32. I ett rör på en R407C-anläggning mäter du ett över-tryck på 8 bar (e) och en temperatur på 10°C. Vad är det i röret?",
    answers: [
      { text: "Underkyld vätska", correct: true },
      { text: "Mättad ånga/vätska", correct: false },
      { text: "Överhettad gas", correct: false },
    ],
  },
  {
    question:
      "33. Du har en köldmediecylinder som du antar att det finns 5 kg återvunnet R410A i. Temperaturen på cylin-dern är + 20°C och mätning av trycket visar 20 bar (e). Vad kan troligen vara fallet?",
    answers: [
      { text: "Det finns mycket olja i det återvunna R410A", correct: false },
      { text: "Det finns också luft/kväve i cylindern", correct: true },
      {
        text: "Det har tömts både R410A och R134a i cylindern",
        correct: false,
      },
    ],
  },
  {
    question:
      "34. Du skall sätta i drift ett R134a-system efter byte av sä-kerhetsventil på vätsketanken. PS (högsta tillåtna tryck) för högtryckssidan är 25 bar (e). Då kan du:",
    answers: [
      {
        text: "Täthetsprova systemet med ett maximalt tryck lika med 1,1 x PS",
        correct: false,
      },
      {
        text: "Täthetsprova systemet med ett maximalt tryck lika med PS",
        correct: false,
      },
      {
        text: "Täthetsprova systemet med ett maximalt tryck lika med 0,9 x PS",
        correct: true,
      },
    ],
  },
  {
    question:
      "35. Du skall sätta i drift ett R134a system när du har bytt högtryckspressostaten( säkerhetsventil på vätsketanken)PS (högsta tillåtna tryck) för högtryckssidan är 25 bar (e). Sedan kan du ställa in tryck-vaktens frånslagstryck på:",
    answers: [
      { text: "20,5 bar (e)", correct: false },
      { text: "22,5 bar (e)", correct: true },
      { text: "25 bar (e)", correct: false },
    ],
  },
  {
    question:
      "36. Du skall sätta i drift ett R134a system när du har bytt lågtryckspressostaten.PS (högsta tillåtna tryck) för högtryckssidan är 25 bar (e). Kylrumstemperaturen är 0°C. Startpunkten (tillslagstrycket = Range) och differensen skall anpassas till anläggningen:",
    answers: [
      {
        text: "Startar på 2,5 bar(e) och stannar vid 0,1 bar(e)",
        correct: false,
      },
      {
        text: "Startar på 3,5 bar(e) och stannar vid 0,1 bar(e)",
        correct: false,
      },
      {
        text: "Startar på 1,5 bar(e) och stannar vid 0,1 bar (e)",
        correct: true,
      },
    ],
  },
  {
    question:
      "En värmepumpanläggning har värmeeffekten 30 kW (den effekt som avges i kondensorn). Kompressorns är 10 kW. Hur stor kyleffekt tas upp?",
    answers: [
      { text: "0 kW", correct: false },
      { text: "20 kW", correct: true },
      { text: "30 kW", correct: false },
      { text: "40 kW", correct: false },
    ],
  },
  {
    question:
      "En värmepumpanläggning har värmeeffekten 30 kW (den effekt som avges i kondensorn). Kompressorns är 10 kW. Hur stor är värmefaktorn.",
    answers: [
      { text: "0.33", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "40", correct: false },
    ],
  },
  {
    question:
      "En värmepumpanläggning har värmeeffekten 30 kW (den effekt som avges i kondensorn). Kompressorns är 10 kW. Hur stor är köldfaktorn.",
    answers: [
      { text: "0.33", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "40", correct: false },
    ],
  },
  {
    question:
      "Hur stor är värmefaktorn för en kylutrustning som har köldfaktorn 2,6?",
    answers: [
      { text: "0,6", correct: false },
      { text: "1,6", correct: false },
      { text: "3,6", correct: true },
      { text: "4,6", correct: false },
      { text: "5,6", correct: false },
    ],
  },
  {
    question:
      "En bergvärmepump har en avgiven kondensoreffekt på 9 kW. Värmefaktorn COP, är 4,5. Hur stor effekt tas upp ur borrhålet? Vi bortser från värmeförluster i rörsystemet.",
    answers: [
      { text: "0,5", correct: false },
      { text: "2", correct: true },
      { text: "4,5", correct: false },
      { text: "7", correct: false },
      { text: "13,5", correct: false },
    ],
  },
  {
    question: "Hur definierar man värmefaktorn (COPV)?",
    answers: [
      {
        text: "Förhållande mellan avgiven energi i kondensorn och upptagen energi i förångarenk ",
        correct: false,
      },
      {
        text: "Förhållande mellan avgiven energi i kondensorn och tillförd energi till kompressorn",
        correct: true,
      },
      {
        text: "Förhållande mellan upptagen energi i förångaren och tillförd energi till kompressorn",
        correct: false,
      },
      {
        text: "Förhållande mellan upptagen energi i förångaren och avgiven energi i kondensorn",
        correct: false,
      },
    ],
  },
  {
    question: "Hur definierar man köldfaktorn (COPk)?",
    answers: [
      {
        text: "Förhållande mellan avgiven energi i kondensorn och upptagen energi i förångaren",
        correct: false,
      },
      {
        text: "Förhållande mellan avgiven energi i kondensorn och tillförd energi till kompressorn",
        correct: false,
      },
      {
        text: "Förhållande mellan upptagen energi i förångaren och tillförd energi till kompressorn ",
        correct: true,
      },
      {
        text: "Förhållande mellan upptagen energi i förångaren och avgiven energi i kondensorn",
        correct: false,
      },
    ],
  },
  {
    question:
      "För att förånga ett ämne likt vatten eller köldmedium åtgår det:",
    answers: [
      { text: "En temperaturökning till kokpunkten", correct: false },
      { text: "Värmeenergi", correct: true },
      { text: "Högt tryck över ämnets yta", correct: false },
    ],
  },
  {
    question: "Förångningstemperaturen för ett köldmedium beror på:",
    answers: [
      {
        text: "Hur snabbt värme tillförs till det kokande kõldmediet",
        correct: false,
      },
      {
        text: "Kylkompressorns effektivitet för att förånga köldmediet",
        correct: false,
      },
      {
        text: "Trycket på vätskeytan ovanför det kokande köldmediet",
        correct: true,
      },
    ],
  },
  {
    question: "Ett köldmedium befinner sig mättat når:",
    answers: [
      {
        text: "Tryck och temperatur överensstämmer med köldmediets ångtryckskurva",
        correct: true,
      },
      { text: "Det är blandat med kompressorolja", correct: false },
      { text: "Det komprimeras i kylkompressorn", correct: false },
    ],
  },
  {
    question: "Förångarens uppgift är att:",
    answers: [
      { text: "Omvandla kõldmediet från gas till vätska", correct: false },
      { text: "Värma upp kõldmediegasen på snabbaste sätt", correct: false },
      { text: "Koka köldmediet genom värmeupptagning", correct: true },
    ],
  },
  {
    question: "En kylkompressor ska:",
    answers: [
      { text: "Höja trycket för köldmediet i förångaren", correct: false },
      {
        text: "Suga undan avkokat köldmedium från förångaren och komprimera kõldmediet",
        correct: true,
      },
      { text: "Vara placerad vid en lägre nivå än förångaren", correct: false },
    ],
  },
  {
    question: "En kondensor fungerar dåligt när:",
    answers: [
      { text: "Kondenseringen startar tidigt i kondensorn", correct: false },
      {
        text: "Den samlar köldmedievätska i slutet på kondensorn",
        correct: false,
      },
      {
        text: "Värmeöverföringen till kylmedlet är obefintligt",
        correct: true,
      },
    ],
  },
  {
    question: "En expansionsventil har bästa funktion när:",
    answers: [
      {
        text: "Förångaren är fylld med rätt mängd kokande lågtrycksvätska",
        correct: true,
      },
      {
        text: "Temperaturen för köldmediet är så låg som möjligt i början på förångaren",
        correct: false,
      },
      {
        text: "Tryckfallet över ventilen är så högt som möjligt",
        correct: false,
      },
    ],
  },
  {
    question: "I en värmepump sker följande:",
    answers: [
      {
        text: "Köldmediet går i motsatt riktning jämfört med ett kylsystem",
        correct: false,
      },
      {
        text: "Förängningsvärmet används för att kyla ned kompressorn",
        correct: false,
      },
      { text: "Kondenseringsvärmen avges till en värmebärare", correct: true },
    ],
  },
  {
    question: "En tryckregleringsventil har för uppgift att:",
    answers: [
      {
        text: "Reglera temperaturen för ett mättat köldmedium",
        correct: false,
      },
      {
        text: "Säkerställa att kylkompressorn skyddas under stillestånd",
        correct: false,
      },
      { text: "Begränsa flödet av en köldmediegas", correct: true },
    ],
  },
  {
    question: "Under kondensering och förångning sker:",
    answers: [
      { text: "En fasomvandling för köldmediet", correct: true },
      {
        text: "En höjning och en sänkning av trycket för köldmediet",
        correct: false,
      },
      { text: "En ändring av kõldmediets temperatur", correct: false },
    ],
  },
  {
    question:
      "2- I vilken del av lagtexterna hittar du vad som gäller vid reparation av köldmedieläckage?",
    answers: [
      { text: "I förordning 2024/573 artikel 4", correct: false },
      { text: "I förordning 2024/573 artikel 8", correct: false },
      { text: "I förordning 1516/2007 artikel 8", correct: true },
      { text: "I förordning 2024/573 artikel 10", correct: false },
    ],
  },
  {
    question: "Vilken är den grundläggande ISO-standardenheten för effekt?",
    answers: [
      { text: "J Joule", correct: false },
      { text: "N Newton", correct: false },
      { text: "Kg Kilogram", correct: false },
      { text: "W Watt", correct: true },
    ],
  },
  {
    question:
      "Ett kylaggregat med R134a har kyleffekten 24 kW. Värmefaktorn är 3. Hur stor är den tillförda effekten till kompressormotorn i kW?",
    answers: [
      { text: "8 kW", correct: false },
      { text: "12 kW", correct: true },
      { text: "72 kW", correct: false },
      { text: "19 kW", correct: false },
    ],
  },
  {
    question:
      "Var i lagtexterna hittar du vad en operatör måste kontrollera innan skötsel får utföras på operatörens köldmediesystem?",
    answers: [
      { text: "I den svenska f-gasförordningen 21 §", correct: true },
      { text: "I förordning 2024/573 artikel 7", correct: false },
      { text: "I förordning 2024/573 artikel 4", correct: false },
      { text: "I den svenska f-gasförordningen 18 §", correct: false },
    ],
  },
  {
    question:
      "Hur stort är undertrycket om absoluta trycket är 90 Kilopascal (a)?",
    answers: [
      { text: "9 bar (e)", correct: false },
      { text: "0,9 bar (e)", correct: false },
      { text: "-0,1 bar (e)", correct: true },
      { text: "-0,9 bar (e)", correct: false },
    ],
  },
  {
    question:
      " För vilka arbeten krävs företagscertifikat enligt gällande svenska regelverk?",
    answers: [
      { text: "Arbeten i kategori 1,2, 5", correct: true },
      { text: "Arbeten i kategori 3, 4", correct: false },
      { text: "Arbeten i kategori 1,2, 4", correct: false },
      { text: "Arbeten i kategori 1,2,3, 5", correct: false },
    ],
  },
  {
    question:
      "Ett kylaggregat som betjänar ett kylrum har köldmedietyp HFC R 134a. Kondenseringstrycket för kylaggregatet är 9 bar. Förångningstemperaturen för kylaggregatet är -10°C. Vilken av nedanstående temperatur och tryck har kylaggregatet?",
    answers: [
      {
        text: "Kondenseringstemperatur 36°C. Förångningstryck 2 bar",
        correct: false,
      },
      {
        text: "Kondenseringstemperatur 38,5°C. Förångningstryck 1,28 bar",
        correct: false,
      },
      {
        text: "Kondenseringstemperatur 40°C. Förångningstryck 1 bar",
        correct: true,
      },
      {
        text: "Kondenseringstemperatur 30,5°C. Förångningstryck 2,28 bar",
        correct: false,
      },
    ],
  },
  {
    question:
      "I en rörledning med R134a mäter du med din manometer trycket 3,9 bar(e).Temperaturen på köldmediet i rörledningen uppmäts till +10°C.I vilken fas är köldmediet och vilken underkylning eller överhettning har det?",
    answers: [
      { text: "Vätska med underkylning 5K", correct: true },
      { text: "Vätska med underkylning 2K.", correct: false },
      { text: "Gas med överhettning 10K.", correct: false },
      { text: "Vätska med underkylning 10K.", correct: false },
    ],
  },
  {
    question:
      "Vad menas med överhettning för en termostatisk expansionsventil?",
    answers: [
      {
        text: "Temperaturskillnaden mellan suggas och tryckgas över kompressorn",
        correct: false,
      },
      {
        text: "Temperaturskillnaden på suggasen före och efter expansionsventilen",
        correct: false,
      },
      {
        text: "Differensen mellan kondensering temperatur och uppmätt temperatur efter kondensorn",
        correct: false,
      },
      {
        text: "Differensen mellan uppmätt temperatur i sugledningen och förångningstemperaturen.",
        correct: true,
      },
    ],
  },
  {
    question:
      "Vilka av följande f-gaser ingår i europeiska och i svenska f-gasförordningar?",
    answers: [
      { text: "R1234yf, R1234ze", correct: true },
      { text: "R717, R600", correct: false },
      { text: "R718, R744", correct: false },
      { text: "R717, R12", correct: false },
    ],
  },
  {
    question:
      "Hur förändras volymen när R134a förångas vid förångningstrycket 2 bar (e)?",
    answers: [
      { text: "Volymen blir ca 74 gånger större", correct: false },
      { text: "Volymen blir 99 gånger större", correct: false },
      { text: "Volymen blir 132 gånger mindre", correct: false },
      { text: "Volymen blir 132 gånger större.", correct: false },
      { text: "Volymen blir 89 gånger större", correct: true },
    ],
  },
  {
    question:
      "Under arbetsprocessen i en kylkompressor stiger trycket från förångningstryck till kondenseringstryck.Vad händer med köldmediets entalpi i kondensorn?",
    answers: [
      { text: "Entalpin minskar.", correct: true },
      { text: "Entalpin är oförändrad.", correct: false },
      { text: "Entalpin ökar.", correct: false },
    ],
  },
  {
    question: "Vilka är de rätta sambanden",
    answers: [
      {
        text: "Effekt = (Energi / tid). (Energi = Effekt x tid)",
        correct: true,
      },
      { text: "Effekt = Energi / tid. Effekt = Energi x tid", correct: false },
      { text: "Energi = Effekt / tid. Energi = Effekt x tid", correct: false },
      { text: "Effekt = Energi + tid. Effekt = Energi / tid", correct: false },
    ],
  },
  {
    question:
      "När började den svenska f-gasförordningen (SFS 2016:1128) gälla?",
    answers: [
      {
        text: "Den nya förordningen (SFS 2016:1128) trädde i kraft 17 november 2016",
        correct: false,
      },
      {
        text: "Den nya förordningen (SFS 2016:1128) trädde i kraft 01 januari 2017",
        correct: true,
      },
      {
        text: "Den nya förordningen (SFS 2016:1128) trädde i kraft 16 april 2014",
        correct: false,
      },
      {
        text: "Den nya förordningen (SFS 2016:1128) trädde i kraft 06 december 2016",
        correct: false,
      },
    ],
  },
  {
    question:
      "Köldmediet upptar värme i förångaren genom en viss process, vilken?",
    answers: [
      { text: "Köldmediet fasomvandlas genom kondensering", correct: false },
      { text: "Köldmediet värms och får en minskad volymitet", correct: false },
      { text: "Köldmediet fasomvandlas genom kokning", correct: true },
      { text: "Köldmediet värms och får ökad densitet", correct: false },
    ],
  },
  {
    question:
      "F-gasförordningen ställer krav på periodisk läcksökning av kylutrustningar. Med vilken periodicitet kräver F-gasförordningen läcksökning på en stationär utrustning som i köldmediekretsen innehåller 323kg R134a (GWP-1430)? Det finns ett läckagevarningssystem installerat.?",
    answers: [
      { text: "Senast inom 3 månader", correct: false },
      { text: "Senast inom 6 månader", correct: false },
      { text: "Senast inom 12 månader", correct: true },
      { text: "Senast inom 18 månader", correct: false },
    ],
  },
  {
    question: "Ackreditering för provtryckning med fas utfärdas av??",
    answers: [
      { text: "Arbetsmiljöinspektionen", correct: false },
      { text: "Naturvårdsverket", correct: false },
      { text: "SWEDAC", correct: true },
      { text: "ADR-S", correct: false },
    ],
  },
  {
    question:
      "Skall registerförning finnas på små värmepumpsystem. S.k split-units?",
    answers: [
      { text: "Ja, men inte i enskilt hushåll", correct: false },
      { text: "Nej", correct: true },
      { text: "Ja", correct: false },
      { text: "Ja, men bara hus kommun", correct: false },
    ],
  },
  {
    question: "densitet formeln?",
    answers: [
      { text: "kW/h", correct: false },
      { text: "KG/m3", correct: true },
      { text: "KG/s", correct: false },
      { text: "mäts i", correct: false },
    ],
  },
];

// APPROVED USERS
const allowedUsers = ["sam", "john", "alex"];

// CONTACT NUMBER
const contactNumber = "0046733448869";

// FORM SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!usernameInput) {
    console.error("usernameInput not found in HTML");
    return;
  }

  // GET USERNAME
  username = usernameInput.value.trim().toLowerCase();

  // CHECK ACCESS
  if (allowedUsers.includes(username)) {
    // ACCESS GRANTED
    usernameForm.style.display = "none";
    quizContainer.style.display = "block";

    startQuiz();
  } else {
    // ACCESS DENIED
    document.body.innerHTML = `
      <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        flex-direction:column;
        font-family:Arial;
        text-align:center;
        padding:20px;
      ">

        <h1>Access Denied ❌</h1>

        <p>You are not approved to access this quiz.</p>

        <p>Contact this number for access:</p>

        <h2>${contactNumber}</h2>

      </div>
    `;
  }
});

// Function to shuffle the questions array
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0; // Reset the question index
  score = 0; // Reset the score
  shuffleQuestions(questions); // Shuffle the questions
  nextButton.innerHTML = "Next"; // Set the button text
  showQuestion(); // Show the first question
}

//create function to display a question
function showQuestion() {
  resetState(); // Reset the quiz state
  startCountdown(); // Start a timer
  let currentQuestion = questions[currentQuestionIndex]; // Get the current question
  let questionNo = currentQuestionIndex + 1; // Calculate the question number
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

  // Create buttons for each answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct; // Mark correct answer
    }
    button.addEventListener("click", selectAnswer); // Add event listener to the button
  });
}

// Function to reset the state of the quiz
function resetState() {
  nextButton.style.display = "none"; // Hide the next button
  while (answerButtons.firstChild) {
    // Remove all previous answer buttons
    answerButtons.removeChild(answerButtons.firstChild);
  }
  stopCountdown(); // Stop timer
}

//Create the Function to select the answer
function selectAnswer(e) {
  const selectedBtn = e.target; // Get the selected button
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // Add correct class
    score++; // Increment the score
  } else {
    selectedBtn.classList.add("incorrect"); // Add incorrect class
  }

  // Mark all correct answers
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all buttons
  });
  nextButton.style.display = "block"; // Show the next button
  stopCountdown(); // Countdown will stop if you click any answer
}

// Function to display the score
function showScore() {
  resetState(); // Reset the state
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}, ${username}!`; // Show the score
  nextButton.innerHTML = "Play Again"; // Change button text to "Play Again"
  nextButton.style.display = "block"; // Show the button
}
// Function to handle the next button click
function handleNextButton() {
  currentQuestionIndex++; // Increment the question index
  if (currentQuestionIndex < questions.length) {
    // If there are more questions
    showQuestion(); // Show the next question
  } else {
    showScore(); // Show the score
  }
}
// Event listener for the next button
nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Play Again") {
    // If button text is "Play Again"
    resetQuiz(); // Reset the quiz
  } else if (currentQuestionIndex < questions.length) {
    // If there are more questions
    handleNextButton(); // Handle next button click
  } else {
    startQuiz(); // Start the quiz
  }
});

// Function to reset the quiz
function resetQuiz() {
  username = ""; // Clear the username
  usernameInput.value = ""; // Clear the input field
  usernameForm.style.display = "block"; // Show the username form
  quizContainer.style.display = "none"; // Hide the quiz container
}

//function for countdown timer
function startCountdown() {
  let timeLeft = 300;
  timerElement.innerHTML = `Time left: ${timeLeft}s`;
  countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    // Chatgpt was used to generate this statment as I was having error here
    if (timeLeft <= 0) {
      clearInterval(countdown);
      handleNextButton(); // Move to next question if time run out, automatically
    }
  }, 1000);
}

// Founction to stop countdown
function stopCountdown() {
  clearInterval(countdown);
  timerElement.innerHTML = "";
}

// Event listener for DOM content loaded to start the quiz
document.addEventListener("DOMContentLoaded", startQuiz);
