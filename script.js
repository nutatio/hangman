const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["поппи", "камень", "антифриз", "висельница",'кроссинговер',"коллега","скайрим","пог"]; // добавить чтото

let selectedWord = words[Math.floor(Math.floor(Math.random() * words.length))];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ""}
      </span>
    `
    )
    .join("")}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Поздравляю, вы победили !";
    popup.style.display = "flex";
  }
}

//update wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Неправильно</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, i) => {
    const errors = wrongLetters.length;

    if (i < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Вы проиграли, коллега. :с";
    popup.style.display = "flex";
  }
}

//show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//keydown letter press 65-90
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//play again
playAgainBtn.addEventListener('click', () => {
  
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random()*words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
