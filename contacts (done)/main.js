//Random Contact List by Ryan

//Html
let inputEl = document.getElementById("inputEl");
let btnEL = document.getElementById("buttonEL");
let containerEL = document.getElementById("container");
let AllBtn = document.getElementById("allBtnEL");
let favBTn = document.getElementById("favBTn");

//events listeners
document.addEventListener("keydown", keydownHandler);
btnEL.addEventListener("click", search)
AllBtn.addEventListener("click", AllHandler);
favBTn.addEventListener("click", showFavs)

//Arrays
let contacts = [];
const imgArray = ["", "imgs/image1.jpg", "imgs/image2.jpg", "imgs/image3.jpg"];
let searchcontact = [];
let favContacts = [];
let functionArray = [AllHandler, search, showFavs];

//Vars
let pageDisplay = functionArray[0];



function contactHandler(array) {
    containerEL.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        divHandler(array[i][0], array[i][2], array[i][2], array[i][3], i, array[i][4]);
    }


}

function divHandler(name, desc, number, pic, i, colour) {


    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = pic;
    div.appendChild(img)

    let btn = document.createElement("button");
    btn.innerHTML = "Favourite";
    btn.dataset.name = name;
    btn.addEventListener("click", (e) => {

        favHandler(i, e)
    });
    btn.classList.add("btn");
    div.classList.add("div");
    div.style.backgroundColor = colour;

    img.classList.add("img");

    div.innerHTML += `${name}, ${desc} - ${number}`;
    containerEL.appendChild(div);


    div.appendChild(btn);

}




function keydownHandler(event) {


    if (event.keyCode === 13) {
        var contact = [prompt("Their name?"), prompt("Their phone number/ contact info (email)?"), prompt("A description of them?"), imgArray[randomInt(1, 4)], ""];

        contacts.push(contact);
        contactHandler(contacts);

    }

    if (event.keyCode === 46) {
        let delContact = prompt("Who do you want to delete?!");
        delHandler(delContact);

    }

}

function delHandler(person) {

    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i][0] === person) {
            contacts.splice(i, 1);

        }


    }
    for (let h = 0; h < favContacts.length; h++) {
        if (favContacts[h][0] === person) {
            favContacts.splice(h, 1);

        }
    }

    pageDisplay();

}


function favHandler(i, e) {
   
  

    for (let q = 0; q < favContacts.length; q++) {
        if (favContacts[q][0] === e.target.dataset.name) {
            for (let f = 0; f < contacts.length; f++) {
                if (contacts[f][0] === e.target.dataset.name) {
                    contacts[f][4] = "white";
                    favContacts.splice(q, 1);
                    pageDisplay();
                    return;

                }
            }
        }
    }


    contacts[i][4] = "lightyellow";
    favContacts.push(contacts[i]);
    pageDisplay();
}


function search() {
    let input = inputEl.value;
    searchcontact = [];
    let inputArray = input.split(/(?:,| )+/);


    for (let l = 0; l < contacts.length; l++) {

        for (let n = 0; n < inputArray.length; n++) {
            if (contacts[l][0] === inputArray[n]) {
                searchcontact.push(contacts[l]);
            }
        }

    }
    pageDisplay = functionArray[1]
    contactHandler(searchcontact);

}

function showFavs() {
    pageDisplay = functionArray[2];
    contactHandler(favContacts);

}

function AllHandler() {
    pageDisplay = functionArray[0]
    contactHandler(contacts);

}


function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);

}