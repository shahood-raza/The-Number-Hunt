let randnum = parseInt(Math.random() * 100 + 1);
let inputguess = document.querySelector("#guess");
let guessbtn = document.querySelector("#submit");
let prevguess = document.querySelector("#PreviousGuesses");
let remaining = document.querySelector("#remaining");
let lessorgreater = document.querySelector(".lessorgreater");
let startOver = document.createElement("div"); 
document.querySelector(".container").appendChild(startOver);

console.log("Random Number:", randnum);

let prevguesses = [];
let attempt = 0;
let maxAttempts = 10;
let Playgame = true;

remaining.innerHTML = `${maxAttempts - attempt }`;

if (Playgame) {
    guessbtn.addEventListener("click", (e) => {
        e.preventDefault();
        const guess = parseInt(inputguess.value);
        ValidateGuess(guess);
    });
}

function ValidateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 & 100");
    } else if (prevguesses.includes(guess)) {
        alert(`You have already guessed ${guess}`);
    } else {
        prevguesses.push(guess);
        displayGuess(guess);
        checkguess(guess);
    }
}

function checkguess(guess) {
    if (guess === randnum) {
        displayMessage(`🎉 Congratulations! You guessed the right number in ${attempt} attempts.`);
        endgame();
    } else if (attempt === maxAttempts) {
        displayMessage(`❌ No attempts left! The correct number was ${randnum}.`);
        endgame();
    } else if (guess > randnum) {
        displayMessage(`⬇ The number is smaller than ${guess}.`);
    } else if (guess < randnum) {
        displayMessage(`⬆ The number is greater than ${guess}.`);
    }
}

function displayMessage(message) {
    lessorgreater.innerHTML = `<h4>${message}</h4>`;
}

function displayGuess(guess) {
    inputguess.value = "";
    if (attempt < maxAttempts - 1) {
        prevguess.innerHTML += ` ${guess}, `;
    } else {
        prevguess.innerHTML += ` ${guess}`;
    }
    attempt++;
    remaining.innerHTML = `${maxAttempts - attempt}`;
}

function endgame() {
    inputguess.value = "";
    Playgame = false;
    inputguess.setAttribute("disabled", "");
    inputguess.style.display = "none";
    guessbtn.setAttribute("disabled", true);
    guessbtn.style.display = "none";

    startOver.innerHTML = `<button id="newbtn" style="margin-top: 15px; padding: 10px 20px; font-size: 16px; border: none; background: #1e3c72; color: white; border-radius: 5px; cursor: pointer;">New Game</button>`;
    startnewgame();
}
function startnewgame() {
    document.querySelector("#newbtn").addEventListener("click", () => {
        randnum = parseInt(Math.random() * 100 + 1);
        console.log("New Random Number:", randnum);

        attempt = 0;
        Playgame = true;
        prevguesses = [];
        prevguess.innerHTML = "";
        remaining.innerHTML = `${maxAttempts - attempt }`;
        inputguess.removeAttribute("disabled");
        inputguess.style.display = "inline-block";
        guessbtn.removeAttribute("disabled");
        guessbtn.style.display = "inline-block";

        startOver.innerHTML = "";
        lessorgreater.innerHTML = "";
    });
}
