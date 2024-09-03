import "./styles.css";

// TODO: Sett startverdien for de ulike tellerene
let wordCounter;
let positionCounter;
let wrongCounter;

// TODO: Lag en liste med ulike ord
const words = "";

// TODO: Hent ut HTML #id og knappen
const word = "";
const wrongs = "";
const letter = "";
const button = "";

const setWord = () => {
  // TODO: Skriv ut ordet som brukeren skal skrive eller en medling om at det ikke er flere ord igjen
  word.innerHTML = "";
};

const changeWord = () => {
  // TODO: Nullstill posisjonstelleren
  // TODO: Oppdater telleren vi bruker for å velge ut ord
  setWord();
};

// TODO: Sjekk vi har skrevet riktig bokstav. Må ta hensyn til plassen i ordet vi skal skrive
const checkPosition = (word, position, letter) => {
  return "";
};

// TODO: Sjekk om posisjonen vi er på er lik lengden på ordet vi skal skrive. Det betyr at vi er ferdig med ordet og kan bytte ord
const wordIsCorrect = (word, position) => {
  return "";
};

const handleKeyUp = ({ key }) => {
  // TODO: Hent ut ordet vi skal skrive
  const word = "";
  // TODO: Bruk checkPosition() til å sjekke om vi har skrevet rett bokstav
  if ("") {
    // TODO: Øk posisjonstelleren
    // TODO: Bruk wordIsCorrect() til å sjekke om vi er ferdig med ordet
    if ("") {
      // TODO: Trigg funksjonen som bytter ord
    }
  } else {
    // TODO: Oppdater telleren for "feil"
  }
  updateUI(key);
};

const updateUI = (key) => {
  // TODO: Sjekk om det er flere ord igjen
  if ("") {
    // TODO: Oppdater HTML for
    // - antall feil
    // - bokstaven vi har skrevet
    // - stylingen på ordet basert på hvilken posisjon vi er på (hvilken bokstav vi skal skrive)
  }
};

// TODO: Lytt til keyup på window
// TODO: Lytt til klikk på knappen
button.addEventListener("", () => {
  // TODO: Disable knappen etter at vi har trykket på den. Tips: Bruk .disabled = true
  // TODO: Sett første ord
});