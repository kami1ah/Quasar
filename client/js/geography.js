const catImg = document.querySelector('#geographyImage img');

const params = new URLSearchParams(window.location.search);

const preCategory = params.get("category");


const array = ['Figures', 'Monuments', 'Geography'];

console.log(preCategory);

let category;

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
}


getImage(category);


