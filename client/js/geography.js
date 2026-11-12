const catImg = document.querySelector('#geographyImage img');

const params = new URLSearchParams(window.location.search);

const preCategory = params.get("category");

const username = localStorage.getItem("username")

const array = ['Figures', 'Monuments', 'Geography'];

// console.log(preCategory);

let category;
let correctAnswer;
let hints;
let description;
const id = [];
let newid;
let questionCounter = 0;
let isCorrect = false;

if (preCategory == 'Game of the day') {
    category = array[Math.floor(Math.random() * array.length)];
} else {
    category = preCategory;
}

let cat;

async function getImage(category) {
    //const imgContainer = document.getElementById("middle");
    try {
        if (category == 'Game of the day') {
            const cat = array[Math.floor(Math.random() * array.length)];
            cat = category
        }

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

    if (questionCounter == 5) {
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

    }

    if (questionCounter >= 5) {
        winAnswer.textContent = `Game completed! You have finished all 5 questions. Total points are: ${total}`;
        
        nxtQuestion.disabled = true;
        return;
    }
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

