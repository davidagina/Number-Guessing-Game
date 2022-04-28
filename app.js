/* 
Player must guess a number betwee a min and max
Player gets a certain amount of guesses
Notify player of guesses remaining
Notify the player of correct answer if loose
let player choose to play again
*/

// Game values 
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num");
    maxNum = document.querySelector(".max-num");
    guessBtn = document.querySelector("#guess-btn")
    guessInput = document.querySelector("#guess-input");
    message = document.querySelector(".message")


// Assign UI min and maxm
minNum.textContent = min;
maxNum.textContent = max;

// Add play again event listener
game.addEventListener("mousedown", function(e){
    if (e.target.className === "play-again"){
        window.location.reload();
    }
})

// Listen for a guess
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value)

    console.log(guess)

    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a value between ${min} and ${max}`, "red");
    } else {

        // Check if won
        if(guess === winningNum){
            // Game over won
            gaveOver(true, `${winningNum} is correct, YOU WIN!`)
        } else {
            // Wrong number
            guessesLeft -= 1;
    
            if (guessesLeft === 0){
                // Game over - lost
                gaveOver(false, `Game over, you lost. The correct number is ${winningNum}`)
            } else {
                // Clear the input
                guessInput.value = "";
    
                // Game continues - answer wrong
    
                // Change border color
                guessInput.style.borderColor = "red";
    
                // Tell user it's the wrong number
                setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left.`);
    
            }
        }
    }

})

function gaveOver(won, msg){

    won === true ? color = "green" : color = "red";
    // Disable input
    guessInput.disabled = true;
    // Change border color 
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again"
}

//Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)  + min );
}


// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}