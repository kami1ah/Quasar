const catImg = document.querySelector('#geographyImage img');

const params = new URLSearchParams(window.location.search);

const preCategory = params.get("category");

const username = localStorage.getItem("username")

const array = ['Figures', 'Monuments', 'Geography'];

const login = document.getElementById("loginButt")


login.addEventListener("click", (event) => {
    window.location.assign("login.html")
})

// console.log(preCategory);

let category;
let correctAnswer;
let hints;
let description;
const id = [];
let newid;
let questionCounter = 0;
let isCorrect = false;
let total = 0;
let gameWin = false

    
async function pointTotal(hintCounter, questionCounter) {
        const hintsUsed = 4 - hintCounter;
        const questionPoints = 500 - (hintsUsed * 100);
        if (questionPoints > 0) {
            total += questionPoints;
        }
        console.log(`Question ${questionCounter}: ${questionPoints} points`);
        console.log(`Total: ${total} points`);
    }

if (preCategory == 'Game of the day') {
    category = array[Math.floor(Math.random() * array.length)];
} else {
    category = preCategory;
}

let cat;

async function getImage(category) {
    //const imgContainer = document.getElementById("middle");
    try {

        const resp = await fetch(`/question/${category}`);
        // console.log(resp)
        if (resp.ok) {
            const data = await resp.json();
            extractImg(data);
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (e) {
        // console.log(e);
    }
}

function extractImg (data) {
    // console.log(data);
    const newimgurl = data.image_url
    // console.log(newimgurl)
    catImg.src = newimgurl
    correctAnswer = data.answer
    console.log(correctAnswer);
    hints = data.hints
    description = data.description
    id.push(data.id)
    newid = data.id
    questionCounter++
    //console.log(questionCounter);
}


getImage(category);

const answerForm = document.getElementById("answerForm");
let answer;
let counter = 0
answerForm.addEventListener("submit", (e) => {

    e.preventDefault();
    counter++
    let answer = document.getElementById("answer").value;

    // console.log(answer);
    getAnswer(answer, hints, counter, description);

});

const winAnswer = document.querySelector('#winner p');
const knowledge = document.querySelector('#winner2 p');

// console.log(correctAnswer);

async function getAnswer(answer, hints, counter, description) {
    //const imgContainer = document.getElementById("middle");
    if (counter == 5) {
        window.location.href = "./homepage.html";
        return
    }


    if (isCorrect) {
        return;
    }
    if (correctAnswer.toLowerCase() === answer.trim().toLowerCase()) {
        //console.log(correctAnswer);
        if (!isCorrect) {
            isCorrect = true;
            pointTotal(hintCounter, questionCounter);
        }
        knowledge.textContent = description;
    } else {
        winAnswer.textContent = 'Try again!';
        isCorrect = false;
        // console.log('Incorrect answer');
        // console.log(hints[(counter - 1)]);
        //winAnswer.textContent = hints[(counter - 1)].hint_text;

    }
}




const hintBtn = document.getElementById("hintBtn");
const hintCount = document.querySelector('#hintCount p');
const pointsCount = document.querySelector('#pointCount p');
let counterBtn = -1
let hintCounter = 4
hintBtn.addEventListener("click", (e) => {

    e.preventDefault();
        if (counterBtn >= hints.length -1) {
        winAnswer.textContent = 'Try the next question or Return to homepage to start again.';
        return
        }
    counterBtn++

 
    // console.log(counterBtn);
    hintCounter--
    getHint(hints, counterBtn, hintCounter);
    const available = 500 - (4 - hintCounter) * 100;
    pointsCount.textContent = `Points: ${available}`;
});


async function getHint(hints, counterBtn, hintCounter) {
    // console.log(hints);
    winAnswer.textContent = hints[(counterBtn)].hint_text
    hintCount.textContent = `Hints left: ${hintCounter + 1}`;
}



const nxtQuestion = document.getElementById("nxtQuestion");

nxtQuestion.addEventListener("click", async (e) => {
    e.preventDefault();

    if (gameWin) {
        window.location.assign("homepage.html");
        return;
    }


    if (questionCounter >= 5) {
        console.log(total);
            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category,
                    points: total
                })
            };
            
            const user = await getUser();
            const userId = user.user_id;
            const response = await fetch(`/stats/${userId}`, options);
            console.log(response)
        winAnswer.textContent = `Game completed! You have finished all 5 questions. Total points are: ${total}`;
        nxtQuestion.textContent = "Back to Home";
        gameOver = true;
        return;

    }



    let data;
    let newid;
    let attempts = 0;

    do {
        const resp = await fetch(`/question/${category}`);

        if (!resp.ok) {
            console.log("Error fetching question");
            return;
        }

        data = await resp.json();
        newid = data.id;
        attempts++;

    } while (id.includes(newid) && attempts < 20);

    if (id.includes(newid)) {
        console.log("No new questions available");
        return;
    }

    console.log("New question");

    extractImg(data);

    counterBtn = -1;
    hintCounter = 4;
    counter = 0;
    isCorrect = false;

    hintCount.textContent = "Hints left: 5";
    winAnswer.textContent = "";
    knowledge.textContent = "";
    pointsCount.textContent = "Points: 500";

    document.getElementById("answer").value = "";
})


async function getUser() {
    //const imgContainer = document.getElementById("middle");
    console.log(username + "blah")
    try {
        const resp = await fetch(`/users/${username}`);
        // console.log(resp)
        if (resp.ok) {
            const data = await resp.json();
            return data;
            console.log(data)
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (e) {
        // console.log(e);
    }
}

