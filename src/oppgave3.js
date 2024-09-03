import "./styles.css";

let wordCounter = 0;
let positionCounter = 0;
let wrongCounter = 0;

const words = ["Pannekaker", "Carbonara", "Lasagne", "Pizza", "Hamburger", "Lapskaus", "Fiskegrateng"];

const word = document.getElementById("word")
const wrongs = document.getElementById("wrongs")
const letter = document.getElementById("letter")
const button = document.getElementById("button")

const setWord = () => {
  if (wordCounter < words.length) {
    word.innerHTML = words[wordCounter]
  } else {
    word.innerHTML = "Ingen flere ord"
  }
  
};

const changeWord = () => {
  positionCounter = 0
  wordCounter++
  setWord();
};

const checkPosition = (word, position, letter) => {
  return word[position].toLowerCase() === letter.toLowerCase();
};

const wordIsCorrect = (word, position) => {
  return position === word.length;
};

const handleKeyUp = ({ key }) => {

  const currentWord = words[wordCounter] || "";

  if (checkPosition(currentWord, positionCounter, key)) {
    positionCounter++
    if (wordIsCorrect(currentWord, positionCounter)){
      changeWord();
    }
  } else {
    wrongCounter++
  }
  updateUI(key);
};

const updateUI = (key) => {
  if (wordCounter < words.length) {
    wrongs.innerHTML = `Antall feil: ${wrongCounter}`
    letter.innerHTML = `Bokstaven du skrev: ${key}`
    const currentWord = words[wordCounter]
    word.innerHTML = `<span style="color: green;">${currentWord.slice(0, positionCounter)}</span>${currentWord.slice(positionCounter)}`
  } else {
    word.innerHTML = "Ingen flere ord"
  }
};


window.addEventListener("keyup", handleKeyUp);

button.addEventListener("click", () => {
  button.disabled = true
  setWord()
});