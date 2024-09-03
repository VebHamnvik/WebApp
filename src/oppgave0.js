// Oppgave 1
const removeBtn = document.getElementById('remove-btn')

removeBtn.addEventListener("click", () => {
    const removedText = document.getElementById('remove')
    removedText.remove()
});


// Oppgave 2
const changeBtn = document.getElementById('change-btn')

changeBtn.addEventListener("click", () => {
    const newText = "Sjokolade"
    const changedText = document.getElementById('change')

    changedText.textContent = newText
});

// Oppgave 3
const inputField = document.getElementById('input')

inputField.addEventListener("input", () => {

    const inputText = document.getElementById('input-text')
    inputText.textContent = inputField.value
});

// Oppgave 4
const printBtn = document.getElementById('write-list')
const myList = ["item one", "item two", "item three"];

printBtn.addEventListener("click", () => {
    console.log(myList)
});

// Oppgave 5
const createBtn = document.getElementById('create');
const selectElement = document.getElementById('select');
const inputText = document.getElementById('text');
const placeholderDiv = document.getElementById('placeholder');

createBtn.addEventListener('click', () => {
    const selectedTag = selectElement.value;
    const text = inputText.value;

    const newElement = document.createElement(selectedTag);
    newElement.textContent = text;

    placeholderDiv.appendChild(newElement);
});

// Oppgave 6
const removeLiBtn = document.getElementById('remove-li')

removeLiBtn.addEventListener("click", () => {
    let liList = document.getElementById('list')
    if (liList.lastElementChild) {
        liList.removeChild(liList.lastElementChild);
    }
});
// Oppgave 7

const disableBtn = document.getElementById('order')
const inputNameField = document.getElementById('name')

inputNameField.addEventListener("input", () => {
    if (inputNameField.value.length > 4) {
        disableBtn.disabled = true
        disableBtn.style.border = '2px solid red'
    } else {
        disableBtn.disabled = false
    }
});

// Oppgave 8
const colorBtn = document.getElementById('color')
const colorElements = document.querySelectorAll('.children li');

colorBtn.addEventListener("click", () => {
    colorElements.forEach(element => {
        element.style.border = '2px solid red';
    })
});
        

