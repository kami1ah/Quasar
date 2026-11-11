const catImg = document.querySelector('#geographyImage img');

const params = new URLSearchParams(window.location.search);

const preCategory = params.get("category");


const array = ['Figures', 'Monuments', 'Geography'];

console.log(preCategory);

let category;
let correctAnswer;
let hints;
let description;

if (preCategory == 'Game of the day') {
    category = array[Math.floor(Math.random() * array.length)];
} else {
    category = preCategory;
}

async function getImage(category) {
    //const imgContainer = document.getElementById("middle");
    try {
        if (category == 'Game of the day') {
            const ca = array[Math.floor(Math.random() * array.length)];
        }

        const resp = await fetch(`http://localhost:3000/question/${category}`);
        console.log(resp)
        if (resp.ok) {
            const data = await resp.json();
            extractImg(data);
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (e) {
        console.log(e);
    }
}

function extractImg (data) {
    console.log(data);
    const newimgurl = data.image_url
    console.log(newimgurl)
    catImg.src = newimgurl
    correctAnswer = data.answer
    console.log(correctAnswer);
    hints = data.hints
    description = data.description
}


getImage(category);

const answerForm = document.getElementById("answerForm");
let answer;
let counter = 0
answerForm.addEventListener("submit", (e) => {

    e.preventDefault();
    counter++
    let answer = document.getElementById("answer").value;

    console.log(answer);
    getAnswer(answer, hints, counter, description);

});

const winAnswer = document.querySelector('#winner p');
const knowledge = document.querySelector('#winner2 p');

console.log(correctAnswer);
async function getAnswer(answer, hints, counter, description) {
    //const imgContainer = document.getElementById("middle");
    if (counter == 5) {
        window.location.href = "./homepage.html";
    }
    if (correctAnswer.toLowerCase() === answer.trim().toLowerCase()) {
        console.log(correctAnswer);
        winAnswer.textContent = 'you win!!!';
        console.log(description);
        knowledge.textContent = description;
    } else {
        winAnswer.textContent = 'Try again!';
        console.log('Incorrect answer');
        console.log(hints[(counter - 1)]);
        winAnswer.textContent = hints[(counter - 1)].hint_text;

    }
}

getAnswer(answer);

