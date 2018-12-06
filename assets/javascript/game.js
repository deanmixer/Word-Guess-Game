    let wins = 0;
    let potentialWord = ["France", "Germany", "Argentina", "Chile", "Canada", "Mexico", "Brazil", "Ireland", "Belize",
        "Afghanistan", "Australia", "Bangladesh", "Guatemala", "Albania", "Austria", "Bahamas", "Belgium", 
        "Zimbabwe", "Iceland", "England", "Sweden", "Spain", "Thailand", "Turkey", "Poland", "Portugal",
        "Peru", "Philippines", "Panama", "Oman", "Norway", "Netherlands", "Nepal", "Morocco", "Maldives",
        "Luxembourg", "Kuwait", "Japan", "Jamaica", "Italy", "Greece", "Finland", "China", "India"];
    let guessRemain = 12;
    let arraymatch;
    let userInput;
    let correctGuesses = [];
    let incorrectGuesses = [];
    let currentWord = potentialWord[Math.floor(Math.random() * potentialWord.length)];
    let wordEval = currentWord.toUpperCase();
    // let solutionArray = (currentWord.toUpperCase()).split('');
    let solutionArray = wordEval.split('');
    let uniqueRemain = (solutionArray.filter((v, i, a) => a.indexOf(v) === i)).sort(); 
    
    function updateIncorrect() {
        incorrectGuesses.push(userInput); 
        document.querySelector("#guessed").innerHTML = incorrectGuesses;
    }

    function updateRemain() {
        guessRemain--;
        document.querySelector("#remaining").innerHTML = guessRemain;
    }

    function winCheck() {
        if (arraysEqual(uniqueRemain, correctGuesses)) {
            wins++;
            document.querySelector("#score").innerHTML = wins;
            document.querySelector("#clue").innerHTML = "Press any key to play again!"; 
        }
    }

    function lossCheck() {
        if (guessRemain === 0) {
            document.querySelector("#clue").innerHTML = "Too bad! Press any key to play again!"; 
            document.querySelector("#word").innerHTML = ""; 
            for(i = 0; i < wordEval.length; i++) {
                document.querySelector("#word").innerHTML += wordEval[i] + " ";                   
                };
            document.querySelector("#word").classList.add("incorrect");    
        }
    }

    function updateHangman() {
        document.querySelector("#word").innerHTML = ""; 
        for(i = 0; i < wordEval.length; i++) {
            if (correctGuesses.includes(wordEval[i])) {
            document.querySelector("#word").innerHTML += wordEval[i] + " ";                   
            } else document.querySelector("#word").innerHTML += "_ ";   
        }
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i] !== arr2[i])
                return false;
        }
        return true
    }

    function resetBoard() {
        currentWord = potentialWord[Math.floor(Math.random() * potentialWord.length)];
        wordEval = currentWord.toUpperCase();
        solutionArray = wordEval.split('');      
        uniqueRemain = (solutionArray.filter((v, i, a) => a.indexOf(v) === i)).sort();
        guessRemain = 12;
        correctGuesses = [];
        incorrectGuesses = [];
        updateHangman(); 
        document.querySelector("#word").classList.remove("incorrect");  
        document.querySelector("#remaining").innerHTML = guessRemain; 
        document.querySelector("#guessed").innerHTML = "None"; 
        document.querySelector("#clue").innerHTML = "Good luck!"; 
    }

    window.onload = function() {
        document.querySelector("#word").innerHTML = ""; 
        for(i = 0; i < wordEval.length; i++) {
            if (correctGuesses.includes(wordEval[i])) {
            document.querySelector("#word").innerHTML += wordEval[i] + " ";                   
            } else document.querySelector("#word").innerHTML += "_ ";   
        }
    }

    document.onkeyup = function (event) {
        userInput = event.key.toUpperCase();
        arrayMatch = uniqueRemain.indexOf(userInput);
        let charCode = event.keyCode || event.charCode;
        if ((guessRemain === 0) || arraysEqual(uniqueRemain, correctGuesses)) { 
            resetBoard();
            return;
        } else if (arrayMatch >= 0 && charCode >= 65 && charCode <=90 && !incorrectGuesses.includes(userInput) && !correctGuesses.includes(userInput)) {
            correctGuesses.push(userInput);
            correctGuesses.sort();
            updateHangman();
            winCheck();
            return;
        } else if (charCode >= 65 && charCode <=90 && !incorrectGuesses.includes(userInput) && !correctGuesses.includes(userInput)) {        
            updateIncorrect();
            updateRemain();
            lossCheck();
        } else return
    };
   
